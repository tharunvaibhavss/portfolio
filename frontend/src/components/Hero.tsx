"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, FileDown, Sparkles, Cpu, Database, Radio, Globe, Activity, Layers } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { use3DWorld } from "@/context/ThreeDContext";
import { Profile, SocialLink } from "@/types/portfolio";

interface HeroProps {
  profile: Profile;
  socialLinks: SocialLink[];
  onDownloadResume: () => void;
}

export default function Hero({ profile, socialLinks, onDownloadResume }: HeroProps) {
  const { mouse, isMobile, prefersReducedMotion } = use3DWorld();

  const githubLink = socialLinks.find((s) => s.platform.toLowerCase() === "github")?.url || "https://github.com/tharunvaibhavss";
  const linkedinLink = socialLinks.find((s) => s.platform.toLowerCase() === "linkedin")?.url || "https://www.linkedin.com/in/tharun-vaibhav-s-s";

  // Calculate subtle 3D parallax tilt for portrait frame
  const tiltX = !isMobile && !prefersReducedMotion ? -mouse.y * 7 : 0;
  const tiltY = !isMobile && !prefersReducedMotion ? mouse.x * 7 : 0;

  // Distinct 3D mouse parallax transforms for floating HUD elements
  const parallaxAI = !isMobile && !prefersReducedMotion ? {
    transform: `translate3d(${mouse.x * 12}px, ${mouse.y * 10}px, 20px) rotate(${mouse.x * 1.5}deg)`,
    transition: "transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)",
  } : undefined;

  const parallaxIoT = !isMobile && !prefersReducedMotion ? {
    transform: `translate3d(${-mouse.x * 14}px, ${-mouse.y * 12}px, 30px) rotate(${-mouse.y * 1.8}deg)`,
    transition: "transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)",
  } : undefined;

  const parallaxData = !isMobile && !prefersReducedMotion ? {
    transform: `translate3d(${mouse.x * 16}px, ${mouse.y * 14}px, 25px) rotate(${mouse.x * 1.2}deg)`,
    transition: "transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)",
  } : undefined;

  const parallaxSoft = !isMobile && !prefersReducedMotion ? {
    transform: `translate3d(${-mouse.x * 8}px, ${mouse.y * 8}px, 15px)`,
    transition: "transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)",
  } : undefined;

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-tech-grid">
      {/* Soft cinematic gradient aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-blue-100/40 via-sky-50/50 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* 3D Interactive Background Region */}
      <div
        className="absolute inset-0 z-0 pointer-events-auto"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pointer-events-none relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Technical Identity & Philosophy */}
          <div className="lg:col-span-7 flex flex-col items-start z-10 pointer-events-auto">
            
            {/* Status & Engineering Domain Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 border border-blue-200/80 shadow-xs mb-6 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span className="text-[11px] font-mono-tech uppercase tracking-wider text-slate-700">
                SYSTEM ACTIVE // COIMBATORE & ERODE, TN
              </span>
              <span className="w-1 h-3 border-r border-slate-300"></span>
              <span className="text-[11px] font-mono-tech text-blue-600 font-semibold">
                PSGCAS MCA
              </span>
            </div>

            {/* Name */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-3">
              THARUN VAIBHAV <span className="text-blue-600">S S</span>
            </h1>

            {/* Primary Title */}
            <div className="text-lg sm:text-xl font-medium text-slate-700 mb-6 flex flex-wrap items-center gap-2">
              <span className="text-slate-900 font-semibold">{profile.primary_title}</span>
            </div>

            {/* Engineering Brand Philosophy Anchor */}
            <div className="mb-6 p-4 rounded-xl bg-white/75 border border-blue-100/90 backdrop-blur-xs relative overflow-hidden max-w-xl shadow-xs">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
              <div className="text-xs uppercase font-mono-tech text-blue-600 font-semibold tracking-wider mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Engineering Philosophy</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 italic">
                &ldquo;{profile.brand_slogan}&rdquo;
              </p>
              <p className="text-xs text-slate-500 mt-1 font-mono-tech">
                Wild Idea → Curiosity → Experimentation → Engineering → Innovation → Useful Software
              </p>
            </div>

            {/* Short Bio */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mb-8">
              Building real-world physical and digital systems—from{" "}
              <strong className="text-slate-800 font-semibold">LLM-assisted industrial machine diagnostics</strong>{" "}
              and <strong className="text-slate-800 font-semibold">IoT predictive energy grids</strong> to{" "}
              <strong className="text-slate-800 font-semibold">high-performance web platforms</strong>.
            </p>

            {/* Interactive Domain Crossbar Badge */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full max-w-xl mb-8">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/80 border border-slate-200/80 shadow-2xs hover:border-blue-400 transition-colors">
                <Cpu className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-semibold text-slate-800">AI / LLMs</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/80 border border-slate-200/80 shadow-2xs hover:border-sky-400 transition-colors">
                <Database className="w-4 h-4 text-sky-600" />
                <span className="text-xs font-semibold text-slate-800">Data Analytics</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/80 border border-slate-200/80 shadow-2xs hover:border-cyan-400 transition-colors">
                <Radio className="w-4 h-4 text-cyan-600" />
                <span className="text-xs font-semibold text-slate-800">IoT Telemetry</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/80 border border-slate-200/80 shadow-2xs hover:border-indigo-400 transition-colors">
                <Globe className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-semibold text-slate-800">Full-Stack</span>
              </div>
            </div>

            {/* Call To Actions */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto mb-8">
              <a
                href="#projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-all duration-200 shadow-md shadow-blue-500/20 active:scale-98 group cursor-pointer"
                id="hero-explore-work"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="/resumes/Tharun_Vaibhav_Resume.pdf"
                download="Tharun_Vaibhav_Resume.pdf"
                onClick={onDownloadResume}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-800 font-medium text-sm border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 shadow-2xs active:scale-98 cursor-pointer"
                id="hero-download-resume"
              >
                <FileDown className="w-4 h-4 text-blue-600" />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Verified Social Connectors */}
            <div className="flex items-center gap-4 text-slate-500 text-xs">
              <span className="font-mono-tech uppercase text-slate-400">CONNECT:</span>
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-slate-900 transition-colors cursor-pointer"
                id="hero-link-github"
              >
                <GithubIcon className="w-4 h-4 text-slate-700" />
                <span>GitHub</span>
              </a>
              <span className="text-slate-300">•</span>
              <a
                href={linkedinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-blue-600 transition-colors cursor-pointer"
                id="hero-link-linkedin"
              >
                <LinkedinIcon className="w-4 h-4 text-blue-600" />
                <span>LinkedIn</span>
              </a>
              <span className="text-slate-300">•</span>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-1.5 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <span>Email</span>
              </a>
            </div>

          </div>

          {/* Right Column: Prominent Portrait + 3D Technical Stage & Floating HUD */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center pointer-events-none pt-10 sm:pt-12 pb-4">
            
            {/* Floating Technical HUD Chip: Top AI Core (Floating Centered Above Portrait) */}
            <div 
              className="absolute top-0 sm:top-1 left-1/2 -translate-x-1/2 z-20 pointer-events-auto"
              style={parallaxAI}
            >
              <div 
                className="animate-hud-float-a px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-blue-200/90 shadow-sm flex items-center gap-2 text-[10px] font-mono-tech text-blue-700 font-semibold whitespace-nowrap"
              >
                <Cpu className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>AI_CORE // LLM & NEURAL ARCHITECTURE</span>
              </div>
            </div>

            {/* Portrait Frame with Protected Face Zone & 3D Parallax Tilt */}
            <div 
              className="relative z-10 w-[290px] sm:w-[330px] lg:w-[340px] xl:w-[360px] aspect-[4/5] rounded-2xl p-2.5 bg-white/85 backdrop-blur-md border border-blue-200/90 shadow-2xl shadow-blue-500/10 tech-border-bracket ring-1 ring-blue-500/20 transition-transform duration-150 ease-out pointer-events-auto"
              style={{
                transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
              }}
            >
              {/* Corner Technical Coordinate Marks (In Upper Sky Corners, Away from Face) */}
              <div className="absolute top-2.5 left-3 text-[9px] font-mono-tech text-blue-600 font-bold tracking-widest uppercase z-20 pointer-events-none">
                NODE://THARUN.SYS
              </div>
              <div className="absolute top-2.5 right-3 text-[9px] font-mono-tech text-slate-500 font-medium tracking-wider z-20 uppercase pointer-events-none">
                ENGINEERING_PROFILE // ACTIVE
              </div>

              {/* Portrait Image Container - 100% Protected Face Zone */}
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200/60 group">
                <Image
                  src={profile.portrait_url}
                  alt="Tharun Vaibhav S S - Software Engineer"
                  fill
                  priority
                  sizes="(max-width: 768px) 290px, (max-width: 1200px) 340px, 360px"
                  className="object-cover object-top filter contrast-[1.02] brightness-[1.01] transition-transform duration-700 ease-out group-hover:scale-102"
                />

                {/* Live Engineering Telemetry Floating Chip (Docked Cleanly at Lower Edge) */}
                <div 
                  className="absolute bottom-2.5 left-2.5 right-2.5 py-1 px-2.5 sm:px-3 rounded-lg bg-white/90 backdrop-blur-md border border-white/60 shadow-md flex items-center justify-between gap-1 z-20"
                >
                  <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-slate-800 truncate">
                      Open for Engineering Roles
                    </span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-mono-tech text-blue-600 font-medium shrink-0">
                    2026 ACTIVE
                  </span>
                </div>
              </div>
            </div>

            {/* Lower Flanking HUD Band: IOT_TELEMETRY (Left) & DATA_STREAM (Right) */}
            <div className="w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[480px] flex items-center justify-between gap-2 mt-3.5 px-1 sm:px-0 pointer-events-auto">
              
              {/* IOT_TELEMETRY */}
              <div 
                className="z-20"
                style={parallaxIoT}
              >
                <div 
                  className="animate-hud-float-b px-2.5 sm:px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-cyan-200/90 shadow-xs flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono-tech text-cyan-800 font-semibold whitespace-nowrap"
                >
                  <Radio className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-600 shrink-0" />
                  <span>IOT_TELEMETRY <span className="hidden sm:inline">// SENSORS</span></span>
                </div>
              </div>

              {/* DATA_STREAM */}
              <div 
                className="z-20"
                style={parallaxData}
              >
                <div 
                  className="animate-hud-float-c px-2.5 sm:px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-sky-200/90 shadow-xs flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono-tech text-sky-800 font-semibold whitespace-nowrap"
                >
                  <Database className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-600 shrink-0" />
                  <span>DATA_STREAM <span className="hidden sm:inline">// PIPELINES</span></span>
                </div>
              </div>

            </div>

            {/* Floating Technical HUD Chip: Bottom Software Layer */}
            <div 
              className="mt-2.5 flex items-center justify-center z-10 pointer-events-auto"
              style={parallaxSoft}
            >
              <div 
                className="animate-hud-float-d flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-indigo-200/90 shadow-2xs text-[9px] sm:text-[10px] font-mono-tech text-slate-700"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0"></span>
                <span className="font-semibold text-indigo-700">SOFTWARE_LAYER:</span>
                <span>FastAPI // Next.js // Distributed Architecture</span>
              </div>
            </div>

            {/* Philosophy Transformation Micro-indicator */}
            <div className="mt-2 text-[9px] font-mono-tech text-slate-400 uppercase tracking-widest text-center">
              IDEA <span className="text-blue-500">→</span> CURIOSITY <span className="text-blue-500">→</span> EXPERIMENTATION <span className="text-blue-500">→</span> <span className="text-blue-600 font-semibold">ENGINEERING</span> <span className="text-blue-500">→</span> <span className="text-blue-600 font-semibold">INNOVATION</span> <span className="text-blue-500">→</span> SOFTWARE
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
