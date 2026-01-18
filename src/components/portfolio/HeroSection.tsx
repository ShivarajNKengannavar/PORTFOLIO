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

export default function HeroSection() {
  const cityContainerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  
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

    renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true, 
        powerPreference: "high-performance",
        precision: "highp"
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    cityContainerRef.current.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
    // 2. POSITION CAMERA (Balanced zoom out)
    camera.position.set(0, 10, 35); 

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.Fog(THEME_ORANGE, 10, 75);

    const mathRandom = (num = 10) => -Math.random() * num + Math.random() * num;

    const initBuildings = () => {
      const geometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1);
      
      for (let i = 1; i < 160; i++) {
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
        cube.castShadow = true;
        cube.receiveShadow = true;
        
        const h = 0.1 + Math.abs(mathRandom(14));
        cube.scale.y = h;
        const cubeWidth = 0.75; 
        cube.scale.x = cube.scale.z = cubeWidth + mathRandom(0.3);
        
        cube.position.x = mathRandom(18); 
        cube.position.z = mathRandom(18);
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
      for (let h = 1; h < 350; h++) {
        const particular = new THREE.Mesh(gparticular, gmaterial);
        particular.position.set(mathRandom(25), mathRandom(25), mathRandom(25));
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

    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 3);
    const lightFront = new THREE.SpotLight(0xFFFFFF, 50, 100); 
    lightFront.position.set(40, 40, 40);
    lightFront.castShadow = true;
    
    const gridHelper = new THREE.GridHelper(150, 50, 0xFFAA00, 0x111111);

    initBase();
    initBuildings();
    initSmoke();

    scene.add(ambientLight);
    city.add(lightFront, gridHelper, smoke, town);
    scene.add(city);

    const onGlobalMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onGlobalMouseMove);

    const animate = () => {
      const id = requestAnimationFrame(animate);
      
      // 3. MOUSE ROTATION LOGIC (Adds mouse offset to the starting angle)
      // The -0.5 and 0.5 constants keep the city tilted even if mouse doesn't move
      targetRotation.current.y = (mouse.current.x * Math.PI) + 0.5; 
      targetRotation.current.x = (-mouse.current.y * Math.PI * 0.5) - 0.5;

      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.04;
      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.04;

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
      window.removeEventListener('mousemove', onGlobalMouseMove);
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
        style={{ pointerEvents: 'none' }}
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
