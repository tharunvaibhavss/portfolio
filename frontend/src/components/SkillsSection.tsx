"use client";

import React, { useState } from "react";
import { SkillCategory } from "@/types/portfolio";
import { Search, Terminal, Cpu, Database, Server, Layout, Radio, Cloud, Sparkles, Check, Heart } from "lucide-react";

interface SkillsSectionProps {
  categories: SkillCategory[];
}

export default function SkillsSection({ categories }: SkillsSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const filteredCategories = categories
    .map((cat) => {
      const matchesCategory = selectedCategory === "ALL" || cat.slug === selectedCategory;
      if (!matchesCategory) return null;

      const filteredSkills = cat.skills.filter((s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (filteredSkills.length === 0) return null;
      return { ...cat, skills: filteredSkills };
    })
    .filter(Boolean) as SkillCategory[];

  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case "programming":
        return <Terminal className="w-4 h-4 text-blue-600" />;
      case "frontend":
        return <Layout className="w-4 h-4 text-sky-600" />;
      case "backend":
        return <Server className="w-4 h-4 text-indigo-600" />;
      case "databases":
        return <Database className="w-4 h-4 text-cyan-600" />;
      case "ai-data":
        return <Cpu className="w-4 h-4 text-purple-600" />;
      case "iot-systems":
        return <Radio className="w-4 h-4 text-emerald-600" />;
      case "tools-deployment":
        return <Cloud className="w-4 h-4 text-slate-600" />;
      case "ai-dev-tools":
        return <Sparkles className="w-4 h-4 text-amber-500" />;
      default:
        return <Check className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <section id="skills" className="py-24 bg-white relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono-tech uppercase tracking-wider mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>05 // TECHNICAL CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Structured Skill Matrix
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Curated engineering competencies organized by domain, strictly verified against production projects and certifications.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skills (e.g. FastAPI, Python, SQL)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-600 focus:outline-hidden transition-all"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap justify-center w-full md:w-auto">
            <button
              onClick={() => setSelectedCategory("ALL")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategory === "ALL"
                  ? "bg-blue-600 text-white shadow-2xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              All Domains
            </button>
            {categories.map((c) => (
              <button
                key={c.slug}
                onClick={() => setSelectedCategory(c.slug)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  selectedCategory === c.slug
                    ? "bg-blue-600 text-white shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {c.name.split(" ")[0]}
              </button>
            ))}
          </div>

        </div>

        {/* Categorized Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200 hover:border-blue-300 transition-all duration-200 shadow-2xs hover:shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                    {getCategoryIcon(cat.slug)}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {cat.name}
                  </h3>
                </div>
                <span className="text-[10px] font-mono-tech text-slate-400">
                  {cat.skills.length} verified
                </span>
              </div>

              {cat.description && (
                <p className="text-[11px] text-slate-500 mb-4">
                  {cat.description}
                </p>
              )}

              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      skill.is_featured
                        ? "bg-white text-blue-900 border-blue-200 shadow-2xs font-semibold"
                        : "bg-white/80 text-slate-700 border-slate-200"
                    }`}
                  >
                    {skill.is_featured && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    )}
                    <span>{skill.name}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
