import * as THREE from "three";

interface DisciplineNode {
  id: string;
  name: string;
  basePos: THREE.Vector3;
  color: number;
  emissiveColor: number;
  size: number;
  mesh: THREE.Mesh;
  halo: THREE.Mesh;
  light?: THREE.PointLight;
}

export class Hero3DSystem {
  public group: THREE.Group;

  // Visual sub-elements
  private coreMesh: THREE.Mesh;
  private coreWireMesh: THREE.Mesh;
  private coreLight: THREE.PointLight;

  private orbitalRings: THREE.Mesh[] = [];
  private orbitalWaypoints: THREE.Mesh[] = [];

  private disciplineNodes: DisciplineNode[] = [];
  private conduitLines: THREE.Line[] = [];

  // AI Synaptic sub-elements
  private aiSatellites: THREE.Mesh[] = [];
  private aiSynapseLines: THREE.LineSegments;
  private aiSynapsePosArray: Float32Array;

  // DATA Stream sub-elements
  private dataColumns: THREE.Mesh[] = [];
  private dataParticles: THREE.Points;
  private dataParticlePos: Float32Array;
  private dataParticleOffsets: Float32Array;
  private dataParticleCount = 24;

  // IoT Beacon sub-elements
  private iotSensors: THREE.Mesh[] = [];
  private iotBeaconRings: THREE.Mesh[] = [];

  // SOFTWARE Architectural Lattice sub-elements
  private softwareGridMesh: THREE.Mesh;
  private softwarePlanes: THREE.Mesh[] = [];

  // State & Flags
  private isMobile = false;
  private prefersReducedMotion = false;
  private tempVec = new THREE.Vector3();
  private nodeWorldVec = new THREE.Vector3();

  // Resource Tracking for Disposal
  private disposableGeometries: THREE.BufferGeometry[] = [];
  private disposableMaterials: THREE.Material[] = [];

  constructor(isMobile = false, prefersReducedMotion = false) {
    this.isMobile = isMobile;
    this.prefersReducedMotion = prefersReducedMotion;
    this.group = new THREE.Group();
    this.group.name = "Hero3DSystem";

    // Adjust particle count for mobile
    if (this.isMobile) {
      this.dataParticleCount = 8;
    }

    // 1. Central Core ("IDEA" — Wild Idea, Wealthy Innovation)
    const coreGeo = new THREE.SphereGeometry(0.34, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0066ff,
      emissive: 0x0055ff,
      emissiveIntensity: 0.8,
      roughness: 0.15,
      metalness: 0.85,
    });
    this.coreMesh = new THREE.Mesh(coreGeo, coreMat);
    this.group.add(this.coreMesh);
    this.disposableGeometries.push(coreGeo);
    this.disposableMaterials.push(coreMat);

