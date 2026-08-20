import * as React from "react";
import { Printer, FileText, Download, ShieldCheck, CheckCircle2, ExternalLink } from "lucide-react";
import { StoreFrontmatter } from "../../types";
import { getCrawlVerificationDetails } from "../../utils/crawlVerifier";

interface PrintablePolicyDocumentProps {
  store: StoreFrontmatter;
}

export function PrintablePolicyDocument({ store }: PrintablePolicyDocumentProps) {
  const crawlDetails = getCrawlVerificationDetails(store.lastVerified, store.slug, store.brand);
  const printDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      {/* On-Screen Action Button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 bg-slate-900 text-white rounded-2xl shadow-sm print:hidden my-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-teal-600 text-white rounded-xl shrink-0">
            <Printer className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-sm sm:text-base text-white">
                Save {store.brand} Policy Offline
              </span>
              <span className="bg-teal-500/30 text-teal-300 text-[10px] font-mono px-2 py-0.5 rounded-full border border-teal-400/30 font-bold">
                PDF Ready
              </span>
            </div>
            <p className="text-xs text-slate-300 font-sans mt-0.5">
              Print or save a formatted, clean PDF copy of this return policy for receipt dispute proof.
            </p>
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer shrink-0"
        >
          <Download className="h-4 w-4" />
          <span>Print / Save PDF</span>
        </button>
      </div>

      {/* Print-Only Document Layout Header (Visible only when user triggers Ctrl+P / window.print()) */}
      <div className="hidden print:block font-sans text-black p-4 space-y-6 border-b-2 border-slate-900 pb-6 mb-6">
        <div className="flex justify-between items-start border-b border-slate-300 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-slate-900" />
              <span className="font-display font-extrabold text-xl tracking-tight uppercase">
                DSWReturnRefund.com
              </span>
            </div>
            <p className="text-xs text-slate-600 font-mono mt-0.5">
              Verified Retailer Return Policy Reference Document
            </p>
          </div>

          <div className="text-right text-xs font-mono">
            <p><strong>Document ID:</strong> {crawlDetails.verificationHash.slice(0, 22)}</p>
            <p><strong>Printed On:</strong> {printDate}</p>
            <p><strong>Verified Date:</strong> {crawlDetails.formattedDate}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="font-display font-black text-2xl uppercase tracking-tight">
              {store.brand} Return Policy ({store.countryName || store.country || "Global"})
            </h1>
            <span className="border-2 border-slate-900 px-3 py-1 font-mono font-bold text-sm uppercase">
              {store.quickAnswer.returnWindow}
            </span>
          </div>
          <p className="text-xs text-slate-700 italic">
            Directly verified against {store.brand}&apos;s official retailer terms.
          </p>
        </div>

        {/* Core Policy Matrix Table for Print */}
        <table className="w-full text-xs border-collapse border border-slate-400">
          <thead>
            <tr className="bg-slate-100 font-mono text-left">
              <th className="border border-slate-400 p-2">Policy Field</th>
              <th className="border border-slate-400 p-2">Verified Standard Rule</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-400 p-2 font-bold">Standard Return Window</td>
              <td className="border border-slate-400 p-2">{store.quickAnswer.returnWindow}</td>
            </tr>
            <tr>
              <td className="border border-slate-400 p-2 font-bold">Receipt Requirement</td>
              <td className="border border-slate-400 p-2">
                {store.quickAnswer.receiptRequired
                  ? "Receipt / Proof of Purchase Mandatory"
                  : "Receipt Optional - Card/ID Lookup Supported"}
              </td>
            </tr>
            <tr>
              <td className="border border-slate-400 p-2 font-bold">Restocking Fee</td>
              <td className="border border-slate-400 p-2">
                {store.quickAnswer.restockingFee ? "Restocking Fee Applies on Select Items" : "No Restocking Fee ($0)"}
              </td>
            </tr>
            <tr>
              <td className="border border-slate-400 p-2 font-bold">Refund Settlement Method</td>
              <td className="border border-slate-400 p-2">{store.quickAnswer.refundMethod}</td>
            </tr>
            <tr>
              <td className="border border-slate-400 p-2 font-bold">In-Store Returns</td>
              <td className="border border-slate-400 p-2">
                {store.quickAnswer.inStoreReturns ? "Yes - Allowed at any branch" : "Online Only / No physical returns"}
              </td>
            </tr>
            <tr>
              <td className="border border-slate-400 p-2 font-bold">Online Mail Returns</td>
              <td className="border border-slate-400 p-2">
                {store.quickAnswer.onlineReturns ? "Yes - Prepaid or customer label" : "In-store drop-off only"}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Disclaimer Footer */}
        <div className="text-[10px] text-slate-600 space-y-1 pt-2 border-t border-slate-300">
          <p>
            <strong>Official Source URL:</strong> {store.officialPolicyUrl || "https://dswreturnrefund.com/stores/" + store.slug}
          </p>
          <p>
            <em>
              Note: Retailers reserve the right to alter return rules without notice. This document represents verified terms audited on {crawlDetails.formattedDate}.
            </em>
          </p>
        </div>
      </div>
    </div>
  );
}
