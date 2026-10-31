import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const DimensionalBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle Field 1: Iridescent Pearl Spores & Stardust (Mermaids & Fairies)
    const particleCount = 180;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const colors = new Float32Array(particleCount * 3);

    // BESEGÉ Palette in RGB
    const colorViolet = new THREE.Color('#584EE3');
    const colorRose = new THREE.Color('#E8A2B8');
    const colorGold = new THREE.Color('#C9A86A');
    const colorBone = new THREE.Color('#FAF7EE');
    const palette = [colorViolet, colorRose, colorGold, colorBone];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 70;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 35;

      scales[i] = Math.random() * 2.5 + 0.8;

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom circular soft particle texture
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.7)');
      gradient.addColorStop(0.8, 'rgba(255, 255, 255, 0.15)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 1.2,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mesh 2: Floating Organic Ribbon Rings (Ethereal body jewelry curves)
    const curveGroup = new THREE.Group();
    const curveCount = 3;
    for (let c = 0; c < curveCount; c++) {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-15 + c * 10, -10, -5),
        new THREE.Vector3(-5 + c * 5, 8, 2),
        new THREE.Vector3(10 - c * 5, -6, -3),
        new THREE.Vector3(18 - c * 8, 12, 4),
      ]);
      const tubeGeometry = new THREE.TubeGeometry(curve, 64, 0.08, 8, false);
      const tubeMaterial = new THREE.MeshBasicMaterial({
        color: c === 0 ? 0x584ee3 : c === 1 ? 0xc9a86a : 0xe8a2b8,
        transparent: true,
        opacity: 0.18,
      });
      const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
      curveGroup.add(tube);
    }
    scene.add(curveGroup);

    // Mouse & Scroll Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollY = 0;
    let targetScrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop with smooth inertia
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      targetScrollY += (scrollY - targetScrollY) * 0.08;

      // Gentle orbital drift
      particles.rotation.y = elapsedTime * 0.03 + targetX * 0.2;
      particles.rotation.x = Math.sin(elapsedTime * 0.05) * 0.1 + targetY * 0.2;

      // React to scroll: particles flow upwards as user scrolls down
      particles.position.y = (targetScrollY * 0.015) % 30;

      // Curve ribbon undulating motion
      curveGroup.rotation.y = elapsedTime * 0.05 + targetX * 0.1;
      curveGroup.rotation.z = Math.cos(elapsedTime * 0.04) * 0.1;
      curveGroup.position.y = -targetScrollY * 0.008;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.85 }}
    />
  );
};
