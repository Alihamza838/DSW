import * as React from "react";
import { Mic, MicOff, Loader2 } from "lucide-react";
import { useVoiceSearch } from "../../hooks/useVoiceSearch";
import { cn } from "../../lib/utils";

interface VoiceSearchButtonProps {
  onSearchQuery: (query: string) => void;
  className?: string;
  size?: "sm" | "md";
}

export function VoiceSearchButton({ onSearchQuery, className, size = "md" }: VoiceSearchButtonProps) {
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const handleSpeechResult = React.useCallback((transcript: string) => {
    if (transcript) {
      onSearchQuery(transcript);
      setToastMessage(`Recognized: "${transcript}"`);
      setTimeout(() => setToastMessage(null), 3500);
    }
  }, [onSearchQuery]);

  const handleSpeechError = React.useCallback((err: string) => {
    setToastMessage(err);
    setTimeout(() => setToastMessage(null), 4000);
  }, []);

  const { isListening, speechSupported, interimTranscript, toggleListening } = useVoiceSearch({
    onResult: handleSpeechResult,
    onError: handleSpeechError,
  });

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onClick={toggleListening}
        title={
          !speechSupported
            ? "Voice search is not supported by your browser"
            : isListening
            ? "Listening... Click to stop"
            : "Click to search store policy by voice"
        }
        className={cn(
          "relative inline-flex items-center justify-center rounded-xl transition-all duration-200 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-teal-brand/40",
          size === "sm" ? "p-1.5 h-7 w-7 text-xs" : "p-2 h-9 w-9 text-sm",
          isListening
            ? "bg-rose-500 text-white shadow-md shadow-rose-500/30 animate-pulse"
            : speechSupported
            ? "bg-teal-brand/10 text-teal-brand hover:bg-teal-brand hover:text-white"
            : "bg-slate-100 text-slate-400 cursor-not-allowed",
          className
        )}
      >
        {isListening ? (
          <Mic className={cn("animate-bounce shrink-0", size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4")} />
        ) : speechSupported ? (
          <Mic className={cn("shrink-0", size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4")} />
        ) : (
          <MicOff className={cn("shrink-0 opacity-60", size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4")} />
        )}

        {/* Pulsing Ripple Effect when Listening */}
        {isListening && (
          <span className="absolute -inset-1 rounded-xl bg-rose-500/20 animate-ping pointer-events-none" />
        )}
      </button>

      {/* Listening status popup / Live Speech Tooltip */}
      {(isListening || toastMessage) && (
        <div className="absolute right-0 top-full mt-2 z-50 min-w-[200px] max-w-[280px] p-2.5 rounded-xl bg-ink text-white shadow-2xl border border-slate-700 text-xs font-sans animate-fade-in pointer-events-none">
          {isListening ? (
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
              <span className="font-bold text-rose-300">Listening...</span>
              <span className="text-slate-300 text-[11px] truncate">
                {interimTranscript || 'Speak store name (e.g. "Target return policy")'}
              </span>
            </div>
          ) : (
            <div className="text-emerald-300 font-medium text-[11px]">
              {toastMessage}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
