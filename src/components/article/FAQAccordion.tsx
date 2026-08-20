import React from "react";
import { FaqAccordion as BaseFaqAccordion } from "../store/FaqAccordion";
import type { FAQItem } from "../../types/article";

interface FAQAccordionProps {
  faqs: FAQItem[];
  title?: string;
  className?: string;
}

export function FAQAccordion({ faqs, className = "" }: FAQAccordionProps) {
  if (!faqs || faqs.length === 0) return null;

  const mappedFaqs = faqs.map((f) => ({
    question: f.q,
    answer: f.a,
  }));

  return (
    <div className={`my-8 ${className}`}>
      <BaseFaqAccordion faqs={mappedFaqs} />
    </div>
  );
}
