"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Award, ChevronDown, ChevronUp, ExternalLink, FileCheck, Eye, Terminal } from "lucide-react";
import { Certification } from "@/types/portfolio";
import CertificateModal from "./CertificateModal";

interface CertificationsSectionProps {
  certifications: Certification[];
}

export default function CertificationsSection({ certifications }: CertificationsSectionProps) {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [showAdditional, setShowAdditional] = useState(false);

  const featuredCerts = certifications.filter((c) => c.is_featured);
  const additionalCerts = certifications.filter((c) => !c.is_featured);

  return (
    <section id="certifications" className="py-24 bg-white relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono-tech uppercase tracking-wider mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>06 // VERIFIED CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Professional Certifications
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Curated industry qualifications from IBM, NPTEL, Infosys Springboard, Google, Simplilearn, and UiPath.
          </p>
        </div>

        {/* Featured Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {featuredCerts.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              className="group cursor-pointer rounded-2xl border border-slate-200 bg-white hover:border-blue-400 p-5 transition-all duration-300 shadow-2xs hover:shadow-md flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail Preview */}
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 border border-slate-100 mb-4 group-hover:scale-[1.02] transition-transform">
                  {cert.image_url ? (
                    <Image
                      src={cert.image_url}
                      alt={cert.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 350px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
                      <FileCheck className="w-8 h-8 text-blue-600 mb-2" />
                      <span className="text-xs font-bold text-slate-700">{cert.name}</span>
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-blue-900/20 opacity-0 group-hover:opacity-100 backdrop-blur-2xs transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1.5 rounded-lg bg-white/95 text-xs font-bold text-slate-900 shadow-md flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-blue-600" />
                      <span>View Credential</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[10px] font-mono-tech uppercase font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    {cert.category}
                  </span>
                  {cert.issue_date && (
                    <span className="text-[10px] font-mono-tech text-slate-400">
                      {cert.issue_date}
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {cert.name}
                </h3>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-medium text-slate-700">{cert.issuer}</span>
                <span className="text-[11px] font-mono-tech text-blue-600 font-semibold group-hover:translate-x-0.5 transition-transform">
                  Inspect →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Expandable Additional Certifications Section */}
        {additionalCerts.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <button
                onClick={() => setShowAdditional(!showAdditional)}
                id="toggle-additional-certs"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-all cursor-pointer shadow-2xs"
              >
                <span>{showAdditional ? "Hide Additional Certifications" : `Show Additional Certifications (${additionalCerts.length})`}</span>
                {showAdditional ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>

            {showAdditional && (
              <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 animate-fadeIn space-y-3">
                <div className="text-xs font-mono-tech uppercase text-slate-500 font-bold mb-3">
                  AUTOMATION (UiPath), LEADERSHIP & DOMAIN CERTIFICATES
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {additionalCerts.map((cert) => (
                    <div
                      key={cert.id}
                      onClick={() => setSelectedCert(cert)}
                      className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 transition-colors cursor-pointer flex items-center justify-between gap-3 shadow-2xs"
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 truncate">
                          {cert.name}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono-tech truncate">
                          {cert.issuer} • {cert.category}
                        </div>
                      </div>
                      <span className="text-xs font-bold text-blue-600 shrink-0">
                        View
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Modal */}
      <CertificateModal
        certification={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  );
}
