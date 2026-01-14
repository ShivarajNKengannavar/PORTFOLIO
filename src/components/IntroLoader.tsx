import { useEffect, useState, useRef, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// Color palettes for morning/evening
const themes = {
  morning: {
    background: '#0a0a12',
    petalColor: '#ffb7c5',
    orbColor: '#ffd4a3',
    treeGlow: '#ffcdd9',
    fogColor: '#0a0a12',
    uiAccent: 'pink',
  },
  evening: {
    background: '#0d0815',
    petalColor: '#c9a0dc',
    orbColor: '#ff9e64',
    treeGlow: '#e8b4f8',
    fogColor: '#0d0815',
    uiAccent: 'purple',
  },
};

// Ambient Audio Controller
class AmbientAudioController {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private isPlaying = false;

  async start() {
    if (this.isPlaying) return;
    
    this.audioContext = new AudioContext();
    this.masterGain = this.audioContext.createGain();
    this.masterGain.gain.value = 0;
    this.masterGain.connect(this.audioContext.destination);

    // Create ambient drone layers
    const frequencies = [55, 82.5, 110, 165, 220];
    
    frequencies.forEach((freq, i) => {
      const osc = this.audioContext!.createOscillator();
      const gain = this.audioContext!.createGain();
      const filter = this.audioContext!.createBiquadFilter();
      
      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.value = freq;
      
      // Add subtle detuning for richness
      osc.detune.value = Math.random() * 10 - 5;
      
      filter.type = 'lowpass';
      filter.frequency.value = 800;
      filter.Q.value = 1;
      
      gain.gain.value = 0.08 / (i + 1);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain!);
      
      osc.start();
      this.oscillators.push(osc);
      
      // Animate filter for movement
      const animateFilter = () => {
        if (!this.isPlaying) return;
        filter.frequency.value = 600 + Math.sin(Date.now() * 0.0003 * (i + 1)) * 200;
        requestAnimationFrame(animateFilter);
      };
      animateFilter();
    });

    // Fade in
    this.masterGain.gain.linearRampToValueAtTime(0.15, this.audioContext.currentTime + 2);
    this.isPlaying = true;
  }

  stop() {
    if (!this.isPlaying || !this.masterGain || !this.audioContext) return;
    
    this.masterGain.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.5);
    
    setTimeout(() => {
      this.oscillators.forEach(osc => osc.stop());
      this.oscillators = [];
      this.audioContext?.close();
      this.audioContext = null;
      this.isPlaying = false;
    }, 600);
  }

  playChime() {
    if (!this.audioContext) return;
    
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    
    osc.type = 'sine';
    osc.frequency.value = 880;
    gain.gain.value = 0.1;
    
    osc.connect(gain);
    gain.connect(this.masterGain!);
    
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.8);
    osc.stop(this.audioContext.currentTime + 0.8);
  }
}

const audioController = new AmbientAudioController();

