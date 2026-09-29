"use client";

import React from "react";
import { Sparkles, Terminal, Code2, Cpu, Database, Radio, CheckCircle2, Award, BookOpen } from "lucide-react";
import { Profile } from "@/types/portfolio";

interface AboutSectionProps {
  profile: Profile;
}

export default function AboutSection({ profile }: AboutSectionProps) {
  const engineeringValues = [
    {
      title: "Wild Idea to Useful Software",
      desc: "Every robust system starts with an inquisitive question. The core mission is taking unconstrained curiosity and channeling it through rigorous engineering until it becomes dependable software.",
      icon: Sparkles,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Physical-Digital Systems Convergence",
      desc: "Bridging the gap between the physical reality (sensors, power telemetry, water quality, machine vibration) and cloud software (FastAPI microservices, PostgreSQL, real-time dashboards).",
      icon: Radio,
      color: "text-cyan-600",
      bg: "bg-cyan-50",
    },
    {
      title: "Applied AI & Algorithmic Triage",
      desc: "Treating AI as a precision diagnostic tool rather than a toy. From integrating OpenAI GPT-5.5 API into industrial maintenance to predictive energy forecasting models.",
      icon: Cpu,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      title: "Data Integrity & Performance",
      desc: "Optimizing data pipelines and web platforms with measurable business impact—achieving 25–30% bounce rate reductions and 15–20% faster SQL data transformations.",
      icon: Database,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden border-t border-slate-100">
      {/* Background subtle technical grid */}
      <div className="absolute inset-0 bg-tech-dots opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono-tech uppercase tracking-wider mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>01 // BACKGROUND & PHILOSOPHY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Beyond the Code
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            The mindset, discipline, and engineering philosophy behind the architecture.
          </p>
        </div>

        {/* Narrative & Philosophy Anchor Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          <div className="lg:col-span-7 bg-slate-50/80 rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs relative">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-blue-600" />
              <span>Engineering as an Applied Science</span>
            </h3>
            
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4">
              I am an MCA postgraduate scholar at <strong className="text-slate-900">PSG College of Arts & Science</strong>, 
              focusing on Artificial Intelligence, Generative AI, LLM-powered applications, and IoT software architecture. 
              My background in Information Technology provided a deep foundation in computer science fundamentals, 
              relational systems, and web architecture.
            </p>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6">
              During my 10-month Software Development Internship at <strong className="text-slate-900">Dyzen Consultants</strong>, 
              I engineered and deployed 4+ production web applications, optimizing user experience and driving a 
              25–30% reduction in bounce rates. Complementing this, my ERP internship at <strong className="text-slate-900">Thiruvusoft</strong> 
              deepened my mastery of SQL pipelines and transactional data workflows, while my time at <strong className="text-slate-900">Akkroni Craft</strong> 
              refined my content optimization and digital architecture skills.
            </p>

            {/* Verified Academic Milestones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono-tech text-slate-500 uppercase">Degree (In Progress)</div>
                  <div className="text-sm font-semibold text-slate-900">MCA (78%*)</div>
                  <div className="text-xs text-slate-600">PSG College of Arts & Science • 2025–2027</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center text-slate-700 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono-tech text-slate-500 uppercase">Undergraduate</div>
                  <div className="text-sm font-semibold text-slate-900">B.Sc IT (75.9%)</div>
                  <div className="text-xs text-slate-600">PSG College of Arts & Science • 2022–2025</div>
                </div>
              </div>
            </div>
          </div>

          {/* Philosophy Breakdown Sidebar */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg relative overflow-hidden">
              <div className="text-xs font-mono-tech uppercase tracking-wider text-blue-200 mb-2">
                Core Philosophy Anchor
              </div>
              <h4 className="text-2xl font-bold tracking-tight mb-2">
                &ldquo;Wild Idea. Wealthy Innovation.&rdquo;
              </h4>
              <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
                Innovation does not occur by playing safe. An audacious idea requires the courage to experiment, 
                coupled with the disciplined architecture of reliable software engineering to turn it into 
                tangible value.
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-2xl font-extrabold text-blue-600 font-mono-tech">4+</div>
                <div className="text-xs text-slate-600 font-medium mt-0.5">Deployed Client Platforms</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-2xl font-extrabold text-blue-600 font-mono-tech">25-30%</div>
                <div className="text-xs text-slate-600 font-medium mt-0.5">Bounce Rate Reduction</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-2xl font-extrabold text-blue-600 font-mono-tech">20-25%</div>
                <div className="text-xs text-slate-600 font-medium mt-0.5">Energy Savings Potential</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-2xl font-extrabold text-blue-600 font-mono-tech">24h</div>
                <div className="text-xs text-slate-600 font-medium mt-0.5">National Hackathon Best MVP</div>
              </div>
            </div>

          </div>

        </div>

        {/* 4 Pillars of Value */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {engineeringValues.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl bg-white border border-slate-200/90 hover:border-blue-300 transition-all duration-200 shadow-2xs hover:shadow-md group"
              >
                <div className={`w-10 h-10 rounded-lg ${val.bg} ${val.color} flex items-center justify-center mb-4 transition-transform group-hover:scale-105`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">
                  {val.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