    // Crystalline Lattice Cage
    const wireGeo = new THREE.IcosahedronGeometry(0.48, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    this.coreWireMesh = new THREE.Mesh(wireGeo, wireMat);
    this.group.add(this.coreWireMesh);
    this.disposableGeometries.push(wireGeo);
    this.disposableMaterials.push(wireMat);

    // Core Point Light
    this.coreLight = new THREE.PointLight(0x0066ff, 1.8, 8);
    this.group.add(this.coreLight);

    // 2. Orbital Stabilization Rings (Engineering & Innovation)
    const ringGeo1 = new THREE.RingGeometry(1.88, 1.91, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x0066ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.24,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 2.3;
    this.group.add(ringMesh1);
    this.orbitalRings.push(ringMesh1);
    this.disposableGeometries.push(ringGeo1);
    this.disposableMaterials.push(ringMat1);

    const ringGeo2 = new THREE.RingGeometry(3.1, 3.13, 80);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.18,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.y = Math.PI / 3.2;
    ringMesh2.rotation.x = Math.PI / 4.8;
    this.group.add(ringMesh2);
    this.orbitalRings.push(ringMesh2);
    this.disposableGeometries.push(ringGeo2);
    this.disposableMaterials.push(ringMat2);

    // Orbital Waypoint Markers (6 technical nodes along the outer ring)
    const waypointGeo = new THREE.OctahedronGeometry(0.045, 0);
    const waypointMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
    });
    this.disposableGeometries.push(waypointGeo);
    this.disposableMaterials.push(waypointMat);

    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const wp = new THREE.Mesh(waypointGeo, waypointMat);
      wp.position.set(Math.cos(angle) * 3.11, Math.sin(angle) * 3.11, 0);
      ringMesh2.add(wp);
      this.orbitalWaypoints.push(wp);
    }

    // 3. The 4 Engineering Disciplines
    const nodeDefs = [
      {
        id: "ai",
        name: "AI",
        pos: new THREE.Vector3(0, 2.55, 0.35),
        color: 0x0066ff,
        emissiveColor: 0x0055ff,
        size: 0.28,
      },
      {
        id: "data",
        name: "DATA",
        pos: new THREE.Vector3(-2.75, -0.15, 0.45),
        color: 0x0284c7,
        emissiveColor: 0x0ea5e9,
        size: 0.25,
      },
      {
        id: "software",
        name: "SOFTWARE",
        pos: new THREE.Vector3(2.75, 0.15, -0.35),
        color: 0x2563eb,
        emissiveColor: 0x3b82f6,
        size: 0.28,
      },
      {
        id: "iot",
        name: "IoT",
        pos: new THREE.Vector3(0, -2.55, 0.25),
        color: 0x06b6d4,
        emissiveColor: 0x0891b2,
        size: 0.25,
      },
    ];

    nodeDefs.forEach((def) => {
      // Main Node Sphere
      const geo = new THREE.SphereGeometry(def.size, 24, 24);
      const mat = new THREE.MeshStandardMaterial({
        color: def.color,
        emissive: def.emissiveColor,
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.85,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(def.pos);
      this.group.add(mesh);
      this.disposableGeometries.push(geo);
      this.disposableMaterials.push(mat);

      // Node Halo Ring
      const haloGeo = new THREE.RingGeometry(def.size * 1.45, def.size * 1.55, 32);
      const haloMat = new THREE.MeshBasicMaterial({
        color: def.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.35,
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.position.copy(def.pos);
      this.group.add(halo);
      this.disposableGeometries.push(haloGeo);
      this.disposableMaterials.push(haloMat);

      // Subtle Point Light for Proximity & Accent
      const light = new THREE.PointLight(def.color, 0.8, 3.5);
      light.position.copy(def.pos);
      this.group.add(light);

      this.disciplineNodes.push({
        id: def.id,
        name: def.name,
        basePos: def.pos.clone(),
        color: def.color,
        emissiveColor: def.emissiveColor,
        size: def.size,
        mesh,
        halo,
        light,
      });

      // Primary Conduit Line to Central Core
      const linePts = [new THREE.Vector3(0, 0, 0), def.pos];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(linePts);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x0066ff,
        transparent: true,
        opacity: 0.32,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      this.group.add(line);
      this.conduitLines.push(line);
      this.disposableGeometries.push(lineGeo);
      this.disposableMaterials.push(lineMat);
    });

    // Cross-Conduits (Interdisciplinary Circuit: Curiosity & Experimentation)
    const crossPairs = [
      [this.disciplineNodes[0].basePos, this.disciplineNodes[1].basePos], // AI - DATA
      [this.disciplineNodes[0].basePos, this.disciplineNodes[2].basePos], // AI - SOFTWARE
      [this.disciplineNodes[1].basePos, this.disciplineNodes[3].basePos], // DATA - IoT
      [this.disciplineNodes[2].basePos, this.disciplineNodes[3].basePos], // SOFTWARE - IoT
    ];

    crossPairs.forEach(([p1, p2]) => {
      const geo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
      const mat = new THREE.LineBasicMaterial({
        color: 0x94a3b8,
        transparent: true,
        opacity: 0.22,
      });
      const line = new THREE.Line(geo, mat);
      this.group.add(line);
      this.conduitLines.push(line);
      this.disposableGeometries.push(geo);
      this.disposableMaterials.push(mat);
    });

    // 4. Discipline Distinct Sub-Systems

    // 4.1 AI: Neural-Node Constellation with Synaptic Fibers
    const aiNode = this.disciplineNodes[0];
    const satelliteGeo = new THREE.SphereGeometry(0.055, 12, 12);
    const satelliteMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.7,
      roughness: 0.1,
    });
    this.disposableGeometries.push(satelliteGeo);
    this.disposableMaterials.push(satelliteMat);

    const satelliteOffsets = [
      new THREE.Vector3(0.42, 0.25, 0.1),
      new THREE.Vector3(-0.45, 0.22, -0.1),
      new THREE.Vector3(0.28, -0.38, 0.15),
      new THREE.Vector3(-0.32, -0.35, -0.15),
      new THREE.Vector3(0, 0.48, 0.2),
    ];

    satelliteOffsets.forEach((off) => {
      const sat = new THREE.Mesh(satelliteGeo, satelliteMat);
      sat.position.copy(aiNode.basePos).add(off);
      this.group.add(sat);
      this.aiSatellites.push(sat);
    });

    // Synaptic Lines between AI core and satellites
    const synapsePairs = 5 * 2;
    this.aiSynapsePosArray = new Float32Array(synapsePairs * 3);
    const synapseGeo = new THREE.BufferGeometry();
    synapseGeo.setAttribute("position", new THREE.BufferAttribute(this.aiSynapsePosArray, 3));
    const synapseMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.4,
    });
    this.aiSynapseLines = new THREE.LineSegments(synapseGeo, synapseMat);
    this.group.add(this.aiSynapseLines);
    this.disposableGeometries.push(synapseGeo);
    this.disposableMaterials.push(synapseMat);

    // 4.2 DATA: Streaming Particles and 3D Micro Telemetry Columns
    const dataNode = this.disciplineNodes[1];

    // 4 Micro Telemetry Columns
    const colGeo = new THREE.BoxGeometry(0.08, 0.35, 0.08);
    const colColors = [0x0284c7, 0x0ea5e9, 0x38bdf8, 0x0066ff];

    for (let i = 0; i < 4; i++) {
      const colMat = new THREE.MeshStandardMaterial({
        color: colColors[i],
        emissive: colColors[i],
        emissiveIntensity: 0.4,
        roughness: 0.2,
      });
      const col = new THREE.Mesh(colGeo, colMat);
      col.position.set(
        dataNode.basePos.x + (i - 1.5) * 0.12,
        dataNode.basePos.y - 0.45,
        dataNode.basePos.z + (i % 2 === 0 ? 0.05 : -0.05)
      );
      this.group.add(col);
      this.dataColumns.push(col);
      this.disposableMaterials.push(colMat);
    }
    this.disposableGeometries.push(colGeo);

    // Streaming Particles along Data Conduits
    this.dataParticlePos = new Float32Array(this.dataParticleCount * 3);
    this.dataParticleOffsets = new Float32Array(this.dataParticleCount);
    for (let i = 0; i < this.dataParticleCount; i++) {
      this.dataParticleOffsets[i] = i / this.dataParticleCount;
    }

    const dataStreamGeo = new THREE.BufferGeometry();
    dataStreamGeo.setAttribute("position", new THREE.BufferAttribute(this.dataParticlePos, 3));
    const dataStreamMat = new THREE.PointsMaterial({
      color: 0x00d4ff,
      size: 0.07,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    this.dataParticles = new THREE.Points(dataStreamGeo, dataStreamMat);
    this.group.add(this.dataParticles);
    this.disposableGeometries.push(dataStreamGeo);
    this.disposableMaterials.push(dataStreamMat);

    // 4.3 IoT: Sensor Nodes and Concentric Telemetry Beacon Rings
    const iotNode = this.disciplineNodes[3];

    // 3 Sensor satellite pods
    const sensorGeo = new THREE.BoxGeometry(0.09, 0.09, 0.09);
    const sensorMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x0891b2,
      emissiveIntensity: 0.6,
      roughness: 0.3,
    });
    this.disposableGeometries.push(sensorGeo);
    this.disposableMaterials.push(sensorMat);

    const sensorOffsets = [
      new THREE.Vector3(0.38, -0.15, 0.1),
      new THREE.Vector3(-0.36, -0.18, -0.1),
      new THREE.Vector3(0, -0.42, 0.15),
    ];

    sensorOffsets.forEach((off) => {
      const sensor = new THREE.Mesh(sensorGeo, sensorMat);
      sensor.position.copy(iotNode.basePos).add(off);
      this.group.add(sensor);
      this.iotSensors.push(sensor);
    });

    // 2 Concentric Telemetry Beacon Rings (Radio transmission simulation)
    for (let i = 0; i < 2; i++) {
      const bGeo = new THREE.RingGeometry(0.3, 0.33, 32);
      const bMat = new THREE.MeshBasicMaterial({
        color: 0x06b6d4,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5,
      });
      const bRing = new THREE.Mesh(bGeo, bMat);
      bRing.position.copy(iotNode.basePos);
      this.group.add(bRing);
      this.iotBeaconRings.push(bRing);
      this.disposableGeometries.push(bGeo);
      this.disposableMaterials.push(bMat);
    }

    // 4.4 SOFTWARE: Modular Isometric Architectural Grid Lattice
    const softNode = this.disciplineNodes[2];

    const gridGeo = new THREE.BoxGeometry(0.65, 0.65, 0.65);
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x2563eb,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    this.softwareGridMesh = new THREE.Mesh(gridGeo, gridMat);
    this.softwareGridMesh.position.copy(softNode.basePos);
    this.group.add(this.softwareGridMesh);
    this.disposableGeometries.push(gridGeo);
    this.disposableMaterials.push(gridMat);

    // 2 Layered Architectural Planes
    const planeGeo = new THREE.PlaneGeometry(0.48, 0.48);
    const planeMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    this.disposableGeometries.push(planeGeo);
    this.disposableMaterials.push(planeMat);

    for (let i = 0; i < 2; i++) {
      const p = new THREE.Mesh(planeGeo, planeMat);
      p.position.set(softNode.basePos.x, softNode.basePos.y, softNode.basePos.z + (i === 0 ? 0.12 : -0.12));
      p.rotation.x = Math.PI / 4 + i * 0.2;
      this.group.add(p);
      this.softwarePlanes.push(p);
    }
  }

  public update(
    delta: number,
    elapsed: number,
    mouse: { x: number; y: number },
    activeSection: string,
    scrollProgress: number,
    camera: THREE.PerspectiveCamera,
    activeDiscipline?: string | null,
    hoveredDiscipline?: string | null
  ) {
    if (this.prefersReducedMotion) {
      // In reduced motion, position active/hovered node statically with high contrast
      this.disciplineNodes.forEach((node) => {
        const isSelected = activeDiscipline === node.id;
        const targetScale = isSelected ? 1.25 : 1.0;
        node.mesh.scale.set(targetScale, targetScale, targetScale);
        node.halo.lookAt(camera.position);
      });
      return;
    }

    // 1. Central Core ("IDEA") Breathing & Rotation
    const corePulse = 1 + Math.sin(elapsed * 2.4) * 0.05;
    this.coreMesh.scale.set(corePulse, corePulse, corePulse);
    this.coreWireMesh.rotation.y = elapsed * 0.25;
    this.coreWireMesh.rotation.x = elapsed * 0.18;

    // 2. Orbital Stabilization Rings Rotation (Innovation & Engineering)
    this.orbitalRings[0].rotation.z = elapsed * 0.045;
    this.orbitalRings[1].rotation.z = -elapsed * 0.038;

    // 3. Discipline Nodes Interactive States (Hover, Selection, Pointer Proximity)
    this.disciplineNodes.forEach((node, idx) => {
      // Look at camera for 2D orientation of halos
      node.halo.lookAt(camera.position);

      const isSelected = activeDiscipline === node.id;
      const isHovered = hoveredDiscipline === node.id;
      const hasAnySelected = Boolean(activeDiscipline);

      // Compute target Z position (moves toward viewer on hover & click)
      let targetZ = node.basePos.z;
      let targetScale = 1.0;
      let baseEmissive = 0.6;

      if (isSelected) {
        targetZ = node.basePos.z + 0.65; // Pushes toward camera
        targetScale = 1.35; // Expands its 3D structure
        baseEmissive = 1.4;
      } else if (isHovered) {
        targetZ = node.basePos.z + 0.45; // Moves toward viewer on hover
        targetScale = 1.2;
        baseEmissive = 1.1;
      } else if (hasAnySelected) {
        targetZ = node.basePos.z - 0.1; // Settles slightly back
        targetScale = 0.92;
        baseEmissive = 0.35;
      }

      // Smooth position and scale lerping
      node.mesh.position.z += (targetZ - node.mesh.position.z) * 0.14;
      node.halo.position.z = node.mesh.position.z;

      const currentScale = node.mesh.scale.x;
      const newScale = currentScale + (targetScale - currentScale) * 0.14;
      node.mesh.scale.set(newScale, newScale, newScale);

      // Compute node screen projection for mouse pointer proximity
      node.mesh.getWorldPosition(this.nodeWorldVec);
      this.tempVec.copy(this.nodeWorldVec).project(camera);
      const distToPointer = Math.hypot(mouse.x - this.tempVec.x, mouse.y - this.tempVec.y);

      // Pointer proximity lighting (< 0.35 NDC units)
      let proximityBoost = 0;
      if (distToPointer < 0.35) {
        proximityBoost = Math.max(0, (0.35 - distToPointer) / 0.35);
      }

      const baseMat = node.mesh.material as THREE.MeshStandardMaterial;
      const targetEmissiveVal = baseEmissive + proximityBoost * 0.8;
      baseMat.emissiveIntensity += (targetEmissiveVal - baseMat.emissiveIntensity) * 0.12;

      const haloTargetScale = 1 + (isSelected ? 0.35 : isHovered ? 0.2 : 0) + proximityBoost * 0.25;
      node.halo.scale.set(haloTargetScale, haloTargetScale, 1);

      if (node.light) {
        const targetLight = (isSelected ? 2.2 : isHovered ? 1.6 : 0.8) + proximityBoost * 1.2;
        node.light.intensity += (targetLight - node.light.intensity) * 0.12;
        node.light.position.copy(node.mesh.position);
      }

      // Update primary conduit line opacity (index 0 to 3)
      if (this.conduitLines[idx]) {
        const lineMat = this.conduitLines[idx].material as THREE.LineBasicMaterial;
        const targetLineOpacity = (isSelected || isHovered) ? 0.85 : hasAnySelected ? 0.18 : 0.32;
        lineMat.opacity += (targetLineOpacity - lineMat.opacity) * 0.12;
      }
    });

    // 3.1 Cross-Conduit Line Illumination (index 4 to 7)
    // Cross connections: [AI-DATA, AI-SOFTWARE, DATA-IoT, SOFTWARE-IoT]
    const crossPairs = [
      ["ai", "data"],
      ["ai", "software"],
      ["data", "iot"],
      ["software", "iot"],
    ];

    crossPairs.forEach(([d1, d2], i) => {
      const lineIdx = 4 + i;
      if (this.conduitLines[lineIdx]) {
        const lineMat = this.conduitLines[lineIdx].material as THREE.LineBasicMaterial;
        const isConnectedActive =
          activeDiscipline === d1 || activeDiscipline === d2 ||
          hoveredDiscipline === d1 || hoveredDiscipline === d2;
        const targetCrossOpacity = isConnectedActive ? 0.65 : activeDiscipline ? 0.12 : 0.22;
        lineMat.opacity += (targetCrossOpacity - lineMat.opacity) * 0.12;
      }
    });

    // 4. AI Synaptic Sub-System Animation (Boosts if AI is active/hovered)
    const isAiFocused = activeDiscipline === "ai" || hoveredDiscipline === "ai";
    const aiNode = this.disciplineNodes[0];
    const aiBase = aiNode.mesh.position;
    const aiSpeed = isAiFocused ? 1.4 : 0.8;
    const aiRadiusBoost = isAiFocused ? 0.15 : 0;

    this.aiSatellites.forEach((sat, i) => {
      const angle = elapsed * aiSpeed + (i * Math.PI * 2) / 5;
      const radius = 0.45 + aiRadiusBoost + Math.sin(elapsed * 2 + i) * 0.05;
      sat.position.set(
        aiBase.x + Math.cos(angle) * radius,
        aiBase.y + Math.sin(angle) * 0.35,
        aiBase.z + Math.sin(angle * 1.5) * 0.2
      );

      // Update synapse line segment vertices
      const idx = i * 6;
      this.aiSynapsePosArray[idx] = aiBase.x;
      this.aiSynapsePosArray[idx + 1] = aiBase.y;
      this.aiSynapsePosArray[idx + 2] = aiBase.z;

      this.aiSynapsePosArray[idx + 3] = sat.position.x;
      this.aiSynapsePosArray[idx + 4] = sat.position.y;
      this.aiSynapsePosArray[idx + 5] = sat.position.z;
    });
    this.aiSynapseLines.geometry.attributes.position.needsUpdate = true;
    (this.aiSynapseLines.material as THREE.LineBasicMaterial).opacity = isAiFocused ? 0.85 : 0.4;

    // 5. DATA Stream & Micro Columns Animation (Boosts if DATA is active/hovered)
    const isDataFocused = activeDiscipline === "data" || hoveredDiscipline === "data";
    const dataNode = this.disciplineNodes[1];
    const dataSpeed = isDataFocused ? 0.7 : 0.35;

    this.dataColumns.forEach((col, i) => {
      const heightAmp = isDataFocused ? 0.28 : 0.18;
      const colHeight = 0.2 + Math.sin(elapsed * (isDataFocused ? 5.0 : 3.5) + i * 1.4) * heightAmp + heightAmp;
      col.scale.set(isDataFocused ? 1.2 : 1, Math.max(0.2, colHeight), isDataFocused ? 1.2 : 1);
      col.position.z = dataNode.mesh.position.z + (i % 2 === 0 ? 0.05 : -0.05);
    });

    // Flowing Data Particles
    for (let i = 0; i < this.dataParticleCount; i++) {
      let t = (this.dataParticleOffsets[i] + elapsed * dataSpeed) % 1.0;
      const startX = dataNode.basePos.x;
      const startY = dataNode.basePos.y;
      const startZ = dataNode.mesh.position.z;

      const endX = 0;
      const endY = 0;
      const endZ = 0;

      const arcY = Math.sin(t * Math.PI) * (isDataFocused ? 0.45 : 0.3);
      const arcZ = Math.sin(t * Math.PI) * 0.2;

      this.dataParticlePos[i * 3] = startX + (endX - startX) * t;
      this.dataParticlePos[i * 3 + 1] = startY + (endY - startY) * t + arcY;
      this.dataParticlePos[i * 3 + 2] = startZ + (endZ - startZ) * t + arcZ;
    }
    this.dataParticles.geometry.attributes.position.needsUpdate = true;
    (this.dataParticles.material as THREE.PointsMaterial).size = isDataFocused ? 0.09 : 0.07;

    // 6. IoT Telemetry Beacon Pulse Animation (Boosts if IoT is active/hovered)
    const isIotFocused = activeDiscipline === "iot" || hoveredDiscipline === "iot";
    const iotNode = this.disciplineNodes[3];
    const iotPulseSpeed = isIotFocused ? 1.0 : 0.6;

    this.iotBeaconRings.forEach((bRing, i) => {
      const phase = (elapsed * iotPulseSpeed + i * 0.5) % 1.0;
      const scale = 0.4 + phase * (isIotFocused ? 2.8 : 2.2);
      bRing.scale.set(scale, scale, 1);
      bRing.position.set(iotNode.basePos.x, iotNode.basePos.y, iotNode.mesh.position.z);
      (bRing.material as THREE.MeshBasicMaterial).opacity = Math.max(0, (1 - phase) * (isIotFocused ? 0.85 : 0.55));
      bRing.lookAt(camera.position);
    });

    this.iotSensors.forEach((s, i) => {
      s.rotation.y = elapsed * (isIotFocused ? 0.8 : 0.4) + i;
      s.rotation.x = elapsed * 0.3;
      s.position.z = iotNode.mesh.position.z + (i === 2 ? 0.15 : -0.1);
    });

    // 7. SOFTWARE Architectural Grid Animation (Boosts if SOFTWARE is active/hovered)
    const isSoftFocused = activeDiscipline === "software" || hoveredDiscipline === "software";
    const softNode = this.disciplineNodes[2];

    this.softwareGridMesh.position.set(softNode.basePos.x, softNode.basePos.y, softNode.mesh.position.z);
    this.softwareGridMesh.rotation.x = elapsed * (isSoftFocused ? 0.3 : 0.15);
    this.softwareGridMesh.rotation.y = elapsed * (isSoftFocused ? 0.35 : 0.2);
    const gridScale = isSoftFocused ? 1.25 : 1.0;
    this.softwareGridMesh.scale.set(gridScale, gridScale, gridScale);

    this.softwarePlanes.forEach((p, i) => {
      p.position.set(softNode.basePos.x, softNode.basePos.y, softNode.mesh.position.z + (i === 0 ? 0.12 : -0.12));
      p.rotation.z = elapsed * (isSoftFocused ? 0.25 : 0.1) * (i === 0 ? 1 : -1);
    });
  }

  public dispose() {
    this.disposableGeometries.forEach((g) => g.dispose());
    this.disposableMaterials.forEach((m) => m.dispose());
  }
}
