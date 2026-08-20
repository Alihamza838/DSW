import * as React from "react";
import { Link } from "../ui/Link";

interface ReceiptLossHackWidgetProps {
  brand: string;
}

export function ReceiptLossHackWidget({ brand }: ReceiptLossHackWidgetProps) {
  const isTarget = brand.toLowerCase().includes("target");
  return (
    <div className="bg-paper-muted/30 border border-ink-100 rounded-lg p-5 space-y-4">
      <h4 className="font-display text-base font-bold text-ink">Receipt Loss Hacks</h4>
      <p className="text-xs text-ink-600 leading-relaxed">
        If you lost your purchase receipt, try returning items on standard {brand} private brands, which often carry
        generous {isTarget ? "365-day" : "extended"} windows.
      </p>
      <Link href="/blog/store-credit-vs-refund-explained" className="text-xs text-teal-brand font-semibold hover:underline block">
        Learn how store credit works →
      </Link>
    </div>
  );
}
