"use client";

import React from "react";
import { Cpu, Database, Radio, Globe, Zap, ChevronRight, Activity, Sparkles, Network } from "lucide-react";
import { use3DWorld, DisciplineType } from "@/context/ThreeDContext";

export default function EngineeringDNA() {
  const { activeDiscipline, setActiveDiscipline, hoveredDiscipline, setHoveredDiscipline } = use3DWorld();

  const currentKey = (activeDiscipline as "ai" | "data" | "iot" | "software") || "ai";

  const pillars = {
    ai: {
      id: "ai",
      title: "Artificial Intelligence & LLMs",
      subtitle: "Diagnostic Workflows & Reasoning Engines",
      icon: Cpu,
      color: "blue",
      badge: "GPT-5.5 API • Vision • Triage",
      statusLabel: "AI_CORE // NEURAL DIAGNOSTICS & REASONING",
      description:
        "Building practical AI systems that move beyond generic chat interfaces. Tharun focuses on integrating LLM reasoning pipelines into industrial triage, automating complex equipment troubleshooting, and processing vision inspection data.",
      keyProjects: [
        {
          name: "Industrial Machine Diagnostic System (CAT)",
          role: "End-to-End LLM Diagnostic Engine",
          details: "Integrated OpenAI GPT-5.5 API to translate machine telemetry anomalies into structured maintenance protocols and PDF dispatch sheets.",
        },
      ],
      technologies: ["OpenAI API (GPT-5.5)", "FastAPI", "Prompt Architecture", "Predictive Diagnostics", "Automated PDF Generation"],
      systemFlow: "Raw Telemetry & Inspection → Anomaly Parser → OpenAI GPT-5.5 Reasoning Pipeline → Maintenance Recommendation Engine",
    },
    data: {
      id: "data",
      title: "Data Analytics & Predictive Systems",
      subtitle: "Forecasting, Anomaly Detection & Dashboards",
      icon: Database,
      color: "sky",
      badge: "Power BI • Tableau • SQL Pipelines",
      statusLabel: "DATA_CORE // PREDICTIVE ANALYTICS & TIME-SERIES",
      description:
        "Transforming massive streams of operational logs and electrical telemetry into predictive insights, business intelligence dashboards, and optimized resource allocation.",
      keyProjects: [
        {
          name: "Enervision – AI Energy Audit System",
          role: "Predictive Load & Anomaly Detection",
          details: "Trained predictive consumption models and engineered interactive dashboards, identifying 20–25% potential energy savings.",
        },
        {
          name: "Thiruvusoft ERP Data Engineering",
          role: "SQL Pipeline Optimization",
          details: "Streamlined SQL pipelines across Finance, HR, and Inventory, accelerating data processing by 15–20%.",
        },
      ],
      technologies: ["PostgreSQL", "Power BI", "Tableau", "Excel (Microsoft 365)", "SQLAlchemy", "Predictive Time-Series"],
      systemFlow: "Time-Series Logs → SQL Pipeline Aggregation → Anomaly Detection Filters → Interactive Power BI / Tableau Dashboards",
    },
    iot: {
      id: "iot",
      title: "Internet of Things & Telemetry",
      subtitle: "Multi-Parameter Hardware Sensing & Real-Time Monitoring",
      icon: Radio,
      color: "cyan",
      badge: "Sensors • Microcontrollers • Environmental Monitoring",
      statusLabel: "IOT_BEACON // EMBEDDED SENSING & TELEMETRY",
      description:
        "Connecting physical world phenomena directly to web services. Designing sensor rigs that log multi-parameter environmental data, handle analog-to-digital conversions, and trigger automated threshold alerts.",
      keyProjects: [
        {
          name: "Water Quality Monitoring System (WQT)",
          role: "Continuous Environmental Rig",
          details: "Calibrated pH, TDS, turbidity, and temperature probes with Python telemetry ingestion and automated alert thresholds.",
        },
        {
          name: "Enervision Hardware Telemetry",
          role: "Sub-metering Sensor Array",
          details: "Captured power surges and phantom consumption in commercial grids for the predictive audit engine.",
        },
      ],
      technologies: ["IoT Microcontrollers", "pH Sensors", "TDS Probes", "Turbidity Probes", "Temperature Transducers", "Python Telemetry"],
      systemFlow: "Analog Sensor Probes → Microcontroller ADC → Real-time Ingestion Stream → Threshold Validation → Cloud Logging",
    },
    software: {
      id: "software",
      title: "Software Engineering & Full-Stack",
      subtitle: "Reliable Web Applications & Microservices",
      icon: Globe,
      color: "indigo",
      badge: "FastAPI • Next.js • PostgreSQL • JWT",
      statusLabel: "SOFTWARE_LATTICE // DISTRIBUTED SYSTEMS & APIS",
      description:
        "Architecting clean, modular software systems that prioritize reliability, security, fast load times, and intuitive user experiences.",
      keyProjects: [
        {
          name: "Client Website Portfolio @ Dyzen",
          role: "4+ Production Client Platforms",
          details: "Delivered responsive web applications with SEO schema and accessible UI, reducing bounce rates by 25–30%.",
        },
        {
          name: "Technoverse Event Application",
          role: "Symposium Portal",
          details: "Engineered responsive schedule and navigation web app for inter-college technical symposium.",
        },
      ],
      technologies: ["Next.js", "Python FastAPI", "PostgreSQL", "JWT Authentication", "WordPress", "Figma", "Vercel / Render"],
      systemFlow: "Next.js UI / Framer → FastAPI REST Gateway → JWT RBAC Security → SQLAlchemy ORM → PostgreSQL Database",
    },
  };

  const current = pillars[currentKey];

  const handleSelect = (key: DisciplineType) => {
    setActiveDiscipline(key);
  };

  return (
    <section id="engineering" className="py-24 bg-slate-50 relative border-t border-slate-200/80 bg-tech-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 border border-blue-200 text-blue-700 text-xs font-mono-tech uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>02 // ARCHITECTURAL PILLARS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Engineering DNA
          </h2>
          <p className="text-slate-600 text-base leading-relaxed mb-4">
            The core four technical disciplines that form Tharun’s engineering foundation. These are not isolated skills—they form one interconnected ecosystem.
          </p>

          {/* 3D Synchronization Status Chip */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-blue-200/80 shadow-xs text-xs font-mono-tech text-blue-700">
            <Network className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
            <span className="font-semibold">3D STAGE SYNCHRONIZED:</span>
            <span className="text-slate-700 font-bold uppercase">{currentKey} NODE FOCUSED</span>
            <span className="text-slate-400">•</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider">CLICK OR HOVER TABS TO EXPLORE</span>
          </div>
        </div>

        {/* 4 Interactive Discipline Selector Tabs */}
        <div 
          className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-10"
          role="tablist"
          aria-label="Engineering Disciplines"
        >
          {(["ai", "data", "iot", "software"] as const).map((key) => {
            const item = pillars[key];
            const Icon = item.icon;
            const isSelected = currentKey === key;
            const isHovered = hoveredDiscipline === key;

            return (
              <button
                key={key}
                role="tab"
                aria-selected={isSelected}
                aria-controls={`dna-panel-${key}`}
                id={`dna-tab-${key}`}
                tabIndex={0}
                onClick={() => handleSelect(key)}
                onMouseEnter={() => setHoveredDiscipline(key)}
                onMouseLeave={() => setHoveredDiscipline(null)}
                onFocus={() => setHoveredDiscipline(key)}
                onBlur={() => setHoveredDiscipline(null)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelect(key);
                  }
                }}
                className={`relative flex flex-col items-center text-center p-4 rounded-xl transition-all duration-200 border cursor-pointer group ${
                  isSelected
                    ? "bg-white border-blue-600 shadow-md ring-2 ring-blue-600/15 -translate-y-1"
                    : isHovered
                    ? "bg-white border-blue-300 shadow-sm -translate-y-0.5"
                    : "bg-white/70 border-slate-200 hover:bg-white hover:border-slate-300 text-slate-600"
                }`}
              >
                {/* Visual active indicator bar */}
                {isSelected && (
                  <div className="absolute top-0 inset-x-4 h-0.5 bg-blue-600 rounded-full" />
                )}

                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2.5 transition-colors ${
                  isSelected ? "bg-blue-600 text-white shadow-xs" : isHovered ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-sm font-bold uppercase tracking-wider ${isSelected ? "text-slate-900" : "text-slate-600"}`}>
                  {key.toUpperCase()}
                </span>
                <span className="text-[11px] text-slate-500 font-mono-tech mt-0.5 truncate w-full">
                  {item.badge.split("•")[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Detailed Display Panel */}
        <div 
          id={`dna-panel-${currentKey}`}
          role="tabpanel"
          aria-labelledby={`dna-tab-${currentKey}`}
          className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-6 sm:p-10 tech-border-bracket relative overflow-hidden"
        >
          {/* Subtle electric blue ambient aura for selected discipline */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            
            {/* Left Column: Description, System Flow, and Verified Technologies */}
            <div className="lg:col-span-7 flex flex-col">
              
              <div className="flex flex-wrap items-center gap-2.5 mb-2">
                <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-mono-tech font-semibold uppercase">
                  {current.badge}
                </span>
                <span className="text-xs font-mono-tech text-slate-400">
                  PILLAR // 0{["ai", "data", "iot", "software"].indexOf(currentKey) + 1}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-[10px] font-mono-tech text-blue-600 font-medium">
                  {current.statusLabel}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
                {current.title}
              </h3>
              <p className="text-sm font-medium text-blue-600 mb-4 font-mono-tech">
                {current.subtitle}
              </p>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                {current.description}
              </p>

              {/* Technical System Dataflow Pipeline */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-6">
                <div className="text-[11px] font-mono-tech uppercase text-slate-500 font-semibold mb-2 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-blue-600" />
                  <span>Verified Pipeline Architecture</span>
                </div>
                <div className="text-xs font-mono-tech text-slate-800 bg-white p-3 rounded-lg border border-slate-200/70 overflow-x-auto leading-relaxed select-text">
                  {current.systemFlow}
                </div>
              </div>

              {/* Verified Technologies Badges */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-mono-tech text-slate-400 uppercase tracking-wider">
                  VERIFIED TECH STACK:
                </span>
                <div className="flex flex-wrap gap-2">
                  {current.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-medium rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 text-slate-800 border border-slate-200 transition-colors select-text cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Connected Verified Projects Showcase */}
            <div className="lg:col-span-5 bg-slate-50/90 rounded-xl p-6 border border-slate-200">
              <div className="text-xs font-mono-tech uppercase text-slate-500 font-semibold mb-4 flex items-center justify-between">
                <span>CONNECTED PROJECTS</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>

              <div className="space-y-4">
                {current.keyProjects.map((p, idx) => (
                  <div 
                    key={idx} 
                    className="p-4 rounded-lg bg-white border border-slate-200/80 shadow-2xs hover:border-blue-300 transition-colors"
                  >
                    <div className="text-sm font-bold text-slate-900 mb-0.5">
                      {p.name}
                    </div>
                    <div className="text-xs font-mono-tech text-blue-600 font-medium mb-2">
                      {p.role}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed select-text">
                      {p.details}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <span>Explore in Projects Section</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

          </div>
        </div>

        {/* Narrative Connection Banner */}
        <div className="mt-8 text-center text-[10px] font-mono-tech text-slate-400 uppercase tracking-widest">
          EXPERIMENTATION <span className="text-blue-500">→</span> ENGINEERING // 4 DISCIPLINE ARCHITECTURAL ECOSYSTEM
        </div>

      </div>
    </section>
  );
}
