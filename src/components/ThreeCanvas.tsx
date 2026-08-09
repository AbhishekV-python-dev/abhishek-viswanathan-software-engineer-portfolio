import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  themeAccent: 'emerald' | 'cyan' | 'violet' | 'amber';
  scrollProgress: number;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ themeAccent, scrollProgress }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const mainObjectGroupRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const ringsRef = useRef<THREE.Group | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Map theme accent to HEX colors
  const getColorHex = (accent: string) => {
    switch (accent) {
      case 'emerald': return 0x10b981; // Emerald Green (Python/Flask)
      case 'cyan': return 0x06b6d4;    // Cyber Cyan (Databases/Cloud)
      case 'violet': return 0x8b5cf6;  // Electric Violet (AI/LLM)
      case 'amber': return 0xf59e0b;   // Sunset Gold (Support/Operations)
      default: return 0x10b981;
    }
  };

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x050505, 0.035);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 18;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(getColorHex(themeAccent), 3, 50);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x3b82f6, 2, 50);
    pointLight2.position.set(-10, -10, -5);
    scene.add(pointLight2);

    // 4. Group for floating 3D objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);
    mainObjectGroupRef.current = mainGroup;

    // 4a. Wireframe Icosahedron Core
    const coreGeometry = new THREE.IcosahedronGeometry(4, 2);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: getColorHex(themeAccent),
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      roughness: 0.2,
      metalness: 0.8
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    mainGroup.add(coreMesh);

    // 4b. Inner Glowing Crystal Octahedron
    const innerGeometry = new THREE.OctahedronGeometry(2, 0);
    const innerMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: getColorHex(themeAccent),
      emissiveIntensity: 0.6,
      wireframe: false,
      transparent: true,
      opacity: 0.75
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    mainGroup.add(innerMesh);

    // 4c. Orbital Rings
    const ringsGroup = new THREE.Group();
    ringsRef.current = ringsGroup;
    mainGroup.add(ringsGroup);

    const ringCount = 3;
    for (let i = 0; i < ringCount; i++) {
      const ringGeo = new THREE.TorusGeometry(5.5 + i * 1.5, 0.04, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color: getColorHex(themeAccent),
        transparent: true,
        opacity: 0.4 - i * 0.1
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / (2 + i * 0.5);
      ringMesh.rotation.y = i * 0.8;
      ringsGroup.add(ringMesh);
    }

    // 4d. Floating Tech Data Particles Field
    const particlesCount = 800;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 60;
      posArray[i + 1] = (Math.random() - 0.5) * 60;
      posArray[i + 2] = (Math.random() - 0.5) * 40;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.12,
      color: getColorHex(themeAccent),
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // 5. Mouse Interaction Handler
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.targetX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = -(event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 6. Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // 7. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth Mouse Interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Group Rotations
      if (mainGroup) {
        mainGroup.rotation.y = elapsedTime * 0.15 + mouseRef.current.x * 0.4;
        mainGroup.rotation.x = Math.sin(elapsedTime * 0.1) * 0.2 + mouseRef.current.y * 0.3;
      }

      if (ringsGroup) {
        ringsGroup.rotation.z = elapsedTime * 0.1;
        ringsGroup.rotation.y = -elapsedTime * 0.15;
      }

      if (particles) {
        particles.rotation.y = elapsedTime * 0.03;
      }

      // Render
      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Effect to update theme accent color in WebGL
  useEffect(() => {
    if (!sceneRef.current) return;
    const hexColor = getColorHex(themeAccent);

    sceneRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.material instanceof THREE.MeshStandardMaterial) {
          child.material.color.setHex(hexColor);
          if (child.material.emissive) {
            child.material.emissive.setHex(hexColor);
          }
        } else if (child.material instanceof THREE.MeshBasicMaterial) {
          child.material.color.setHex(hexColor);
        }
      } else if (child instanceof THREE.Points) {
        if (child.material instanceof THREE.PointsMaterial) {
          child.material.color.setHex(hexColor);
        }
      } else if (child instanceof THREE.PointLight) {
        child.color.setHex(hexColor);
      }
    });
  }, [themeAccent]);

  // Effect to update 3D scale and position based on scroll progress
  useEffect(() => {
    if (!mainObjectGroupRef.current) return;
    const group = mainObjectGroupRef.current;

    // Morph transformation according to scroll position
    const scale = 1 - scrollProgress * 0.3; // shrink slightly as scroll progresses
    group.scale.set(scale, scale, scale);

    // Shift 3D core location seamlessly across page sections
    group.position.y = -scrollProgress * 8 + Math.sin(scrollProgress * Math.PI * 2) * 2;
    group.position.x = Math.cos(scrollProgress * Math.PI) * 5;
  }, [scrollProgress]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-80 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
};
