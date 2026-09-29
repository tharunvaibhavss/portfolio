"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, FileDown, Terminal, Cpu } from "lucide-react";

interface NavbarProps {
  onDownloadResume?: () => void;
}

export default function Navbar({ onDownloadResume }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = [
        "home",
        "about",
        "engineering",
        "projects",
        "experience",
        "skills",
        "achievements",
        "certifications",
        "contact",
      ];

      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home", id: "home" },
    { label: "About", href: "#about", id: "about" },
    { label: "Engineering", href: "#engineering", id: "engineering" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Experience", href: "#experience", id: "experience" },
    { label: "Skills", href: "#skills", id: "skills" },
    { label: "Achievements", href: "#achievements", id: "achievements" },
    { label: "Certifications", href: "#certifications", id: "certifications" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-xs border-b border-slate-200/80 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="flex items-center gap-2.5 group"
          id="nav-logo"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-600/30 flex items-center justify-center text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
            <Cpu className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
              THARUN VAIBHAV
            </span>
            <span className="text-[10px] font-mono-tech text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              SE // AI • DATA • IoT
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/70 p-1 rounded-full border border-slate-200/60 backdrop-blur-sm">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                id={`nav-link-${link.id}`}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-white text-blue-600 shadow-xs font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="/resumes/Tharun_Vaibhav_Resume.pdf"
            download="Tharun_Vaibhav_Resume.pdf"
            onClick={onDownloadResume}
            id="nav-download-resume"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-xs shadow-blue-500/20 active:scale-95"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile menu toggle button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-hidden focus:ring-2 focus:ring-blue-600"
          aria-label="Toggle navigation menu"
          id="mobile-nav-toggle"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-lg border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl transition-all">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between">
              <a
                href="/resumes/Tharun_Vaibhav_Resume.pdf"
                download="Tharun_Vaibhav_Resume.pdf"
                onClick={onDownloadResume}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-xs"
              >
                <FileDown className="w-4 h-4" />
                <span>Download Primary Resume</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
