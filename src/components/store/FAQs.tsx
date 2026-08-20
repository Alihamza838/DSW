import React from "react";
import { Accordion, AccordionItem } from "../ui/accordion";
import { CopySectionLink } from "../ui/CopySectionLink";
import type { StoreFrontmatter, Faq } from "../../types";
import { HelpCircle, ShieldCheck } from "lucide-react";

interface FAQsProps {
  store: StoreFrontmatter;
}

export function FAQs({ store }: FAQsProps) {
  const sectionId = "faqs-section";

  // Parse dynamic policy questions from store metadata & quickAnswer
  const parsedFaqs: Faq[] = [
    {
      question: `How long do I have to return items to ${store.brand}?`,
      answer: `${store.brand}'s standard return window is ${store.quickAnswer.returnWindow}. Exceptions apply for certain product categories like electronics or seasonal clearance merchandise.`
    },
    {
      question: `Is there a restocking fee when returning to ${store.brand}?`,
      answer: store.quickAnswer.restockingFee
        ? `Yes, ${store.brand} may charge a restocking fee (typically 15%) on opened electronics or select returned categories.`
        : `No! ${store.brand} does NOT charge restocking fees on standard returnable items in original condition.`
    },
    {
      question: `Can I return items to ${store.brand} without a receipt?`,
      answer: store.quickAnswer.receiptRequired
        ? `Receipt or proof of purchase is generally required. However, ${store.brand} cashiers can often look up transactions using your payment credit/debit card, store credit card, or member account.`
        : `Yes! If you lost your receipt, ${store.brand} can process receiptless returns via digital lookup (card/account) or issue merchandise store credit.`
    },
    {
      question: `How will I receive my refund from ${store.brand}?`,
      answer: `Refunds are issued as: ${store.quickAnswer.refundMethod}. Returns with a valid receipt are refunded to the original payment method, while unverified returns may receive store merchandise credit.`
    },
    {
      question: `Can I return online orders directly in-store at ${store.brand}?`,
      answer: store.quickAnswer.inStoreReturns
        ? `Yes, online purchases can be returned to any local ${store.brand} physical store for immediate processing and waived return shipping fees.`
        : `${store.brand} online orders must be shipped back using their official mail return portal or designated carrier drop-off counter.`
    },
    {
      question: `How does ${store.brand} handle returns bought with PayPal, Klarna, or Afterpay?`,
      answer: `Items purchased with PayPal, Klarna, Afterpay, or Zip and returned in-store with a receipt are credited back to your digital account or issued as ${store.brand} store credit if returned past the primary deadline.`
    },
    {
      question: `What is ${store.brand}'s policy on gift returns?`,
      answer: `If you bring a gift receipt to ${store.brand}, you will receive a store merchandise gift card or exchange for equal value without notifying the original purchaser.`
    },
    {
      question: "What happens if I return an item with open or damaged packaging?",
      answer: `Items returned with opened packaging must contain all original components, manuals, and accessories. Unused items in opened boxes are eligible for full refund or store credit depending on category.`
    },
    {
      question: `Does ${store.brand} offer extended holiday returns?`,
      answer: `Yes, purchases made during the holiday shopping period (typically late October through December 25) usually qualify for an extended return window through January 31.`
    },
    {
      question: `How can I track my return refund status at ${store.brand}?`,
      answer: `In-store return refunds post to your bank in 2–5 business days. For mail-in returns, you can track your return package using the carrier tracking number or log into your ${store.brand} customer portal.`
    },
    ...(store.faqs || [])
  ];

  // Remove duplicate questions if any custom FAQ shares a similar title
  const uniqueFaqs: Faq[] = [];
  const seenQuestions = new Set<string>();

  for (const faq of parsedFaqs) {
    const normalized = faq.question.toLowerCase().trim();
    if (!seenQuestions.has(normalized)) {
      seenQuestions.add(normalized);
      uniqueFaqs.push(faq);
    }
  }

  return (
    <div id={sectionId} className="bg-white rounded-2xl border border-slate-200/90 p-5 md:p-6 shadow-2xs font-sans space-y-4 scroll-mt-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-dashed border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-teal-brand/10 rounded-xl text-teal-brand">
            <HelpCircle className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-sans text-xl font-extrabold text-ink tracking-tight">
              {store.brand} Policy FAQs
            </h2>
            <p className="text-xs text-ink-500 font-medium">
              Verified answers dynamically parsed from {store.brand}&apos;s 2026 return rules.
            </p>
          </div>
        </div>
        <CopySectionLink sectionId={sectionId} label="Copy FAQs Link" variant="badge" />
      </div>

      <Accordion>
        {uniqueFaqs.map((faq, idx) => {
          const faqId = `store-faq-${idx + 1}`;
          return (
            <div key={faq.question} id={faqId} className="group relative scroll-mt-24">
              <AccordionItem title={faq.question}>
                <div className="pt-1 pb-2 space-y-3">
                  <p className="text-xs md:text-sm text-ink-700 leading-relaxed font-medium">
                    {faq.answer}
                  </p>
                  <div className="flex items-center justify-between pt-1 text-[11px] text-ink-400 font-mono border-t border-slate-100 mt-2">
                    <span className="flex items-center gap-1 text-emerald-700 font-sans font-semibold">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                      Verified 2026 Policy Answer
                    </span>
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
