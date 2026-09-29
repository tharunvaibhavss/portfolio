"use client";

import React, { useState } from "react";
import { Experience, Education } from "@/types/portfolio";
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2, ChevronRight, Terminal } from "lucide-react";

interface ExperienceSectionProps {
  experience: Experience[];
  education: Education[];
}

export default function ExperienceSection({ experience, education }: ExperienceSectionProps) {
  const [activeTab, setActiveTab] = useState<"experience" | "education">("experience");

  return (
    <section id="experience" className="py-24 bg-slate-50 relative border-t border-slate-200/80 bg-tech-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 border border-blue-200 text-blue-700 text-xs font-mono-tech uppercase tracking-wider mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>04 // TIMELINE & ROLES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Professional Experience & Education
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Verified internship track record, responsibilities, measurable outcomes, and academic milestones.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <button
              onClick={() => setActiveTab("experience")}
              id="tab-experience"
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all cursor-pointer ${
                activeTab === "experience"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>INDUSTRY INTERNSHIPS</span>
            </button>
            <button
              onClick={() => setActiveTab("education")}
              id="tab-education"
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all cursor-pointer ${
                activeTab === "education"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>ACADEMIC DEGREES</span>
            </button>
          </div>
        </div>

        {/* Timeline View */}
        <div className="max-w-4xl mx-auto">
          {activeTab === "experience" ? (
            <div className="relative pl-6 sm:pl-8 border-l-2 border-blue-200/80 space-y-12">
              {experience.map((exp, index) => (
                <div key={exp.id} className="relative group">
                  {/* Timeline dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-blue-600 shadow-xs group-hover:scale-125 transition-transform" />

                  {/* Card */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 hover:border-blue-300 transition-all shadow-xs tech-border-bracket">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <span className="text-xs font-mono-tech text-blue-600 font-bold uppercase tracking-wider">
                          {exp.year} // {exp.duration}
                        </span>
                        <h3 className="text-xl font-bold text-slate-900">
                          {exp.role}
                        </h3>
                        <div className="text-sm font-semibold text-slate-700">
                          {exp.company}
                        </div>
                      </div>
                      {exp.location && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono-tech bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 self-start sm:self-auto">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{exp.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Bullet Points */}
                    <ul className="space-y-2.5 my-4">
                      {exp.bullet_points.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech tags */}
                    {exp.tech_tags && exp.tech_tags.length > 0 && (
                      <div className="pt-4 mt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-mono-tech uppercase text-slate-400">
                          SKILLS:
                        </span>
                        {exp.tech_tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="relative pl-6 sm:pl-8 border-l-2 border-indigo-200/80 space-y-8">
              {education.map((edu) => (
                <div key={edu.id} className="relative group">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-indigo-600 shadow-xs group-hover:scale-125 transition-transform" />

                  <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 hover:border-indigo-300 transition-all shadow-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div>
                        <div className="text-xs font-mono-tech text-indigo-600 font-bold uppercase tracking-wider">
                          COMPLETION: {edu.completion_date}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">
                          {edu.degree}
                        </h3>
                        <div className="text-sm font-semibold text-slate-700">
                          {edu.institution}
                        </div>
                      </div>
                      {edu.score && (
                        <div className="px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold font-mono-tech self-start sm:self-auto">
                          SCORE: {edu.score}
                        </div>
                      )}
                    </div>

                    {edu.description && (
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3 pt-3 border-t border-slate-100">
                        {edu.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
