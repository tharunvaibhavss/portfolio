import * as THREE from "three";

export class Projects3DSystem {
  public group: THREE.Group;

  // Project Architectural Sub-Groups
  private catGroup: THREE.Group;
  private enervisionGroup: THREE.Group;
  private wqtGroup: THREE.Group;
  private technoverseGroup: THREE.Group;
  private websitesGroup: THREE.Group;

  // Base Assembly Platform & Core
  private platformRing!: THREE.Mesh;
  private assemblyCore!: THREE.Mesh;

  // Project 1: CAT Sub-elements
  private catRotor!: THREE.Mesh;
  private catAiCore!: THREE.Mesh;
  private catAiRing!: THREE.Mesh;
  private catDocument!: THREE.Mesh;
  private catParticles!: THREE.Points;
  private catParticlePos!: Float32Array;

  // Project 2: Enervision Sub-elements
  private enerColumns: THREE.Mesh[] = [];
  private enerBeaconRings: THREE.Mesh[] = [];
  private enerParticles!: THREE.Points;
  private enerParticlePos!: Float32Array;

  // Project 3: WQT Sub-elements
  private wqtVessel!: THREE.Mesh;
  private wqtProbes: THREE.Mesh[] = [];
  private wqtParticles!: THREE.Points;
  private wqtParticlePos!: Float32Array;

  // Project 4: Technoverse Sub-elements
  private techViewport!: THREE.Mesh;
  private techCards: THREE.Mesh[] = [];
  private techConduits: THREE.Line[] = [];

  // Project 5: Websites Portfolio Sub-elements
  private webFrames: THREE.Mesh[] = [];
  private webSeoTag!: THREE.Mesh;

  // State Management
  private currentProjectSlug = "cat-industrial-diagnostic-system";
  private targetProjectSlug = "cat-industrial-diagnostic-system";
  private transitionProgress = 1.0; // 0 to 1
  private isTransitioning = false;
  private isMobile = false;
  private prefersReducedMotion = false;

  // Vectors for GC-free calculations
  private tempVec = new THREE.Vector3();
  private nodeWorldVec = new THREE.Vector3();

  // Resource Tracking for Disposal
  private disposableGeometries: THREE.BufferGeometry[] = [];
  private disposableMaterials: THREE.Material[] = [];

  constructor(isMobile = false, prefersReducedMotion = false) {
    this.isMobile = isMobile;
    this.prefersReducedMotion = prefersReducedMotion;
    this.group = new THREE.Group();
    this.group.name = "Projects3DSystem";

    // 0. Base Assembly Platform & Core
    const ringGeo = new THREE.RingGeometry(2.35, 2.38, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x0066ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    this.platformRing = new THREE.Mesh(ringGeo, ringMat);
    this.platformRing.rotation.x = Math.PI / 2.3;
    this.group.add(this.platformRing);
    this.disposableGeometries.push(ringGeo);
    this.disposableMaterials.push(ringMat);

    const coreGeo = new THREE.OctahedronGeometry(0.25, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0066ff,
      emissive: 0x0044cc,
      emissiveIntensity: 0.7,
      roughness: 0.2,
      metalness: 0.8,
    });
    this.assemblyCore = new THREE.Mesh(coreGeo, coreMat);
    this.assemblyCore.position.set(0, 0, -0.2);
    this.group.add(this.assemblyCore);
    this.disposableGeometries.push(coreGeo);
    this.disposableMaterials.push(coreMat);

    // 1. Build Project 1: AI-Powered Industrial Machine Diagnostic System (CAT)
    this.catGroup = this.buildCatArchitecture();
    this.group.add(this.catGroup);

    // 2. Build Project 2: Enervision – AI Energy Audit System
    this.enervisionGroup = this.buildEnervisionArchitecture();
    this.group.add(this.enervisionGroup);

    // 3. Build Project 3: Water Quality Monitoring System (WQT)
    this.wqtGroup = this.buildWqtArchitecture();
    this.group.add(this.wqtGroup);

    // 4. Build Project 4: Intra-College Event Web Application (Technoverse)
    this.technoverseGroup = this.buildTechnoverseArchitecture();
    this.group.add(this.technoverseGroup);

    // 5. Build Project 5: Client Website Projects Portfolio (Dyzen)
    this.websitesGroup = this.buildWebsitesArchitecture();
    this.group.add(this.websitesGroup);

    // Initial visibility state: CAT active
    this.applyVisibility(this.currentProjectSlug);
  }

