import * as React from "react";

interface TopLoadingBarProps {
  isLoading?: boolean;
}

export function TopLoadingBar({ isLoading = true }: TopLoadingBarProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-red-100 overflow-hidden pointer-events-none">
      <div className="h-full bg-gradient-to-r from-red-500 via-rose-400 to-red-600 animate-[geminiLine_1.5s_infinite_linear] origin-left shadow-[0_0_10px_#ef4444]" />
      <style>{`
        @keyframes geminiLine {
          0% {
            transform: translateX(-100%) scaleX(0.2);
          }
          50% {
            transform: translateX(20%) scaleX(0.8);
          }
          100% {
            transform: translateX(120%) scaleX(0.2);
          }
        }
      `}</style>
    </div>
  );
}
