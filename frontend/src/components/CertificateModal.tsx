"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, ExternalLink, FileText, CheckCircle2, Download } from "lucide-react";
import { Certification } from "@/types/portfolio";

interface CertificateModalProps {
  certification: Certification | null;
  onClose: () => void;
}

export default function CertificateModal({ certification, onClose }: CertificateModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (certification) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [certification, onClose]);

  if (!certification) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      {/* Background click to dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Box */}
      <div className="relative z-10 w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                {certification.name}
              </h3>
              <div className="text-xs text-slate-500 font-mono-tech">
                {certification.issuer} {certification.issue_date ? `• ${certification.issue_date}` : ""}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {certification.pdf_url && (
              <a
                href={certification.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors"
                title="Open PDF"
              >
                <Download className="w-4 h-4" />
              </a>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / Image Viewer */}
        <div className="p-6 overflow-y-auto flex items-center justify-center bg-slate-100/50 min-h-[350px]">
          {certification.image_url ? (
            <div className="relative w-full max-w-2xl aspect-[4/3] rounded-lg overflow-hidden border border-slate-200 shadow-sm bg-white">
              <Image
                src={certification.image_url}
                alt={certification.name}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-contain"
              />
            </div>
          ) : certification.pdf_url ? (
            <div className="text-center py-12 px-6">
              <FileText className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <div className="text-base font-bold text-slate-800 mb-2">
                Official Document Available (PDF)
              </div>
              <p className="text-xs text-slate-500 max-w-md mx-auto mb-6">
                Verified certificate document issued by {certification.issuer}.
              </p>
              <a
                href={certification.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>Open / Download Certificate PDF</span>
              </a>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs font-mono-tech">
              DOCUMENT ARCHIVE VERIFIED
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="font-mono-tech">CATEGORY: {certification.category.toUpperCase()}</span>
          {certification.verification_url ? (
            <a
              href={certification.verification_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-blue-600 font-semibold hover:underline"
            >
              <span>Verify Online</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <span className="text-slate-400">Archived Credential</span>
          )}
        </div>

      </div>
    </div>
  );
}
