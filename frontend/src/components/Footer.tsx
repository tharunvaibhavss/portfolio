"use client";

import React from "react";
import { Cpu, Mail, ArrowUp, Terminal } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { Profile, SocialLink } from "@/types/portfolio";

interface FooterProps {
  profile: Profile;
  socialLinks: SocialLink[];
}

export default function Footer({ profile, socialLinks }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const githubLink = socialLinks.find((s) => s.platform.toLowerCase() === "github")?.url || "https://github.com/tharunvaibhavss";
  const linkedinLink = socialLinks.find((s) => s.platform.toLowerCase() === "linkedin")?.url || "https://www.linkedin.com/in/tharun-vaibhav-s-s";

  return (
    <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-white tracking-tight">
                THARUN VAIBHAV S S
              </span>
            </div>

            <div className="text-xs font-mono-tech text-blue-400 font-semibold mb-3">
              &ldquo;{profile.brand_slogan}&rdquo;
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mb-6">
              Engineering practical AI, data intelligence, IoT telemetry, and dependable software systems from inception to production.
            </p>

            <div className="flex items-center gap-3">
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={linkedinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Architecture Sitemap */}
          <div className="md:col-span-4">
            <div className="text-xs font-mono-tech uppercase text-slate-400 font-semibold tracking-wider mb-4">
              SYSTEM SECTIONS
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a href="#home" className="hover:text-blue-400 transition-colors">00 // Home</a>
              <a href="#about" className="hover:text-blue-400 transition-colors">01 // About</a>
              <a href="#engineering" className="hover:text-blue-400 transition-colors">02 // Engineering DNA</a>
              <a href="#projects" className="hover:text-blue-400 transition-colors">03 // Projects</a>
              <a href="#experience" className="hover:text-blue-400 transition-colors">04 // Experience</a>
              <a href="#skills" className="hover:text-blue-400 transition-colors">05 // Skills Matrix</a>
              <a href="#certifications" className="hover:text-blue-400 transition-colors">06 // Certifications</a>
              <a href="#achievements" className="hover:text-blue-400 transition-colors">07 // Achievements</a>
              <a href="#contact" className="hover:text-blue-400 transition-colors">08 // Contact</a>
            </div>
          </div>

          {/* System Telemetry Readout */}
          <div className="md:col-span-3 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono-tech uppercase text-slate-400 font-semibold tracking-wider mb-3">
                SYSTEM TELEMETRY
              </div>
              <div className="space-y-1.5 text-[11px] font-mono-tech text-slate-400">
                <div className="flex justify-between">
                  <span>API STATUS:</span>
                  <span className="text-emerald-400">ONLINE (200 OK)</span>
                </div>
                <div className="flex justify-between">
                  <span>ENGINE:</span>
                  <span>NEXT.JS + FASTAPI</span>
                </div>
                <div className="flex justify-between">
                  <span>LOCATION:</span>
                  <span>ERODE / CBE, INDIA</span>
                </div>
                <div className="flex justify-between">
                  <span>DEPLOYED:</span>
                  <span>2026 PRODUCTION</span>
                </div>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-6 inline-flex items-center gap-2 text-xs font-mono-tech text-slate-400 hover:text-white transition-colors cursor-pointer self-start"
            >
              <span>RETURN TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Tharun Vaibhav S S. All engineering rights reserved.</p>
          <p className="font-mono-tech text-[11px]">
            Designed & Engineered with Next.js, Three.js & FastAPI.
          </p>
        </div>

      </div>
    </footer>
  );
}
