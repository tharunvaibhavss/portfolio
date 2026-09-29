"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeHeroSceneProps {
  className?: string;
}

export default function ThreeHeroScene({ className = "" }: ThreeHeroSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check device capabilities & reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf8fafc, 0.04);

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 600;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    container.appendChild(renderer.domElement);

    // Group for entire interactive network
    const networkGroup = new THREE.Group();
    scene.add(networkGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x0066ff, 2.5, 20);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    // 1. Central Core Node
    const coreGeo = new THREE.SphereGeometry(0.3, 24, 24);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0066ff,
      emissive: 0x0044cc,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    networkGroup.add(coreMesh);

    // Orbit rings around center
    const ringGeo1 = new THREE.RingGeometry(1.6, 1.62, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x0066ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 2.3;
    networkGroup.add(ringMesh1);

    const ringGeo2 = new THREE.RingGeometry(2.5, 2.52, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.18,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.y = Math.PI / 3;
    ringMesh2.rotation.x = Math.PI / 4;
    networkGroup.add(ringMesh2);

    // 2. The 4 Engineering Nodes: AI (Top), DATA (Left), SOFTWARE (Right), IoT (Bottom)
    const nodeData = [
      { name: "AI", pos: new THREE.Vector3(0, 2.2, 0.2), color: 0x0066ff, size: 0.22 },
      { name: "DATA", pos: new THREE.Vector3(-2.3, 0, 0.4), color: 0x0284c7, size: 0.2 },
      { name: "SOFTWARE", pos: new THREE.Vector3(2.3, 0, -0.2), color: 0x2563eb, size: 0.22 },
      { name: "IoT", pos: new THREE.Vector3(0, -2.2, 0.1), color: 0x06b6d4, size: 0.2 },
    ];

    const nodeMeshes: THREE.Mesh[] = [];
    const lineGeometries: THREE.BufferGeometry[] = [];

    nodeData.forEach((node) => {
      // Node mesh
      const geo = new THREE.SphereGeometry(node.size, 20, 20);
      const mat = new THREE.MeshStandardMaterial({
        color: node.color,
        emissive: node.color,
        emissiveIntensity: 0.5,
        roughness: 0.3,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(node.pos);
      networkGroup.add(mesh);
      nodeMeshes.push(mesh);

      // Node subtle halo
      const haloGeo = new THREE.RingGeometry(node.size * 1.5, node.size * 1.6, 32);
      const haloMat = new THREE.MeshBasicMaterial({
        color: node.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4,
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.position.copy(node.pos);
      halo.lookAt(camera.position);
      networkGroup.add(halo);

      // Connecting line to center core
      const linePts = [new THREE.Vector3(0, 0, 0), node.pos];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(linePts);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x0066ff,
        transparent: true,
        opacity: 0.35,
        linewidth: 1,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      networkGroup.add(line);
      lineGeometries.push(lineGeo);
    });

    // Cross connecting lines (AI to SOFTWARE, DATA to IoT, etc.) to form technical web
    const crossConnections = [
      [nodeData[0].pos, nodeData[1].pos], // AI - DATA
      [nodeData[0].pos, nodeData[2].pos], // AI - SOFTWARE
      [nodeData[1].pos, nodeData[3].pos], // DATA - IoT
      [nodeData[2].pos, nodeData[3].pos], // SOFTWARE - IoT
    ];

    crossConnections.forEach(([p1, p2]) => {
      const geo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
      const mat = new THREE.LineBasicMaterial({
        color: 0x94a3b8,
        transparent: true,
        opacity: 0.2,
      });
      const line = new THREE.Line(geo, mat);
      networkGroup.add(line);
      lineGeometries.push(geo);
    });

    // 3. Subtle floating technical particles
    const particleCount = isMobile ? 50 : prefersReducedMotion ? 40 : 140;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 1.8 + Math.random() * 2.8;

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
      particleScales[i] = 0.5 + Math.random() * 0.8;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x0066ff,
      size: 0.05,
      transparent: true,
      opacity: 0.45,
      blending: THREE.NormalBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    networkGroup.add(particles);

    // 4. Mouse movement parallax tracking
    let targetX = 0;
    let targetY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 0.7;
      targetY = -y * 0.7;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Resize handling
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 5. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth mouse lerping
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      if (!prefersReducedMotion) {
        // Slow elegant rotation of the network
        networkGroup.rotation.y = elapsed * 0.08 + mouseX * 0.6;
        networkGroup.rotation.x = Math.sin(elapsed * 0.05) * 0.1 + mouseY * 0.4;

        // Subtle core breathing
        const coreScale = 1 + Math.sin(elapsed * 2) * 0.04;
        coreMesh.scale.set(coreScale, coreScale, coreScale);

        // Ring rotations
        ringMesh1.rotation.z = elapsed * 0.05;
        ringMesh2.rotation.z = -elapsed * 0.04;

        // Slow particle drift
        particles.rotation.y = -elapsed * 0.03;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 6. Memory Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose geometries & materials
      coreGeo.dispose();
      coreMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      nodeMeshes.forEach((mesh) => {
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) mesh.material.forEach((m) => m.dispose());
        else mesh.material.dispose();
      });
      lineGeometries.forEach((g) => g.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full pointer-events-none select-none ${className}`}
      aria-hidden="true"
    />
  );
}
