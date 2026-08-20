import React from "react";
import { Image, FileText, Receipt, FileEdit, ExternalLink, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface ToolItem {
  id: string;
  name: string;
  description: string;
  link: string;
  icon: React.ComponentType<{ className?: string }>;
}

const partnerTools: ToolItem[] = [
  {
    id: "mockup-gen",
    name: "Mockup Generator",
    description: "Put your logo on real products — coffee cups, t-shirts, tote bags, and more.",
    link: "https://www.toolmany.com/tools/mockup-gen?tool=mockup-gen",
    icon: Image,
  },
  {
    id: "resume-cv-builder",
    name: "Resume / CV Builder",
    description: "Build an ATS-friendly resume in minutes, completely free.",
    link: "https://www.toolmany.com/tools/resume-cv-builder?tool=resume-cv-builder",
    icon: FileText,
  },
  {
    id: "invoice-generator",
    name: "Invoice Generator",
    description: "Create professional PDF invoices in your browser, no account needed.",
    link: "https://www.toolmany.com/tools/invoice-generator?tool=invoice-generator",
    icon: Receipt,
  },
  {
    id: "pdf-editor",
    name: "PDF Editor",
    description: "Edit, merge, and manage PDFs directly in your browser.",
    link: "https://www.toolmany.com/tools/pdf-editor?tool=pdf-editor",
    icon: FileEdit,
  },
];

export function PartnerToolsBanner() {
  return (
    <section aria-label="ToolMany Partner Tools" className="w-full bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-200/80 my-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-2.5 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 font-mono text-xs font-bold tracking-widest uppercase shadow-2xs">
            <Sparkles className="h-3.5 w-3.5 text-teal-600" />
            <span>FROM OUR TEAM</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Free Browser Tools, No Sign-Up Required
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
            We also built <strong className="text-slate-900 font-semibold">ToolMany</strong> — free, private, browser-based tools for everyday tasks. No account needed, nothing uploaded to a server.
          </p>
        </div>

        {/* 4-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {partnerTools.map((tool, index) => {
            const IconComponent = tool.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.a
                key={tool.id}
                href={tool.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: isEven ? -25 : 25, y: 15 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
                className="group relative flex flex-col justify-between rounded-2xl bg-white border border-slate-200/90 hover:border-teal-500/50 p-5 transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-1 cursor-pointer text-left"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-teal-50 text-teal-600 border border-teal-100 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-800 bg-teal-50 border border-teal-200/80 px-2 py-0.5 rounded-full">
                      100% Free
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors flex items-center gap-1.5">
                      <span>{tool.name}</span>
                      <ExternalLink className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 text-slate-400 group-hover:text-teal-600 transition-opacity" />
                    </h3>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-sans">
                      {tool.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-xs font-mono font-bold text-teal-700 group-hover:text-teal-800 transition-colors">
                  <span>Try it free</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-1 text-teal-600" />
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Centered Closing Link */}
        <div className="text-center pt-2">
          <a
            href="https://www.toolmany.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold text-slate-700 hover:text-teal-800 bg-white hover:bg-slate-100 border border-slate-200/90 px-5 py-2.5 rounded-xl shadow-2xs transition-all group"
          >
            <span>Explore all ToolMany web tools</span>
            <ArrowRight className="h-4 w-4 text-teal-600 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}