// Sakura petal particle system
function SakuraPetals({ count = 150, theme }: { count?: number; theme: typeof themes.morning }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = new THREE.Object3D();
  
  const particles = useRef(
    Array.from({ length: count }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10
      ),
      rotation: new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.01,
        -Math.random() * 0.02 - 0.01,
        (Math.random() - 0.5) * 0.01
      ),
      rotationSpeed: new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      ),
      scale: 0.03 + Math.random() * 0.05,
    }))
  );

  useFrame(() => {
    if (!mesh.current) return;

    particles.current.forEach((particle, i) => {
      particle.position.add(particle.velocity);
      particle.position.x += Math.sin(Date.now() * 0.001 + i) * 0.002;
      
      particle.rotation.x += particle.rotationSpeed.x;
      particle.rotation.y += particle.rotationSpeed.y;
      particle.rotation.z += particle.rotationSpeed.z;

      if (particle.position.y < -8) {
        particle.position.y = 8;
        particle.position.x = (Math.random() - 0.5) * 20;
      }

      dummy.position.copy(particle.position);
      dummy.rotation.copy(particle.rotation);
      dummy.scale.setScalar(particle.scale);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });

    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <planeGeometry args={[1, 0.6]} />
      <meshBasicMaterial 
        color={theme.petalColor} 
        transparent 
        opacity={0.9} 
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
}

// Glowing orbs floating around
function GlowingOrbs({ count = 80, theme }: { count?: number; theme: typeof themes.morning }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = new THREE.Object3D();
  
  const orbs = useRef(
    Array.from({ length: count }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.008,
        (Math.random() - 0.5) * 0.008,
        (Math.random() - 0.5) * 0.005
      ),
      scale: 0.02 + Math.random() * 0.06,
      colorOffset: Math.random() * Math.PI * 2,
    }))
  );

  useFrame((state) => {
    if (!mesh.current) return;

    orbs.current.forEach((orb, i) => {
      orb.position.add(orb.velocity);
      orb.position.y += Math.sin(state.clock.elapsedTime + orb.colorOffset) * 0.002;
      orb.position.x += Math.cos(state.clock.elapsedTime * 0.5 + orb.colorOffset) * 0.001;

      if (Math.abs(orb.position.x) > 15) orb.velocity.x *= -1;
      if (Math.abs(orb.position.y) > 10) orb.velocity.y *= -1;

      dummy.position.copy(orb.position);
      dummy.scale.setScalar(orb.scale * (1 + Math.sin(state.clock.elapsedTime * 2 + orb.colorOffset) * 0.3));
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });

    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial 
        color={theme.orbColor} 
        transparent 
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
}

// Central cherry blossom tree glow
function CherryBlossomTree({ theme }: { theme: typeof themes.morning }) {
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (glowRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      glowRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group position={[0, -0.5, 0]}>
      {/* Tree trunk */}
      <mesh position={[0, -1.2, 0]}>
        <cylinderGeometry args={[0.05, 0.08, 1.5, 8]} />
        <meshBasicMaterial color="#4a3728" />
      </mesh>
      
      {/* Main glow */}
      <mesh ref={glowRef} position={[0, 0.3, 0]}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial 
          color={theme.treeGlow} 
          transparent 
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Inner glow */}
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Core */}
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.95}
        />
      </mesh>
    </group>
  );
}

// Camera controller for orbit interaction
function CameraController({ isHolding }: { isHolding: boolean }) {
  const { camera } = useThree();
  const targetRotation = useRef(0);

  useFrame(() => {
    if (!isHolding) {
      // Auto rotate when not holding
      targetRotation.current += 0.002;
      camera.position.x = Math.sin(targetRotation.current) * 8;
      camera.position.z = Math.cos(targetRotation.current) * 8;
      camera.lookAt(0, 0, 0);
    }
  });

  return isHolding ? (
    <OrbitControls 
      enableZoom={false}
      enablePan={false}
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI / 1.5}
      rotateSpeed={0.5}
    />
  ) : null;
}

function Scene({ theme, isHolding }: { theme: typeof themes.morning; isHolding: boolean }) {
  return (
    <>
      <color attach="background" args={[theme.background]} />
      <fog attach="fog" args={[theme.fogColor, 5, 25]} />
      <CameraController isHolding={isHolding} />
      <CherryBlossomTree theme={theme} />
      <SakuraPetals count={120} theme={theme} />
      <GlowingOrbs count={60} theme={theme} />
    </>
  );
}

interface IntroLoaderProps {
  onComplete: () => void;
}

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [progress, setProgress] = useState(0);
    audioController.start();
    setAudioStarted(true);
  }
}, [audioStarted]);

useEffect(() => {
  const introAudio = new Audio('/sounds/intro.wav');
  introAudio.volume = 0.15;
  audioRef.current = introAudio;
}, []);

useEffect(() => {
  const duration = 3000;
  const startTime = Date.now();
  
  const updateProgress = () => {
    const elapsed = Date.now() - startTime;
    const newProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
    setProgress(newProgress);
    
    if (newProgress < 100) {
      requestAnimationFrame(updateProgress);
    } else {
      setTimeout(() => setShowLanguage(true), 500);
    }
  };
  
  requestAnimationFrame(updateProgress);
}, []);

const handleLanguageSelect = () => {
  setIsExiting(true);
  audioController.playChime();
  
  gsap.to(containerRef.current, {
    opacity: 0,
    scale: 1.1,
    duration: 0.8,
    ease: 'power2.inOut',
    onComplete: () => {
      audioController.stop();
      onComplete();
    }
  });
};

const handleMouseEnter = () => {
  gsap.to(button, { scale: 1.04, duration: 0.3 });
};

