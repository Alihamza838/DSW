import * as React from "react";
import { ShieldCheck, X } from "lucide-react";
import { Button } from "./button";

export function CookieBanner() {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setShow(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookie_consent", "rejected");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 p-4 bg-ink text-paper rounded-xl shadow-2xl border border-ink-400 flex flex-col gap-3 font-sans text-xs animate-in slide-in-from-bottom-5">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 text-teal-light font-display font-bold text-sm">
          <ShieldCheck className="h-4 w-4 shrink-0 text-teal-brand" />
          <span>Cookie & Privacy Consent</span>
        </div>
        <button
          onClick={handleReject}
          className="text-paper-muted hover:text-white p-1 rounded transition-colors"
          aria-label="Close cookie banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <p className="text-paper-muted leading-relaxed">
        We use essential cookies and anonymous analytics to improve policy search and ensure accurate guidelines. Read our{" "}
        <a href="/privacy" className="underline text-teal-light hover:text-white">
          Privacy Policy
        </a>{" "}
        and FTC affiliate disclosure.
      </p>
      <div className="flex items-center gap-2 pt-1">
        <Button variant="teal" size="sm" onClick={handleAccept} className="w-full text-xs font-bold py-1.5">
          Accept All
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleReject}
          className="w-full text-xs font-medium py-1.5 border-paper-muted/30 text-paper hover:bg-paper-muted/10"
        >
          Reject Non-Essential
        </Button>
      </div>
    </div>
  );
}