  // --- BUILD PROJECT 1: CAT (IoT + DATA + AI + SOFTWARE) ---
  private buildCatArchitecture(): THREE.Group {
    const g = new THREE.Group();
    g.name = "Project_CAT";

    // Industrial Machine Housing / Base Frame
    const machineGeo = new THREE.BoxGeometry(1.1, 0.75, 0.4);
    const machineMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.85,
      roughness: 0.3,
      emissive: 0x091e42,
      emissiveIntensity: 0.3,
    });
    const machine = new THREE.Mesh(machineGeo, machineMat);
    machine.position.set(-1.1, 0, 0);
    g.add(machine);
    this.disposableGeometries.push(machineGeo);
    this.disposableMaterials.push(machineMat);

    // Rotating Turbine Rotor / Mechanical Component
    const rotorGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.08, 24);
    const rotorMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x0284c7,
      emissiveIntensity: 0.5,
    });
    this.catRotor = new THREE.Mesh(rotorGeo, rotorMat);
    this.catRotor.rotation.x = Math.PI / 2;
    this.catRotor.position.set(-1.1, 0, 0.22);
    g.add(this.catRotor);
    this.disposableGeometries.push(rotorGeo);
    this.disposableMaterials.push(rotorMat);

    // 3 Telemetry Sensor Nodes (vibration, thermal, pressure)
    const sensorGeo = new THREE.SphereGeometry(0.06, 12, 12);
    const sensorMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff });
    this.disposableGeometries.push(sensorGeo);
    this.disposableMaterials.push(sensorMat);

    const sensorOffsets = [
      new THREE.Vector3(-0.8, 0.3, 0.22),
      new THREE.Vector3(-1.4, 0.25, 0.22),
      new THREE.Vector3(-1.1, -0.32, 0.22),
    ];
    sensorOffsets.forEach((pos) => {
      const s = new THREE.Mesh(sensorGeo, sensorMat);
      s.position.copy(pos);
      g.add(s);
    });

    // Central AI Diagnostic Core (OpenAI GPT-5.5 Reasoning Pipeline)
    const aiGeo = new THREE.IcosahedronGeometry(0.35, 1);
    const aiMat = new THREE.MeshStandardMaterial({
      color: 0x0066ff,
      emissive: 0x0055ff,
      emissiveIntensity: 0.8,
      roughness: 0.15,
      metalness: 0.85,
    });
    this.catAiCore = new THREE.Mesh(aiGeo, aiMat);
    this.catAiCore.position.set(0.1, 0.1, 0.1);
    g.add(this.catAiCore);
    this.disposableGeometries.push(aiGeo);
    this.disposableMaterials.push(aiMat);

    // Orbiting Neural Synapse Ring
    const aiRingGeo = new THREE.RingGeometry(0.5, 0.53, 32);
    const aiRingMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
    });
    this.catAiRing = new THREE.Mesh(aiRingGeo, aiRingMat);
    this.catAiRing.position.copy(this.catAiCore.position);
    g.add(this.catAiRing);
    this.disposableGeometries.push(aiRingGeo);
    this.disposableMaterials.push(aiRingMat);

    // Work Order / Incident PDF Document Output
    const docGeo = new THREE.BoxGeometry(0.42, 0.58, 0.03);
    const docMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      emissive: 0x0066ff,
      emissiveIntensity: 0.25,
      roughness: 0.2,
      metalness: 0.7,
    });
    this.catDocument = new THREE.Mesh(docGeo, docMat);
    this.catDocument.position.set(1.3, -0.1, 0.1);
    this.catDocument.rotation.z = -0.12;
    g.add(this.catDocument);
    this.disposableGeometries.push(docGeo);
    this.disposableMaterials.push(docMat);

    // Conduits linking: Machine -> AI Core -> PDF Report
    const conduitPts1 = [new THREE.Vector3(-0.6, 0, 0.1), new THREE.Vector3(0.1, 0.1, 0.1)];
    const cGeo1 = new THREE.BufferGeometry().setFromPoints(conduitPts1);
    const cMat1 = new THREE.LineBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.5 });
    const cLine1 = new THREE.Line(cGeo1, cMat1);
    g.add(cLine1);
    this.disposableGeometries.push(cGeo1);
    this.disposableMaterials.push(cMat1);

    const conduitPts2 = [new THREE.Vector3(0.1, 0.1, 0.1), new THREE.Vector3(1.1, -0.1, 0.1)];
    const cGeo2 = new THREE.BufferGeometry().setFromPoints(conduitPts2);
    const cMat2 = new THREE.LineBasicMaterial({ color: 0x0066ff, transparent: true, opacity: 0.5 });
    const cLine2 = new THREE.Line(cGeo2, cMat2);
    g.add(cLine2);
    this.disposableGeometries.push(cGeo2);
    this.disposableMaterials.push(cMat2);

    // Telemetry stream particles (from Machine to AI)
    const pCount = this.isMobile ? 8 : 16;
    this.catParticlePos = new Float32Array(pCount * 3);
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(this.catParticlePos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x00d4ff,
      size: 0.08,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    this.catParticles = new THREE.Points(pGeo, pMat);
    g.add(this.catParticles);
    this.disposableGeometries.push(pGeo);
    this.disposableMaterials.push(pMat);

    return g;
  }

  // --- BUILD PROJECT 2: ENERVISION (IoT + DATA + ANALYTICS) ---
  private buildEnervisionArchitecture(): THREE.Group {
    const g = new THREE.Group();
    g.name = "Project_Enervision";

    // 3 Facility Grid Building Blocks
    const bHeights = [0.9, 1.3, 0.7];
    const bOffsets = [-1.2, -0.6, -1.6];

    bHeights.forEach((h, i) => {
      const bGeo = new THREE.BoxGeometry(0.32, h, 0.32);
      const bMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        emissive: 0x0284c7,
        emissiveIntensity: 0.2,
        roughness: 0.3,
        metalness: 0.8,
      });
      const bMesh = new THREE.Mesh(bGeo, bMat);
      bMesh.position.set(bOffsets[i], (h - 1.2) * 0.5, -0.1);
      g.add(bMesh);
      this.disposableGeometries.push(bGeo);
      this.disposableMaterials.push(bMat);
    });

    // Central Power Substation / Ingestion Hub
    const hubGeo = new THREE.CylinderGeometry(0.28, 0.32, 0.25, 16);
    const hubMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x0ea5e9,
      emissiveIntensity: 0.7,
      roughness: 0.2,
      metalness: 0.85,
    });
    const hub = new THREE.Mesh(hubGeo, hubMat);
    hub.position.set(0, 0, 0.1);
    g.add(hub);
    this.disposableGeometries.push(hubGeo);
    this.disposableMaterials.push(hubMat);

    // 5 Predictive Time-Series Forecasting Load Columns
    const colColors = [0x0284c7, 0x0ea5e9, 0x38bdf8, 0x06b6d4, 0x0066ff];
    this.enerColumns = [];
    for (let i = 0; i < 5; i++) {
      const colGeo = new THREE.BoxGeometry(0.09, 0.5, 0.09);
      const colMat = new THREE.MeshStandardMaterial({
        color: colColors[i],
        emissive: colColors[i],
        emissiveIntensity: 0.5,
        roughness: 0.2,
      });
      const col = new THREE.Mesh(colGeo, colMat);
      col.position.set(0.7 + i * 0.16, 0, 0.1);
      g.add(col);
      this.enerColumns.push(col);
      this.disposableGeometries.push(colGeo);
      this.disposableMaterials.push(colMat);
    }

    // Optimization Beacon Wave Rings
    this.enerBeaconRings = [];
    for (let i = 0; i < 2; i++) {
      const ringGeo = new THREE.RingGeometry(0.35, 0.38, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x00d4ff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(0, 0.25, 0.1);
      g.add(ring);
      this.enerBeaconRings.push(ring);
      this.disposableGeometries.push(ringGeo);
      this.disposableMaterials.push(ringMat);
    }

    // Energy Telemetry Streaming Particles
    const pCount = this.isMobile ? 8 : 16;
    this.enerParticlePos = new Float32Array(pCount * 3);
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(this.enerParticlePos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x0ea5e9,
      size: 0.08,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    this.enerParticles = new THREE.Points(pGeo, pMat);
    g.add(this.enerParticles);
    this.disposableGeometries.push(pGeo);
    this.disposableMaterials.push(pMat);

    return g;
  }

  // --- BUILD PROJECT 3: WATER QUALITY (IoT + DATA + SOFTWARE) ---
  private buildWqtArchitecture(): THREE.Group {
    const g = new THREE.Group();
    g.name = "Project_WQT";

    // Translucent Environmental Water Vessel Column
    const vesselGeo = new THREE.CylinderGeometry(0.65, 0.65, 1.4, 24, 1, true);
    const vesselMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x0891b2,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.4,
      roughness: 0.1,
      metalness: 0.7,
      side: THREE.DoubleSide,
    });
    this.wqtVessel = new THREE.Mesh(vesselGeo, vesselMat);
    this.wqtVessel.position.set(-0.8, 0, 0);
    g.add(this.wqtVessel);
    this.disposableGeometries.push(vesselGeo);
    this.disposableMaterials.push(vesselMat);

    // 3 Submerged Calibrated Sensor Probes (pH, TDS, Temperature)
    this.wqtProbes = [];
    const probeOffsets = [-1.0, -0.8, -0.6];
    const probeColors = [0x00d4ff, 0x38bdf8, 0x0284c7];

    probeOffsets.forEach((px, i) => {
      const pGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.7, 12);
      const pMat = new THREE.MeshStandardMaterial({
        color: probeColors[i],
        emissive: probeColors[i],
        emissiveIntensity: 0.6,
        roughness: 0.2,
      });
      const probe = new THREE.Mesh(pGeo, pMat);
      probe.position.set(px, 0.1, 0.1);
      g.add(probe);
      this.wqtProbes.push(probe);
      this.disposableGeometries.push(pGeo);
      this.disposableMaterials.push(pMat);
    });

    // Microcontroller ADC Node (Python Telemetry Logger)
    const mcuGeo = new THREE.BoxGeometry(0.5, 0.38, 0.1);
    const mcuMat = new THREE.MeshStandardMaterial({
      color: 0x091e42,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.9,
    });
    const mcu = new THREE.Mesh(mcuGeo, mcuMat);
    mcu.position.set(0.6, 0.1, 0.1);
    g.add(mcu);
    this.disposableGeometries.push(mcuGeo);
    this.disposableMaterials.push(mcuMat);

    // Telemetry particles (rising from water vessel into microcontroller)
    const pCount = this.isMobile ? 8 : 16;
    this.wqtParticlePos = new Float32Array(pCount * 3);
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(this.wqtParticlePos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x00d4ff,
      size: 0.08,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    this.wqtParticles = new THREE.Points(pGeo, pMat);
    g.add(this.wqtParticles);
    this.disposableGeometries.push(pGeo);
    this.disposableMaterials.push(pMat);

    return g;
  }

  // --- BUILD PROJECT 4: TECHNOVERSE (SOFTWARE + DATA) ---
  private buildTechnoverseArchitecture(): THREE.Group {
    const g = new THREE.Group();
    g.name = "Project_Technoverse";

    // Central Responsive Viewport Surface
    const viewGeo = new THREE.BoxGeometry(1.6, 1.05, 0.05);
    const viewMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      emissive: 0x0066ff,
      emissiveIntensity: 0.25,
      roughness: 0.2,
      metalness: 0.8,
    });
    this.techViewport = new THREE.Mesh(viewGeo, viewMat);
    this.techViewport.position.set(-0.3, 0, 0);
    g.add(this.techViewport);
    this.disposableGeometries.push(viewGeo);
    this.disposableMaterials.push(viewMat);

    // 3 Modular Event Card Modules (Live Schedule, Rulebook, Registration)
    this.techCards = [];
    const cardOffsets = [
      new THREE.Vector3(0.9, 0.35, 0.15),
      new THREE.Vector3(0.9, -0.25, 0.15),
      new THREE.Vector3(-0.3, -0.65, 0.15),
    ];

    cardOffsets.forEach((pos) => {
      const cGeo = new THREE.BoxGeometry(0.55, 0.28, 0.04);
      const cMat = new THREE.MeshStandardMaterial({
        color: 0x0066ff,
        emissive: 0x2563eb,
        emissiveIntensity: 0.6,
        roughness: 0.2,
      });
      const card = new THREE.Mesh(cGeo, cMat);
      card.position.copy(pos);
      g.add(card);
      this.techCards.push(card);
      this.disposableGeometries.push(cGeo);
      this.disposableMaterials.push(cMat);
    });

    return g;
  }

  // --- BUILD PROJECT 5: CLIENT WEBSITES (SOFTWARE + WEB ARCHITECTURE) ---
  private buildWebsitesArchitecture(): THREE.Group {
    const g = new THREE.Group();
    g.name = "Project_Websites";

    // 3 Tiered Viewport Frames (Desktop, Tablet, Mobile in isometric depth)
    this.webFrames = [];
    const frameConfigs = [
      { w: 1.3, h: 0.85, z: 0, x: -0.4, y: 0.1 },
      { w: 0.7, h: 0.95, z: 0.2, x: 0.6, y: -0.05 },
      { w: 0.4, h: 0.75, z: 0.4, x: 1.15, y: -0.2 },
    ];

    frameConfigs.forEach((cfg) => {
      const fGeo = new THREE.BoxGeometry(cfg.w, cfg.h, 0.04);
      const fMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0x0066ff,
        emissiveIntensity: 0.3,
        roughness: 0.2,
        metalness: 0.85,
      });
      const frame = new THREE.Mesh(fGeo, fMat);
      frame.position.set(cfg.x, cfg.y, cfg.z);
      g.add(frame);
      this.webFrames.push(frame);
      this.disposableGeometries.push(fGeo);
      this.disposableMaterials.push(fMat);
    });

    // Floating SEO & Analytics Node Tag
    const tagGeo = new THREE.BoxGeometry(0.45, 0.18, 0.05);
    const tagMat = new THREE.MeshStandardMaterial({
      color: 0x0066ff,
      emissive: 0x0055ff,
      emissiveIntensity: 0.8,
      roughness: 0.2,
    });
    this.webSeoTag = new THREE.Mesh(tagGeo, tagMat);
    this.webSeoTag.position.set(-0.4, -0.55, 0.15);
    g.add(this.webSeoTag);
    this.disposableGeometries.push(tagGeo);
    this.disposableMaterials.push(tagMat);

    return g;
  }

  // --- PROJECT SWITCHING & VISIBILITY CONTROL ---
  public setProject(slug: string) {
    if (this.targetProjectSlug === slug) return;
    this.targetProjectSlug = slug;
    this.isTransitioning = true;
    this.transitionProgress = 0;
  }

  private applyVisibility(slug: string) {
    this.catGroup.visible = slug === "cat-industrial-diagnostic-system";
    this.enervisionGroup.visible = slug === "enervision-ai-energy-audit";
    this.wqtGroup.visible = slug === "water-quality-monitoring-system";
    this.technoverseGroup.visible = slug === "intra-college-event-web-app";
    this.websitesGroup.visible = slug === "client-website-projects";
  }

  public update(
    delta: number,
    elapsed: number,
    mouse: { x: number; y: number },
    activeSection: string,
    scrollProgress: number,
    camera: THREE.PerspectiveCamera,
    activeProjectSlug?: string | null,
    hoveredProjectSlug?: string | null
  ) {
    const isProjectsActive = activeSection === "projects";
    this.group.visible = isProjectsActive;
    if (!isProjectsActive) return;

    // Handle project transitions
    if (activeProjectSlug && activeProjectSlug !== this.targetProjectSlug) {
      this.setProject(activeProjectSlug);
    }

    if (this.isTransitioning) {
      this.transitionProgress += delta * 1.8; // ~550ms transition
      if (this.transitionProgress >= 1.0) {
        this.transitionProgress = 1.0;
        this.isTransitioning = false;
        this.currentProjectSlug = this.targetProjectSlug;
        this.applyVisibility(this.currentProjectSlug);
      } else if (this.transitionProgress >= 0.5 && this.currentProjectSlug !== this.targetProjectSlug) {
        this.currentProjectSlug = this.targetProjectSlug;
        this.applyVisibility(this.currentProjectSlug);
      }
    }

    // Compute transition scale & opacity curve
    const tScale = this.isTransitioning
      ? Math.sin(this.transitionProgress * Math.PI) * 0.2 + 0.8
      : 1.0;
    this.group.scale.set(tScale, tScale, tScale);

    // Assembly platform rotation
    if (!this.prefersReducedMotion) {
      this.platformRing.rotation.z = elapsed * 0.04;
      this.assemblyCore.rotation.y = elapsed * 0.3;
      this.assemblyCore.rotation.x = elapsed * 0.2;
    }

    // Active project animations
    if (this.catGroup.visible) {
      if (!this.prefersReducedMotion) {
        this.catRotor.rotation.z += delta * 3.5;
        this.catAiCore.rotation.y = elapsed * 0.4;
        this.catAiRing.rotation.z = elapsed * 0.6;
        this.catAiRing.lookAt(camera.position);

        // Telemetry particle flow
        const pCount = this.isMobile ? 8 : 16;
        for (let i = 0; i < pCount; i++) {
          const t = ((i / pCount) + elapsed * 0.5) % 1.0;
          this.catParticlePos[i * 3] = -1.1 + (0.1 - (-1.1)) * t;
          this.catParticlePos[i * 3 + 1] = 0.1 * Math.sin(t * Math.PI);
          this.catParticlePos[i * 3 + 2] = 0.2;
        }
        this.catParticles.geometry.attributes.position.needsUpdate = true;
      }
    } else if (this.enervisionGroup.visible) {
      if (!this.prefersReducedMotion) {
        this.enerColumns.forEach((col, i) => {
          const h = 0.3 + Math.sin(elapsed * 4 + i * 1.2) * 0.25;
          col.scale.set(1, Math.max(0.2, h), 1);
        });

        this.enerBeaconRings.forEach((r, i) => {
          const phase = (elapsed * 0.7 + i * 0.5) % 1.0;
          const s = 0.5 + phase * 2.2;
          r.scale.set(s, s, 1);
          (r.material as THREE.MeshBasicMaterial).opacity = Math.max(0, (1 - phase) * 0.6);
          r.lookAt(camera.position);
        });

        // Flow particles
        const pCount = this.isMobile ? 8 : 16;
        for (let i = 0; i < pCount; i++) {
          const t = ((i / pCount) + elapsed * 0.4) % 1.0;
          this.enerParticlePos[i * 3] = -1.0 + (0.7 - (-1.0)) * t;
          this.enerParticlePos[i * 3 + 1] = Math.sin(t * Math.PI) * 0.2;
          this.enerParticlePos[i * 3 + 2] = 0.15;
        }
        this.enerParticles.geometry.attributes.position.needsUpdate = true;
      }
    } else if (this.wqtGroup.visible) {
      if (!this.prefersReducedMotion) {
        this.wqtVessel.rotation.y = elapsed * 0.1;
        this.wqtProbes.forEach((p, i) => {
          p.position.y = 0.1 + Math.sin(elapsed * 2 + i) * 0.04;
        });

        const pCount = this.isMobile ? 8 : 16;
        for (let i = 0; i < pCount; i++) {
          const t = ((i / pCount) + elapsed * 0.45) % 1.0;
          this.wqtParticlePos[i * 3] = -0.8 + (0.6 - (-0.8)) * t;
          this.wqtParticlePos[i * 3 + 1] = -0.3 + 0.6 * t;
          this.wqtParticlePos[i * 3 + 2] = 0.15;
        }
        this.wqtParticles.geometry.attributes.position.needsUpdate = true;
      }
    } else if (this.technoverseGroup.visible) {
      if (!this.prefersReducedMotion) {
        this.techCards.forEach((c, i) => {
          c.position.z = 0.15 + Math.sin(elapsed * 2.5 + i) * 0.03;
        });
      }
    } else if (this.websitesGroup.visible) {
      if (!this.prefersReducedMotion) {
        this.webFrames.forEach((f, i) => {
          f.position.y += Math.sin(elapsed * 2 + i) * 0.001;
        });
        this.webSeoTag.rotation.z = Math.sin(elapsed * 1.5) * 0.05;
      }
    }

    // Pointer proximity & project hover reaction
    this.group.getWorldPosition(this.nodeWorldVec);
    this.tempVec.copy(this.nodeWorldVec).project(camera);
    const distToPointer = Math.hypot(mouse.x - this.tempVec.x, mouse.y - this.tempVec.y);
    const hoverBoost = hoveredProjectSlug ? 0.35 : 0;
    let pointerBoost = 0;
    if (distToPointer < 0.4) {
      pointerBoost = Math.max(0, (0.4 - distToPointer) / 0.4);
    }
    const totalBoost = Math.min(1.2, pointerBoost * 0.8 + hoverBoost);
    (this.assemblyCore.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.7 + totalBoost;
  }

  public dispose() {
    this.disposableGeometries.forEach((g) => g.dispose());
    this.disposableMaterials.forEach((m) => m.dispose());
  }
}
