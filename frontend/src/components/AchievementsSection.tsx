"use client";

import React, { useState } from "react";
import { Award, Trophy, Users, Terminal, CheckCircle2, Mic, Flame } from "lucide-react";
import { Achievement, Hackathon, Activity } from "@/types/portfolio";

interface AchievementsSectionProps {
  achievements: Achievement[];
  hackathons: Hackathon[];
  activities: Activity[];
}

export default function AchievementsSection({
  achievements,
  hackathons,
  activities,
}: AchievementsSectionProps) {
  const [filter, setFilter] = useState<"all" | "awards" | "hackathons" | "leadership">("all");

  return (
    <section id="achievements" className="py-24 bg-slate-50 relative border-t border-slate-200/80 bg-tech-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 border border-blue-200 text-blue-700 text-xs font-mono-tech uppercase tracking-wider mb-3">
            <Trophy className="w-3.5 h-3.5" />
            <span>07 // HONORS & RECOGNITION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Honors, Hackathons & Leadership
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Verified competitive awards, hackathon prototypes, national training, and technical speaking engagements.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
          <button
            onClick={() => setFilter("all")}
            id="filter-achieve-all"
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filter === "all"
                ? "bg-blue-600 text-white shadow-2xs"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            All Honors ({achievements.length + hackathons.length + activities.length})
          </button>
          <button
            onClick={() => setFilter("awards")}
            id="filter-achieve-awards"
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filter === "awards"
                ? "bg-blue-600 text-white shadow-2xs"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            Awards & Recognition ({achievements.length})
          </button>
          <button
            onClick={() => setFilter("hackathons")}
            id="filter-achieve-hackathons"
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filter === "hackathons"
                ? "bg-blue-600 text-white shadow-2xs"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            National Hackathons ({hackathons.length})
          </button>
          <button
            onClick={() => setFilter("leadership")}
            id="filter-achieve-leadership"
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filter === "leadership"
                ? "bg-blue-600 text-white shadow-2xs"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            Leadership & Speaking ({activities.length})
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Awards */}
          {(filter === "all" || filter === "awards") &&
            achievements.map((item) => (
              <div
                key={`ach-${item.id}`}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 transition-all shadow-xs flex flex-col justify-between tech-border-bracket"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                      <Trophy className="w-4 h-4" />
                    </span>
                    <span className="text-[11px] font-mono-tech text-blue-600 font-bold uppercase">
                      {item.year}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    {item.title}
                  </h3>
                  <div className="text-xs font-semibold text-blue-600 mb-3 font-mono-tech">
                    {item.event}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono-tech">
                  <span>CATEGORY: {item.category.toUpperCase()}</span>
                  <span className="text-emerald-600 font-semibold">VERIFIED</span>
                </div>
              </div>
            ))}

          {/* Hackathons */}
          {(filter === "all" || filter === "hackathons") &&
            hackathons.map((hack) => (
              <div
                key={`hack-${hack.id}`}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 transition-all shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                      <Flame className="w-4 h-4" />
                    </span>
                    <span className="text-[11px] font-mono-tech text-blue-600 font-bold uppercase">
                      {hack.year}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    {hack.title}
                  </h3>
                  <div className="text-xs font-semibold text-blue-600 mb-3 font-mono-tech">
                    {hack.role_or_focus}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {hack.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono-tech">
                  <span>HACKATHON TRACK</span>
                  <span className="text-blue-600 font-semibold">COMPETITIVE</span>
                </div>
              </div>
            ))}

          {/* Activities / Public Speaking */}
          {(filter === "all" || filter === "leadership") &&
            activities.map((act) => (
              <div
                key={`act-${act.id}`}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 transition-all shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                      <Mic className="w-4 h-4" />
                    </span>
                    <span className="text-[11px] font-mono-tech text-emerald-600 font-bold uppercase">
                      {act.year}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    {act.title}
                  </h3>
                  <div className="text-xs font-semibold text-emerald-700 mb-3 font-mono-tech">
                    {act.role}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {act.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono-tech">
                  <span>LEADERSHIP</span>
                  <span className="text-slate-600 font-semibold">RESOURCE PERSON</span>
                </div>
              </div>
            ))}

        </div>

      </div>
    </section>
  );
}
