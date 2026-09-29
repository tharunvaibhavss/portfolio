"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, FileDown, Send, CheckCircle2, Terminal, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { Profile, SocialLink } from "@/types/portfolio";

interface ContactSectionProps {
  profile: Profile;
  socialLinks: SocialLink[];
  onDownloadResume: () => void;
}

export default function ContactSection({ profile, socialLinks, onDownloadResume }: ContactSectionProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const githubLink = socialLinks.find((s) => s.platform.toLowerCase() === "github")?.url || "https://github.com/tharunvaibhavss";
  const linkedinLink = socialLinks.find((s) => s.platform.toLowerCase() === "linkedin")?.url || "https://www.linkedin.com/in/tharun-vaibhav-s-s";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    // Construct mailto link
    const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(formData.subject || "Portfolio Inquiry")}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
    window.location.href = mailto;
  };

  return (
    <section id="contact" className="py-24 bg-white relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono-tech uppercase tracking-wider mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>08 // INITIATE TRANSMISSION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Let&apos;s Build Something.
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Interested in software engineering, AI diagnostic systems, IoT telemetry, or full-stack applications? Let&apos;s connect.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact & Verified Links */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 tech-border-bracket">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                <span>Verified Direct Channels</span>
              </h3>

              <div className="space-y-4 mb-8">
                
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-white border border-slate-200/80 hover:border-blue-400 hover:text-blue-600 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono-tech text-slate-400 uppercase">Email Dispatch</div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-blue-600 truncate">
                      {profile.email}
                    </div>
                  </div>
                </a>

                <a
                  href={`tel:${profile.phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-white border border-slate-200/80 hover:border-blue-400 hover:text-blue-600 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono-tech text-slate-400 uppercase">Phone & WhatsApp</div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-sky-600 truncate">
                      {profile.phone}
                    </div>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white border border-slate-200/80">
                  <div className="w-9 h-9 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono-tech text-slate-400 uppercase">Base Coordinates</div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-900">
                      {profile.location}, India
                    </div>
                  </div>
                </div>

              </div>

              {/* Direct Buttons */}
              <div className="flex flex-col gap-2.5">
                <a
                  href="/resumes/Tharun_Vaibhav_Resume.pdf"
                  download="Tharun_Vaibhav_Resume.pdf"
                  onClick={onDownloadResume}
                  id="contact-download-resume"
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition-all shadow-md shadow-blue-500/10 cursor-pointer active:scale-98"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Download Primary Verified Resume</span>
                </a>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 font-semibold text-xs hover:bg-slate-100 transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                  </a>

                  <a
                    href={linkedinLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-blue-700 font-semibold text-xs hover:bg-slate-100 transition-colors"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Transmission Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Send a Transmission
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Connect directly regarding engineering opportunities, technical collaborations, or consulting.
            </p>

            {formSubmitted ? (
              <div className="p-8 rounded-xl bg-emerald-50 border border-emerald-200 text-center animate-fadeIn">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h4 className="text-base font-bold text-slate-900 mb-1">
                  Message Dispatched
                </h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto mb-4">
                  Thank you for reaching out. Opening your email client to complete transmission to {profile.email}.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
                >
                  Send Another Transmission
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-tech uppercase text-slate-600 mb-1.5 font-medium">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:bg-white focus:border-blue-600 focus:outline-hidden transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-tech uppercase text-slate-600 mb-1.5 font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:bg-white focus:border-blue-600 focus:outline-hidden transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-tech uppercase text-slate-600 mb-1.5 font-medium">
                    Subject / Engineering Domain
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Software Engineering Opportunity / AI Project"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:bg-white focus:border-blue-600 focus:outline-hidden transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-tech uppercase text-slate-600 mb-1.5 font-medium">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide context on your project, team, or inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:bg-white focus:border-blue-600 focus:outline-hidden transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  id="btn-submit-message"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-blue-600 transition-colors cursor-pointer shadow-xs active:scale-98"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Message</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