const handleClick = () => {
  if (clicked) return;
  setClicked(true);
  audioRef.current?.play().catch(() => {});
  const tl = gsap.timeline();
  tl.to(buttonRef.current, { opacity: 0, scale: 0.95, duration: 0.6 });
  if (hintRef.current) tl.to(hintRef.current, { opacity: 0, duration: 0.4 }, "-=0.4");
  WELCOME_TEXTS.forEach((text) => {
    tl.set(welcomeRef.current, { textContent: text });
    tl.fromTo(welcomeRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 });
    tl.to(welcomeRef.current, { opacity: 0, y: -10, duration: 0.4, delay: 0.6 });
  });
  tl.to([canvasRef.current, sakuraCanvasRef.current], { opacity: 0, duration: 1 });
  tl.to(containerRef.current, { opacity: 0, duration: 0.8, onComplete: () => { tubesAppRef.current?.dispose?.(); onComplete?.(); } });
};

// ...

<Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
  <Scene theme={theme} isHolding={isHolding} />
</Canvas>

// ...
          className={`px-4 py-2 font-mono text-xs uppercase tracking-wider border transition-all duration-300 ${
            timeOfDay === 'morning'
              ? 'border-pink-300/50 text-pink-200 bg-pink-500/10 hover:bg-pink-500/20'
              : 'border-purple-300/50 text-purple-200 bg-purple-500/10 hover:bg-purple-500/20'
          }`}
        >
          {timeOfDay === 'morning' ? '☀️ Morning' : '🌙 Evening'}
        </button>
      </div>

      {/* Click & Hold Hint */}
      <div className={`absolute top-6 left-6 z-20 transition-opacity duration-500 ${isHolding ? 'opacity-100' : 'opacity-50'}`}>
        <div className={`flex items-center gap-2 px-3 py-2 border backdrop-blur-sm ${
          timeOfDay === 'morning' 
            ? 'border-pink-300/30 bg-pink-500/10' 
            : 'border-purple-300/30 bg-purple-500/10'
        }`}>
          <span className={`font-mono text-xs ${timeOfDay === 'morning' ? 'text-pink-200' : 'text-purple-200'}`}>
            {isHolding ? '🎥 Cinematic' : 'click & hold'}
          </span>
        </div>
      </div>

      {/* Loading Text */}
      <div className="relative z-10 text-center pointer-events-none">
        {!showLanguage ? (
          <div className="space-y-4 animate-fade-in">
            <p className={`font-mono text-xs tracking-[0.3em] uppercase ${
              timeOfDay === 'morning' ? 'text-pink-200/60' : 'text-purple-200/60'
            }`}>
              bro, it's loading man, kinda sucks but can't be helped 😌
            </p>
            <div ref={welcomeRef} className="absolute inset-0 flex items-center justify-center text-white text-2xl md:text-3xl lg:text-4xl tracking-wide pointer-events-none" />
            <div className="flex items-center justify-center gap-2">
              <span className="font-display text-6xl md:text-8xl font-bold text-white">
                {progress}
              </span>
              <span className={`font-display text-4xl md:text-6xl font-bold ${
                timeOfDay === 'morning' ? 'text-pink-300' : 'text-purple-300'
              }`}>%</span>
            </div>
          </div>
        ) : (
          <div className={`space-y-8 pointer-events-auto ${isExiting ? 'pointer-events-none' : ''}`}>
            <p className={`font-mono text-sm tracking-[0.2em] uppercase animate-fade-in ${
              timeOfDay === 'morning' ? 'text-pink-200/80' : 'text-purple-200/80'
            }`}>
              choose one!!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
              <button
                onClick={handleLanguageSelect}
                className={`group px-8 py-4 border backdrop-blur-sm transition-all duration-300 ${
                  timeOfDay === 'morning'
                    ? 'border-pink-300/30 bg-pink-500/5 hover:bg-pink-500/20 hover:border-pink-300/60'
                    : 'border-purple-300/30 bg-purple-500/5 hover:bg-purple-500/20 hover:border-purple-300/60'
                }`}
              >
                <span className={`font-mono text-xs block mb-1 ${
                  timeOfDay === 'morning' ? 'text-pink-200/60' : 'text-purple-200/60'
                }`}>island native</span>
                <span className={`font-display text-lg transition-colors ${
                  timeOfDay === 'morning' 
                    ? 'text-white group-hover:text-pink-200' 
                    : 'text-white group-hover:text-purple-200'
                }`}>English</span>
              </button>
              <button
                onClick={handleLanguageSelect}
                className="group px-8 py-4 border border-amber-300/30 bg-amber-500/5 backdrop-blur-sm hover:bg-amber-500/20 hover:border-amber-300/60 transition-all duration-300"
              >
                <span className="font-mono text-xs text-amber-200/60 block mb-1">island native</span>
                <span className="font-display text-lg text-white group-hover:text-amber-200 transition-colors">日本語</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Vignette overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.6) 100%)'
        }}
      />
    </div>
  );
}
