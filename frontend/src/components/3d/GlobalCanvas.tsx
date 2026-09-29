"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { use3DWorld, SectionType } from "@/context/ThreeDContext";
import { Hero3DSystem } from "./Hero3DSystem";
import { Projects3DSystem } from "./Projects3DSystem";

export default function GlobalCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    activeSection,
    scrollProgress,
    mouse,
    activeDiscipline,
    hoveredDiscipline,
    activeProjectSlug,
    hoveredProjectSlug,
    isMobile,
    prefersReducedMotion,
  } = use3DWorld();

  // Store reactive props in refs so the render loop can access them without recreating the scene
  const activeSectionRef = useRef<SectionType>(activeSection);
  activeSectionRef.current = activeSection;

  const scrollProgressRef = useRef(scrollProgress);
  scrollProgressRef.current = scrollProgress;

  const mouseRef = useRef(mouse);
  mouseRef.current = mouse;

  const activeDisciplineRef = useRef(activeDiscipline);
  activeDisciplineRef.current = activeDiscipline;

  const hoveredDisciplineRef = useRef(hoveredDiscipline);
  hoveredDisciplineRef.current = hoveredDiscipline;

  const activeProjectSlugRef = useRef(activeProjectSlug);
  activeProjectSlugRef.current = activeProjectSlug;

  const hoveredProjectSlugRef = useRef(hoveredProjectSlug);
  hoveredProjectSlugRef.current = hoveredProjectSlug;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf8fafc, 0.04);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 9);

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    // 4. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const mainDirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainDirLight.position.set(5, 8, 10);
    scene.add(mainDirLight);

    const bluePointLight = new THREE.PointLight(0x0066ff, 2.2, 18);
    bluePointLight.position.set(2, 2, 4);
    scene.add(bluePointLight);

    const cyanFillLight = new THREE.PointLight(0x00f0ff, 1.4, 14);
    cyanFillLight.position.set(-3, -2, 3);
    scene.add(cyanFillLight);

    // 5. Global 3D Network Group
    const networkGroup = new THREE.Group();
    scene.add(networkGroup);

    // 5.1 Initialize Hero 3D System (AI Neural, Data Stream, IoT Beacon, Software Lattice)
    const hero3D = new Hero3DSystem(isMobile, prefersReducedMotion);
    networkGroup.add(hero3D.group);

    // 5.2 Initialize Projects 3D System (Case Studies 3D Architecture)
    const projects3D = new Projects3DSystem(isMobile, prefersReducedMotion);
    projects3D.group.position.set(isMobile ? 0 : 1.7, isMobile ? -0.5 : 0.05, 0);
    projects3D.group.visible = false;
    scene.add(projects3D.group);

    // 6. Ambient Floating Data Particles
    const particleCount = isMobile ? 60 : prefersReducedMotion ? 40 : 180;
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 2.2 + Math.random() * 3.8;

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x0066ff,
      size: isMobile ? 0.05 : 0.065,
      transparent: true,
      opacity: 0.45,
      blending: THREE.NormalBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    networkGroup.add(particles);

    // 7. Dynamic Camera Targets based on Section
    const cameraTargets: Record<SectionType, { x: number; y: number; z: number; netX: number; netY: number; scale: number }> = {
      home: { x: 0, y: 0, z: 9, netX: 2.2, netY: 0, scale: 1.0 },
      about: { x: 0.8, y: -0.4, z: 8.5, netX: -2.0, netY: -0.3, scale: 0.95 },
      engineering: { x: 0, y: 0, z: 8.0, netX: 0, netY: 0, scale: 1.15 },
      projects: { x: -0.6, y: 0.2, z: 8.2, netX: 2.4, netY: 0.2, scale: 0.9 },
      experience: { x: 0.7, y: -0.2, z: 8.5, netX: -2.2, netY: 0.2, scale: 0.85 },
      skills: { x: 0, y: 0, z: 8.8, netX: 0, netY: 0, scale: 1.05 },
      certifications: { x: -0.5, y: -0.3, z: 8.5, netX: 2.0, netY: -0.2, scale: 0.9 },
      achievements: { x: 0.6, y: 0.3, z: 8.5, netX: -2.0, netY: 0.3, scale: 0.95 },
      contact: { x: 0, y: -0.6, z: 8.2, netX: 0, netY: 0.4, scale: 1.0 },
    };

    // 8. Animation & Render Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    let currentCamX = 0;
    let currentCamY = 0;
    let currentCamZ = 9;
    let currentNetX = 2.2;
    let currentNetY = 0;
    let currentScale = 1.0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();

      // 8.1 Smooth camera interpolation based on active section & mouse parallax
      const active = activeSectionRef.current || "home";
      const target = cameraTargets[active] || cameraTargets.home;

      const parallaxAmount = prefersReducedMotion ? 0 : 0.45;
      const targetCamX = target.x + (isMobile ? 0 : mouseRef.current.x * parallaxAmount);
      const targetCamY = target.y + (isMobile ? 0 : mouseRef.current.y * parallaxAmount);
      const targetCamZ = target.z;

      currentCamX += (targetCamX - currentCamX) * 0.05;
      currentCamY += (targetCamY - currentCamY) * 0.05;
      currentCamZ += (targetCamZ - currentCamZ) * 0.05;

      camera.position.set(currentCamX, currentCamY, currentCamZ);
      camera.lookAt(0, 0, 0);

      // 8.2 Smooth network group positioning & scaling
      const targetNetX = isMobile ? 0 : target.netX;
      const targetNetY = isMobile ? -0.3 : target.netY;
      const targetScale = target.scale;

      currentNetX += (targetNetX - currentNetX) * 0.06;
      currentNetY += (targetNetY - currentNetY) * 0.06;
      currentScale += (targetScale - currentScale) * 0.06;

      networkGroup.position.set(currentNetX, currentNetY, 0);
      networkGroup.scale.set(currentScale, currentScale, currentScale);

      // Subtle slow rotation of global network
      if (!prefersReducedMotion) {
        networkGroup.rotation.y = elapsed * 0.04;
        networkGroup.rotation.x = Math.sin(elapsed * 0.02) * 0.05;
      }

      // 8.3 Section-aware rendering: Switch cleanly between Hero & Projects 3D Systems
      const inProjects = active === "projects";
      if (inProjects) {
        hero3D.group.visible = false;
        particles.visible = false;

        projects3D.update(
          delta,
          elapsed,
          mouseRef.current,
          active,
          scrollProgressRef.current,
          camera,
          activeProjectSlugRef.current || "cat-industrial-diagnostic-system",
          hoveredProjectSlugRef.current
        );
      } else {
        hero3D.group.visible = true;
        particles.visible = true;

        hero3D.update(
          delta,
          elapsed,
          mouseRef.current,
          active,
          scrollProgressRef.current,
          camera,
          activeDisciplineRef.current,
          hoveredDisciplineRef.current
        );
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handling
    const handleResize = () => {
      if (!container) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // 10. Memory Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      hero3D.dispose();
      projects3D.dispose();
      scene.remove(projects3D.group);
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [isMobile, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    />
  );
}
