"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import EngineeringDNA from "@/components/EngineeringDNA";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import CertificationsSection from "@/components/CertificationsSection";
import AchievementsSection from "@/components/AchievementsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import GlobalCanvas from "@/components/3d/GlobalCanvas";
import { ThreeDProvider } from "@/context/ThreeDContext";
import { PortfolioData } from "@/types/portfolio";
import { fallbackPortfolioData } from "@/lib/fallbackData";
import { fetchPortfolioSummary } from "@/lib/api";

export default function Home() {
  const [data, setData] = useState<PortfolioData>(fallbackPortfolioData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Attempt dynamic fetch from FastAPI backend
    async function loadData() {
      try {
        const result = await fetchPortfolioSummary();
        if (result && result.profile) {
          setData(result);
        }
      } catch (err) {
        console.warn("Using offline verified snapshot.", err);
      }
    }
    loadData();
  }, []);

  const handleDownloadResume = () => {
    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#0066ff", "#0ea5e9", "#2563eb", "#38bdf8"],
      });
    } catch {
      // ignore
    }
  };

  return (
    <ThreeDProvider>
      <div className="flex flex-col min-h-screen relative selection:bg-blue-600/10 selection:text-blue-700">
        {/* Global Persistent 3D WebGL Canvas */}
        <GlobalCanvas />

        {/* Sticky Glass Navbar */}
        <Navbar onDownloadResume={handleDownloadResume} />

        {/* Main Content Sections */}
        <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <Hero
          profile={data.profile}
          socialLinks={data.social_links}
          onDownloadResume={handleDownloadResume}
        />

        {/* About Section - Beyond the Code */}
        <AboutSection profile={data.profile} />

        {/* Engineering DNA - 4 Core Pillars */}
        <EngineeringDNA />

        {/* Projects Section - Verified Engineering Case Studies */}
        <ProjectsSection projects={data.projects} />

        {/* Experience & Education Section */}
        <ExperienceSection
          experience={data.experience}
          education={data.education}
        />

        {/* Skills Section - Matrix with search & categories */}
        <SkillsSection categories={data.skill_categories} />

        {/* Certifications Section */}
        <CertificationsSection certifications={data.certifications} />

        {/* Achievements, Hackathons & Activities */}
        <AchievementsSection
          achievements={data.achievements}
          hackathons={data.hackathons}
          activities={data.activities}
        />

        {/* Contact & Download Resume */}
        <ContactSection
          profile={data.profile}
          socialLinks={data.social_links}
          onDownloadResume={handleDownloadResume}
        />
      </main>

      {/* Footer */}
      <Footer
        profile={data.profile}
        socialLinks={data.social_links}
      />
    </div>
  </ThreeDProvider>
  );
}
