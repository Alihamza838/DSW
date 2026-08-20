import React from "react";
import { Image, FileText, Receipt, FileEdit, ArrowRight, ExternalLink, Sparkles } from "lucide-react";

interface ToolCardItem {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: React.ElementType;
}

const TOOLMANY_TOOLS: ToolCardItem[] = [
  {
    id: "mockup-gen",
    name: "Mockup Generator",
    description: "Put your logo on real products — coffee cups, t-shirts, tote bags, and more",
    url: "https://www.toolmany.com/tools/mockup-gen?tool=mockup-gen",
    icon: Image,
  },
  {
    id: "resume-cv-builder",
    name: "Resume/CV Builder",
    description: "Build an ATS-friendly resume in minutes, completely free",
    url: "https://www.toolmany.com/tools/resume-cv-builder?tool=resume-cv-builder",
    icon: FileText,
  },
  {
    id: "invoice-generator",
    name: "Invoice Generator",
    description: "Create professional PDF invoices in your browser, no account needed",
    url: "https://www.toolmany.com/tools/invoice-generator?tool=invoice-generator",
    icon: Receipt,
  },
  {
    id: "pdf-editor",
    name: "PDF Editor",
    description: "Edit, merge, and manage PDFs directly in your browser",
    url: "https://www.toolmany.com/tools/pdf-editor?tool=pdf-editor",
    icon: FileEdit,
  },
];

export function PartnerToolsBanner() {
  return (
    <aside
      aria-label="Partner Tools by ToolMany"
      className="w-full bg-gradient-to-b from-slate-50 via-white to-slate-50 border-t border-slate-200/80 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Header & Subtext */}
        <div className="text-center space-y-2.5 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 font-mono text-xs font-bold tracking-widest uppercase shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>FROM OUR TEAM</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-display">
            Free Browser Tools, No Sign-Up Required
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
            We also built <strong className="text-slate-900 font-semibold">ToolMany</strong> — free, private, browser-based tools for everyday tasks. No account needed, nothing uploaded to a server.
          </p>
        </div>

        {/* 4 Cards Grid (1 col mobile, 2 tablet, 4 desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {TOOLMANY_TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <a
                key={tool.id}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col justify-between bg-white hover:bg-slate-50/80 border border-slate-200/90 hover:border-teal-500/50 rounded-2xl p-5 transition-all duration-200 shadow-xs hover:shadow-md hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-teal-50 group-hover:bg-teal-600 text-teal-600 group-hover:text-white border border-teal-100 transition-colors duration-200">
                      <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-800 bg-teal-50 border border-teal-200/80 px-2 py-0.5 rounded-full">
                      100% Free
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors flex items-center justify-between gap-1 font-display">
                      <span>{tool.name}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600 transition-colors shrink-0" />
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1.5 font-sans">
                      {tool.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center text-xs font-bold text-teal-700 group-hover:text-teal-800">
                  <span>Try it free</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1 text-teal-600" />
                </div>
              </a>
            );
          })}
        </div>

        {/* Secondary centered link */}
        <div className="text-center pt-2">
          <a
            href="https://www.toolmany.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold text-slate-700 hover:text-teal-800 bg-white hover:bg-slate-100 border border-slate-200/90 px-5 py-2.5 rounded-xl shadow-2xs transition-all group"
          >
            <span>Explore all ToolMany tools</span>
            <ArrowRight className="w-4 h-4 text-teal-600 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </aside>
  );
}

