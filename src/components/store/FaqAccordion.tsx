import React from "react";
import { Accordion, AccordionItem } from "../ui/accordion";
import { CopySectionLink } from "../ui/CopySectionLink";
import type { Faq } from "../../types";

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  if (!faqs || faqs.length === 0) return null;
  const sectionId = "faq-section";

  return (
    <div id={sectionId} className="bg-white rounded-2xl border border-slate-200/90 p-5 md:p-6 shadow-2xs font-sans space-y-4 scroll-mt-24">
      <div className="flex items-center justify-between border-b border-dashed border-slate-200 pb-3">
        <h2 className="font-sans text-xl font-extrabold text-ink tracking-tight">Frequently Asked Questions</h2>
        <CopySectionLink sectionId={sectionId} label="Copy FAQ Link" variant="badge" />
      </div>

      <Accordion>
        {faqs.map((faq, idx) => {
          const faqId = `faq-${idx + 1}`;
          return (
            <div key={faq.question} id={faqId} className="group relative scroll-mt-24">
              <AccordionItem title={faq.question}>
                <div className="pt-1 pb-2 space-y-3">
                  <p className="text-xs md:text-sm text-ink-700 leading-relaxed font-medium">{faq.answer}</p>
                  <div className="flex justify-end pt-1">
                    <CopySectionLink sectionId={faqId} label="Copy Answer Link" variant="badge" />
                  </div>
                </div>
              </AccordionItem>
            </div>
          );
        })}
      </Accordion>
    </div>
  );
}

