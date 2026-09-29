"use client";

import React, { useState, useEffect } from "react";
import { Project } from "@/types/portfolio";
import {
  ExternalLink,
  Cpu,
  Database,
  Radio,
  Globe,
  Terminal,
  ChevronDown,
  ChevronUp,
  Layers,
  CheckCircle2,
  AlertCircle,
  Box,
  Activity,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { GithubIcon } from "./Icons";
import { use3DWorld } from "@/context/ThreeDContext";

interface ProjectsSectionProps {
  projects: Project[];
}

// Verified Architectural Disciplines & Flow definitions for each project
const PROJECT_ARCHITECTURES: Record<
  string,
  {
    disciplines: string[];
    disciplineTag: string;
    flowStages: { label: string; stage: string }[];
    coreOutcome: string;
  }
> = {
  "cat-industrial-diagnostic-system": {
    disciplines: ["IoT", "DATA", "AI", "SOFTWARE"],
    disciplineTag: "IoT + DATA + AI + SOFTWARE",
    flowStages: [
      { label: "MACHINE", stage: "Vibration & Thermal Core" },
      { label: "TELEMETRY", stage: "Multi-Sensor Stream" },
      { label: "INGESTION", stage: "FastAPI & PostgreSQL" },
      { label: "PREDICTIVE", stage: "Anomaly Thresholds" },
      { label: "AI ENGINE", stage: "OpenAI GPT-5.5 API" },
      { label: "DECISION", stage: "Automated Work Order & PDF" },
    ],
    coreOutcome: "Automated real-time diagnostic triage and structured maintenance report dispatch.",
  },
  "enervision-ai-energy-audit": {
    disciplines: ["IoT", "DATA", "ANALYTICS"],
    disciplineTag: "IoT + DATA + ANALYTICS",
    flowStages: [
      { label: "POWER GRID", stage: "Commercial Energy Nodes" },
      { label: "TELEMETRY", stage: "IoT Hardware Loggers" },
      { label: "AGGREGATION", stage: "Time-Series Ingestion" },
      { label: "FORECASTING", stage: "Predictive Load Models" },
      { label: "OPTIMIZATION", stage: "20–25% Energy Waste Alerts" },
    ],
    coreOutcome: "Demonstrated 20–25% potential electrical energy savings through anomaly alerts.",
  },
  "water-quality-monitoring-system": {
    disciplines: ["IoT", "DATA", "SOFTWARE"],
    disciplineTag: "IoT + DATA + SOFTWARE",
    flowStages: [
      { label: "WATER COLUMN", stage: "Submerged Sensing Chamber" },
      { label: "PROBES", stage: "pH, TDS, Turbidity & Temp" },
      { label: "TELEMETRY", stage: "MCU ADC Stream" },
      { label: "DATA LOG", stage: "Python Continuous Ingestion" },
      { label: "ANALYSIS", stage: "24/7 Quality Threshold Alerts" },
    ],
    coreOutcome: "Continuous 24/7 environmental telemetry logging with real-time threshold alert triggers.",
  },
  "intra-college-event-web-app": {
    disciplines: ["SOFTWARE", "DATA"],
    disciplineTag: "SOFTWARE + DATA",
    flowStages: [
      { label: "VIEWPORT", stage: "Responsive Interface Frame" },
      { label: "EVENT NODES", stage: "Schedule & Timetable Grid" },
      { label: "ROUTING", stage: "Rulebook & Registration" },
      { label: "USER FLOW", stage: "Campus-Wide Mobile Access" },
    ],
    coreOutcome: "Supported campus-wide symposium attendees with instant schedule access.",
  },
  "client-website-projects": {
    disciplines: ["SOFTWARE", "WEB"],
    disciplineTag: "SOFTWARE + WEB",
    flowStages: [
      { label: "ARCHITECTURE", stage: "Layered Viewport Frames" },
      { label: "UI MODULES", stage: "Modern CSS & Figma Specs" },
      { label: "SEO SCHEMA", stage: "Structured Meta Architecture" },
      { label: "DEPLOYMENT", stage: "Optimized High-Speed Delivery" },
    ],
    coreOutcome: "Directly contributed to a 25–30% reduction in user bounce rates across delivered platforms.",
  },
};

const TAB_LABELS: Record<string, string> = {
  "cat-industrial-diagnostic-system": "CAT Diagnostic",
  "enervision-ai-energy-audit": "EnerVision Audit",
  "water-quality-monitoring-system": "Water Quality IoT",
  "intra-college-event-web-app": "Technoverse App",
  "client-website-projects": "Client Solutions",
};

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const {
    activeProjectSlug,
    setActiveProjectSlug,
    hoveredProjectSlug,
    setHoveredProjectSlug,
    isMobile,
  } = use3DWorld();

  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [expandedProjectId, setExpandedProjectId] = useState<number | null>(1); // Default CAT expanded

  const categories = ["ALL", "AI", "DATA", "IoT", "SOFTWARE"];

  // Filter projects by category
  const filteredProjects = projects.filter((p) => {
    if (selectedCategory === "ALL") return true;
    return p.primary_category.toUpperCase() === selectedCategory;
  });

  // Ensure current active project is synchronized
  const activeProject =
    projects.find((p) => p.slug === activeProjectSlug) || projects[0] || null;
  const activeArchitecture =
    (activeProject && PROJECT_ARCHITECTURES[activeProject.slug]) ||
    PROJECT_ARCHITECTURES["cat-industrial-diagnostic-system"];

  // Synchronize expansion with active 3D project
  const handleSelectProject = (project: Project, shouldScroll = false) => {
    setActiveProjectSlug(project.slug);
    setExpandedProjectId(project.id);
    if (shouldScroll) {
      const el = document.getElementById(`project-${project.slug}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat.toUpperCase()) {
      case "AI":
        return <Cpu className="w-4 h-4 text-blue-600" />;
      case "DATA":
        return <Database className="w-4 h-4 text-sky-600" />;
      case "IoT":
        return <Radio className="w-4 h-4 text-cyan-600" />;
      default:
        return <Globe className="w-4 h-4 text-indigo-600" />;
    }
  };

  return (
    <section
      id="projects"
      className="py-24 bg-slate-50/70 backdrop-blur-[2px] relative border-t border-slate-200/80 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono-tech uppercase tracking-wider mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>03 // FEATURED ENGINEERING WORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Technical Project Portfolio
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Interactive 3D engineering case studies: problem definition, verified system
            architectures, and measurable engineering outcomes.
          </p>
        </div>

        {/* 3D Architectural HUD & Interactive Selector Bar */}
        <div className="mb-10 p-5 rounded-2xl bg-white/95 border border-slate-200/90 shadow-sm backdrop-blur-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
              </span>
              <span className="text-xs font-mono-tech uppercase tracking-wider font-bold text-slate-800">
                3D SYSTEM ARCHITECTURE // ACTIVE CASE STUDY
              </span>
              <span className="hidden sm:inline-block text-[11px] font-mono-tech text-blue-600 font-semibold px-2 py-0.5 rounded bg-blue-50 border border-blue-200">
                {activeArchitecture.disciplineTag}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono-tech text-slate-500">
              <span className="hidden sm:inline">CAD VIEWPORT:</span>
              <span className="px-2 py-0.5 rounded bg-slate-100 font-semibold text-slate-700">
                {activeProject ? activeProject.title : "CAT Industrial Diagnostic System"}
              </span>
            </div>
          </div>

          {/* Quick Project Switcher Tabs Grid */}
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 py-3"
            role="tablist"
            aria-label="3D Project Case Studies"
          >
            {projects.map((proj) => {
              const isSelected = activeProjectSlug === proj.slug;
              const isHovered = hoveredProjectSlug === proj.slug;
              const arch = PROJECT_ARCHITECTURES[proj.slug] || {
                disciplineTag: proj.primary_category,
              };

              return (
                <button
                  key={proj.id}
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`project-${proj.slug}`}
                  id={`tab-project-${proj.slug}`}
                  onClick={() => handleSelectProject(proj, true)}
                  onMouseEnter={() => {
                    setHoveredProjectSlug(proj.slug);
                  }}
                  onMouseLeave={() => {
                    setHoveredProjectSlug(null);
                  }}
                  className={`px-3 py-2.5 rounded-xl text-xs font-mono-tech font-semibold transition-all duration-200 border cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 ${
                    isSelected
                      ? "bg-slate-900 text-white border-slate-900 shadow-sm ring-2 ring-blue-500/20"
                      : isHovered
                      ? "bg-blue-50 text-blue-700 border-blue-300"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-1.5 truncate">
                    {getCategoryIcon(proj.primary_category)}
                    <span className="truncate">{TAB_LABELS[proj.slug] || proj.title}</span>
                  </div>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-mono-tech shrink-0 ${
                      isSelected ? "bg-blue-600 text-white" : "bg-slate-200/80 text-slate-600"
                    }`}
                  >
                    {arch.disciplineTag}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Project Pipeline Flow Ribbon */}
          {activeArchitecture && (
            <div className="mt-3 pt-3 border-t border-slate-100 hidden sm:flex items-center gap-2 overflow-x-auto text-[11px] font-mono-tech">
              <span className="text-slate-400 font-bold uppercase shrink-0">PIPELINE:</span>
              <div className="flex items-center gap-2 flex-nowrap shrink-0">
                {activeArchitecture.flowStages.map((stg, i) => (
                  <React.Fragment key={stg.label}>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
                      <span className="font-bold text-blue-600">{stg.label}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-600">{stg.stage}</span>
                    </div>
                    {i < activeArchitecture.flowStages.length - 1 && (
                      <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              id={`filter-project-${cat.toLowerCase()}`}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 border cursor-pointer ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Responsive Grid: Projects List + Sticky 3D Architectural HUD Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Authoritative Semantic HTML Projects (8 cols on lg) */}
          <div className="lg:col-span-8 space-y-6">
            {filteredProjects.map((project) => {
              const isExpanded = expandedProjectId === project.id;
              const isSelected = activeProjectSlug === project.slug;
              const isHovered = hoveredProjectSlug === project.slug;
              const arch = PROJECT_ARCHITECTURES[project.slug] || {
                disciplineTag: project.primary_category,
                disciplines: [project.primary_category],
                coreOutcome: project.solution,
              };

              return (
                <div
                  key={project.id}
                  id={`project-${project.slug}`}
                  tabIndex={0}
                  role="region"
                  aria-labelledby={`heading-project-${project.slug}`}
                  onClick={() => handleSelectProject(project)}
                  onMouseEnter={() => {
                    setHoveredProjectSlug(project.slug);
                  }}
                  onMouseLeave={() => {
                    setHoveredProjectSlug(null);
                  }}
                  onFocus={() => {
                    setHoveredProjectSlug(project.slug);
                  }}
                  onBlur={() => {
                    setHoveredProjectSlug(null);
                  }}
                  className={`rounded-2xl bg-white border transition-all duration-300 shadow-sm overflow-hidden tech-border-bracket cursor-pointer ${
                    isSelected
                      ? "border-blue-500 ring-2 ring-blue-500/20 shadow-md -translate-y-0.5"
                      : isHovered
                      ? "border-blue-300 shadow-sm"
                      : "border-slate-200/90 hover:border-slate-300"
                  }`}
                >
                  {/* Top Bar Header */}
                  <div className="p-6 sm:p-7 bg-slate-50/70 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white border border-slate-200 text-slate-800 text-xs font-mono-tech font-semibold">
                          {getCategoryIcon(project.primary_category)}
                          <span>{project.primary_category}</span>
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/80 text-[11px] font-mono-tech font-bold">
                          {arch.disciplineTag}
                        </span>
                        <span className="text-xs font-mono-tech text-slate-500">
                          {project.organization} • {project.year}
                        </span>
                        {isSelected && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-mono-tech font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                            3D ACTIVE
                          </span>
                        )}
                      </div>
                      <h3
                        id={`heading-project-${project.slug}`}
                        className="text-xl sm:text-2xl font-bold text-slate-900"
                      >
                        {project.title}
                      </h3>
                      {project.tagline && (
                        <p className="text-xs sm:text-sm font-medium text-blue-600 font-mono-tech">
                          {project.tagline}
                        </p>
                      )}
                    </div>

                    {/* Actions & Toggle */}
                    <div
                      className="flex items-center gap-2 shrink-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors shadow-2xs"
                          id={`btn-github-${project.slug}`}
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          <span>Code</span>
                        </a>
                      )}

                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-2xs"
                          id={`btn-live-${project.slug}`}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live</span>
                        </a>
                      )}

                      <button
                        onClick={() => handleSelectProject(project, false)}
                        className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono-tech font-semibold transition-colors shadow-2xs ${
                          isSelected
                            ? "bg-blue-600 text-white border border-blue-600"
                            : "bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700"
                        }`}
                        id={`btn-3d-${project.slug}`}
                        title="Load 3D Architectural Case Study"
                      >
                        <Box className="w-3.5 h-3.5" />
                        <span>{isSelected ? "3D Active" : "3D View"}</span>
                      </button>

                      <button
                        onClick={() => {
                          setExpandedProjectId(isExpanded ? null : project.id);
                          if (!isSelected) {
                            setActiveProjectSlug(project.slug);
                          }
                        }}
                        className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
                        aria-label="Toggle project details"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Primary Card Content */}
                  <div className="p-6 sm:p-7">
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Problem & Solution Storytelling Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                      <div className="p-4 rounded-xl bg-red-50/50 border border-red-100">
                        <div className="text-xs font-mono-tech uppercase font-bold text-red-600 mb-2 flex items-center gap-1.5">
                          <AlertCircle className="w-4 h-4" />
                          <span>Problem Statement</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {project.problem}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100">
                        <div className="text-xs font-mono-tech uppercase font-bold text-emerald-700 mb-2 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Engineered Solution</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {project.solution}
                        </p>
                      </div>
                    </div>

                    {/* Expanded Technical Details */}
                    {isExpanded && (
                      <div className="pt-6 border-t border-slate-100 animate-fadeIn space-y-5">
                        {/* Architectural Contribution */}
                        <div>
                          <div className="text-xs font-mono-tech uppercase font-bold text-slate-500 mb-2">
                            Core Architectural Contribution
                          </div>
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                            {project.contribution}
                          </p>
                        </div>

                        {/* Measurable Impact Metric (if supported) */}
                        {project.measurable_results && (
                          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 font-mono-tech">
                              Δ
                            </div>
                            <div>
                              <div className="text-[11px] font-mono-tech uppercase text-blue-700 font-semibold">
                                Verified Measurable Result
                              </div>
                              <div className="text-xs sm:text-sm font-semibold text-slate-900">
                                {project.measurable_results}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Project Verification Status */}
                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            <span>System architecture verified against repository codebase.</span>
                          </div>
                          <span className="font-mono-tech text-[10px] text-slate-400">
                            SYSTEM ARCHITECTURE // VERIFIED
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Technical Stack Tags */}
                    <div className="pt-5 border-t border-slate-100 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono-tech text-slate-400 uppercase mr-1">
                        STACK:
                      </span>
                      {project.technologies.map((tech) => (
                        <span
                          key={tech.id}
                          className="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-100 text-slate-700 border border-slate-200/80 font-mono-tech"
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky 3D Architectural HUD & CAD Viewport (4 cols on lg) */}
          <div className="hidden lg:block lg:col-span-4 sticky top-24 space-y-4">
            <div className="p-6 rounded-2xl bg-white/95 border border-slate-200/90 shadow-md backdrop-blur-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Box className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-mono-tech font-bold uppercase tracking-wider text-slate-900">
                    3D ARCHITECTURE CAD
                  </span>
                </div>
                <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  REAL-TIME 3D
                </span>
              </div>

              {/* Translucent Frame looking into the GlobalCanvas 3D System */}
              <div
                className="my-4 h-48 rounded-xl bg-slate-900/5 border border-blue-200/60 flex flex-col justify-between p-3 relative overflow-hidden"
              >
                <div className="flex items-center justify-between z-10">
                  <span className="text-[10px] font-mono-tech text-blue-600 bg-white/80 px-2 py-0.5 rounded backdrop-blur-xs font-semibold">
                    MODEL: {activeProject?.slug}
                  </span>
                  <span className="text-[10px] font-mono-tech text-slate-500 bg-white/80 px-1.5 py-0.5 rounded">
                    PROCEDURAL
                  </span>
                </div>

                <div className="text-center z-10 pointer-events-none">
                  <div className="text-xs font-mono-tech font-bold text-slate-800">
                    {activeProject?.title}
                  </div>
                  <div className="text-[11px] font-mono-tech text-blue-600 font-semibold mt-0.5">
                    {activeArchitecture.disciplineTag}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono-tech text-slate-500 z-10">
                  <span>DISCIPLINES: {activeArchitecture.disciplines.join(" • ")}</span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    SYNC
                  </span>
                </div>
              </div>

              {/* Architectural Discipline Breakdown */}
              <div className="space-y-3">
                <div className="text-[11px] font-mono-tech uppercase font-bold text-slate-500">
                  Engineering Outcome
                </div>
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">
                  {activeArchitecture.coreOutcome}
                </p>

                <div className="text-[11px] font-mono-tech uppercase font-bold text-slate-500 pt-2">
                  System Architecture Stages
                </div>
                <div className="space-y-1.5">
                  {activeArchitecture.flowStages.map((stg, i) => (
                    <div
                      key={stg.label}
                      className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-50/80 border border-slate-100"
                    >
                      <span className="font-mono-tech font-bold text-blue-600 text-[11px]">
                        0{i + 1} // {stg.label}
                      </span>
                      <span className="text-slate-600 text-xs truncate max-w-[150px]">
                        {stg.stage}
                      </span>
                    </div>
                  ))}
                </div>

                {/* 3D interaction hint */}
                <div className="pt-3 border-t border-slate-100 text-[11px] font-mono-tech text-slate-500 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>
                    Select or hover project cards to inspect interactive 3D architecture.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
