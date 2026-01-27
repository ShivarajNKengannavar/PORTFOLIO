'use client';

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import * as THREE from 'three';
import gsap from 'gsap';
import { useSoundEffects } from "@/hooks/useSoundEffects";
import {
  playEntranceSoundOnce,
  initializeAudioOnInteraction,
} from "@/utils/entranceSound";
import InlineDynamicText from "@/components/ui/InlineDynamicText";
import ButtonCreativeRight from "@/components/portfolio/ButtonCreativeRight";
import ButtonHoverRight from "@/components/ui/ButtonHoverRight";

// Mobile detection utility
const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
         (navigator.maxTouchPoints > 0 && navigator.maxTouchPoints <= 2);
};

const isTabletDevice = () => {
  return /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent) || 
         (navigator.maxTouchPoints > 2 && navigator.maxTouchPoints <= 10);
};

export default function HeroSection() {
  const cityContainerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const touch = useRef({ x: 0, y: 0, startX: 0, startY: 0 });
  const isMobile = useRef(isMobileDevice());
  const isTablet = useRef(isTabletDevice());
  
  // 1. SET INITIAL TARGET ROTATION (Isometric angle from your images)
  const targetRotation = useRef({ x: -0.5, y: 0.5 }); 
  const currentRotation = useRef({ x: -0.5, y: 0.5 });

  const { playClickSound, playHoverSound, playSuccessSound } = useSoundEffects();

  useEffect(() => {
    if (!cityContainerRef.current) return;

    let renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera;
    let city = new THREE.Object3D();
    let smoke = new THREE.Object3D();
    let town = new THREE.Object3D();
    
    const THEME_ORANGE = 0xFF8C3C; 

    // Mobile-optimized renderer settings
    const isMobileDevice = isMobile.current || isTablet.current;
    const pixelRatio = isMobileDevice ? Math.min(window.devicePixelRatio, 2) : window.devicePixelRatio;
    
    renderer = new THREE.WebGLRenderer({ 
        antialias: !isMobileDevice, 
        alpha: true, 
        powerPreference: isMobileDevice ? "default" : "high-performance",
        precision: isMobileDevice ? "mediump" : "highp"
    });
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Enable shadows only on desktop
    if (!isMobileDevice) {
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }
    
    cityContainerRef.current.appendChild(renderer.domElement);

    // Responsive camera positioning
    const cameraDistance = isMobileDevice ? 25 : 35;
    const cameraHeight = isMobileDevice ? 8 : 10;
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, cameraHeight, cameraDistance); 

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.Fog(THEME_ORANGE, 10, 75);

    const mathRandom = (num = 10) => -Math.random() * num + Math.random() * num;

    // Adjust building count for performance
    const buildingCount = isMobileDevice ? 80 : 160;
    
    const initBuildings = () => {
      const geometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1);
      
      for (let i = 1; i < buildingCount; i++) {
        const material = new THREE.MeshStandardMaterial({ color: 0x000000 });
        const wmaterial = new THREE.MeshLambertMaterial({
          color: 0xFFFFFF,
          wireframe: true,
          transparent: true,
          opacity: 0.1,
        });

        const cube = new THREE.Mesh(geometry, material);
        const wfloor = new THREE.Mesh(geometry, wmaterial);
        const floor = new THREE.Mesh(geometry, material);
        
        cube.add(wfloor);
        if (!isMobileDevice) {
          cube.castShadow = true;
          cube.receiveShadow = true;
        }
        
        const h = 0.1 + Math.abs(mathRandom(14));
        cube.scale.y = h;
        const cubeWidth = isMobileDevice ? 0.5 : 0.75; 
        cube.scale.x = cube.scale.z = cubeWidth + mathRandom(0.3);
        
        const spread = isMobileDevice ? 12 : 18;
        cube.position.x = mathRandom(spread); 
        cube.position.z = mathRandom(spread);
        cube.position.y = h / 2;

        floor.scale.set(cube.scale.x, 0.05, cube.scale.z);
        floor.position.set(cube.position.x, 0, cube.position.z);
        town.add(floor);
        town.add(cube);
      }
    };

    const initSmoke = () => {
      const gmaterial = new THREE.MeshToonMaterial({ color: 0xFFAA00 }); 
      const gparticular = new THREE.CircleGeometry(0.02, 3);
      // Reduce smoke particles on mobile for performance
      const smokeCount = isMobileDevice ? 100 : 350;
      for (let h = 1; h < smokeCount; h++) {
        const particular = new THREE.Mesh(gparticular, gmaterial);
        const smokeSpread = isMobileDevice ? 15 : 25;
        particular.position.set(mathRandom(smokeSpread), mathRandom(smokeSpread), mathRandom(smokeSpread));
        smoke.add(particular);
      }
    };

    const initBase = () => {
        const pmaterial = new THREE.MeshPhongMaterial({ color: 0x000000, opacity: 0.85, transparent: true });
        const pgeometry = new THREE.PlaneGeometry(200, 200);
        const pelement = new THREE.Mesh(pgeometry, pmaterial);
        pelement.rotation.x = -Math.PI / 2;
        pelement.position.y = -0.01;
        pelement.receiveShadow = true;
        city.add(pelement);
    };

    const ambientLight = new THREE.AmbientLight(0xFFFFFF, isMobileDevice ? 2 : 3);
    const lightFront = new THREE.SpotLight(0xFFFFFF, isMobileDevice ? 25 : 50, 100); 
    lightFront.position.set(40, 40, 40);
    if (!isMobileDevice) {
      lightFront.castShadow = true;
    }
    
    const gridHelper = new THREE.GridHelper(isMobileDevice ? 100 : 150, isMobileDevice ? 25 : 50, 0xFFAA00, 0x111111);

    initBase();
    initBuildings();
    initSmoke();

    scene.add(ambientLight);
    city.add(lightFront, gridHelper, smoke, town);
    scene.add(city);

    // Mouse movement handlers
    const onGlobalMouseMove = (e: MouseEvent) => {
      if (!isMobileDevice) {
        mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      }
    };
    
    // Touch movement handlers for mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        e.preventDefault();
        touch.current.startX = e.touches[0].clientX;
        touch.current.startY = e.touches[0].clientY;
      }
    };
    
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        e.preventDefault();
        const deltaX = e.touches[0].clientX - touch.current.startX;
        const deltaY = e.touches[0].clientY - touch.current.startY;
        
        // Convert touch movement to normalized coordinates with better sensitivity
        touch.current.x = (deltaX / window.innerWidth) * 3; // Increased sensitivity
        touch.current.y = -(deltaY / window.innerHeight) * 3;
      }
    };
    
    const onTouchEnd = () => {
      touch.current.x = 0;
      touch.current.y = 0;
    };
    
    // Add appropriate event listeners
    if (isMobileDevice) {
      const canvas = renderer.domElement;
      canvas.addEventListener('touchstart', onTouchStart, { passive: false });
      canvas.addEventListener('touchmove', onTouchMove, { passive: false });
      canvas.addEventListener('touchend', onTouchEnd, { passive: false });
    } else {
      window.addEventListener('mousemove', onGlobalMouseMove);
    }

    const animate = () => {
      const id = requestAnimationFrame(animate);
      
      // 3. MOUSE/TOUCH ROTATION LOGIC
      const inputX = isMobileDevice ? touch.current.x : mouse.current.x;
      const inputY = isMobileDevice ? touch.current.y : mouse.current.y;
      const sensitivity = isMobileDevice ? 0.8 : 1; // Increased mobile sensitivity
      const smoothing = isMobileDevice ? 0.06 : 0.04; // Smoother animation on mobile
      
      targetRotation.current.y = (inputX * Math.PI * sensitivity) + 0.5; 
      targetRotation.current.x = (-inputY * Math.PI * 0.5 * sensitivity) - 0.5;

      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * smoothing;
      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * smoothing;

      city.rotation.y = currentRotation.current.y;
      city.rotation.x = currentRotation.current.x;
      
      smoke.rotation.y += 0.001;
      
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      renderer.render(scene, camera);
      return id;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    const animationId = animate();

    initializeAudioOnInteraction();
    try { playEntranceSoundOnce(); } catch {}

    return () => {
      window.removeEventListener('resize', handleResize);
      if (isMobileDevice) {
        const canvas = renderer.domElement;
        canvas.removeEventListener('touchstart', onTouchStart);
        canvas.removeEventListener('touchmove', onTouchMove);
        canvas.removeEventListener('touchend', onTouchEnd);
      } else {
        window.removeEventListener('mousemove', onGlobalMouseMove);
      }
      cancelAnimationFrame(animationId);
      renderer.dispose();
      if (cityContainerRef.current) cityContainerRef.current.innerHTML = '';
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen w-full overflow-hidden bg-black pt-24">
      <div 
        ref={cityContainerRef} 
        className="absolute inset-0 z-0 opacity-80" 
        style={{ 
          pointerEvents: isMobile.current || isTablet.current ? 'auto' : 'none',
          touchAction: 'none'
        }}
      />

      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.5) 70%, #000 100%)"
      }} />

      <div className="relative z-10 min-h-screen flex items-end justify-center px-6 pb-40">
        <div className="max-w-3xl mx-auto text-center">
          
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-white leading-tight mb-6 text-[clamp(2.8rem,6vw,5rem)] uppercase"
            style={{ fontFamily: "Thunder-BlackLC, sans-serif" }}
          >
           
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mb-12"
          >
            <InlineDynamicText />
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={playHoverSound}
              onClick={() => {
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                playClickSound();
              }}
            >
              <ButtonHoverRight />
            </motion.div>

            <motion.a
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              href="/Shivaraj_N_Kengannavar_Resume.pdf"
              download
              onHoverStart={playHoverSound}
              onClick={playSuccessSound}
            >
              <ButtonCreativeRight />
            </motion.a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
