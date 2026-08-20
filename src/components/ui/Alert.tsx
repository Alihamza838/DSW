import React from "react";
import { AlertTriangle, ShieldAlert, Info, CheckCircle2, Bell, X } from "lucide-react";

export interface AlertProps {
  variant?: "critical" | "warning" | "info" | "success" | "policy";
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  onClose?: () => void;
  className?: string;
  children?: React.ReactNode;
  compact?: boolean;
  badgeText?: string;
}

export function Alert({
  variant = "policy",
  title,
  description,
  icon,
  action,
  onClose,
  className = "",
  children,
  compact = false,
  badgeText,
}: AlertProps) {
  const [dismissed, setDismissed] = React.useState(false);

  if (dismissed) return null;

  const styles = {
    critical: {
      wrapper: "bg-gradient-to-r from-rose-500/10 via-rose-100/40 to-rose-500/10 border-rose-300 text-rose-950 shadow-xs",
      badge: "bg-rose-700 text-white font-mono",
      pulse: "bg-rose-500",
      defaultIcon: <ShieldAlert className="h-4 w-4 text-rose-600 shrink-0" />,
      defaultBadge: "CRITICAL ALERT 2026",
    },
    warning: {
      wrapper: "bg-gradient-to-r from-amber-500/10 via-amber-100/50 to-amber-500/10 border-amber-300 text-amber-950 shadow-xs",
      badge: "bg-amber-800 text-white font-mono",
      pulse: "bg-amber-500",
      defaultIcon: <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0" />,
      defaultBadge: "POLICY WARNING",
    },
    policy: {
      wrapper: "bg-gradient-to-r from-teal-900/10 via-amber-500/10 to-teal-900/10 border-amber-300/90 text-slate-900 shadow-xs backdrop-blur-xs",
      badge: "bg-slate-900 text-teal-light font-mono border border-slate-700",
      pulse: "bg-amber-500",
      defaultIcon: <Bell className="h-4 w-4 text-amber-700 shrink-0" />,
      defaultBadge: "POLICY WATCH 2026",
    },
    info: {
      wrapper: "bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-teal-500/40 text-slate-100 shadow-md",
      badge: "bg-teal-500 text-slate-950 font-mono font-bold",
      pulse: "bg-teal-400",
      defaultIcon: <Info className="h-4 w-4 text-teal-400 shrink-0" />,
      defaultBadge: "VERIFIED AUDIT",
    },
    success: {
      wrapper: "bg-gradient-to-r from-emerald-500/10 via-emerald-100/50 to-emerald-500/10 border-emerald-300 text-emerald-950 shadow-xs",
      badge: "bg-emerald-700 text-white font-mono",
      pulse: "bg-emerald-500",
      defaultIcon: <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />,
      defaultBadge: "VERIFIED GUARANTEE",
    },
  };

  const selectedStyle = styles[variant] || styles.policy;
  const displayBadgeText = badgeText || selectedStyle.defaultBadge;

  const handleClose = () => {
    setDismissed(true);
    if (onClose) onClose();
  };

  return (
    <div
      className={`relative rounded-2xl border p-3.5 sm:p-4 font-sans transition-all duration-300 ${selectedStyle.wrapper} ${className}`}
      role="alert"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {/* Animated Glowing Pulse Light */}
          <div className="relative shrink-0 mt-1">
            <span className="flex h-2.5 w-2.5 relative">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${selectedStyle.pulse}`} />
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${selectedStyle.pulse}`} />
            </span>
          </div>

          <div className="space-y-1 flex-1 min-w-0">
            {(title || displayBadgeText) && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider shadow-2xs ${selectedStyle.badge}`}>
                  {displayBadgeText}
                </span>
                {title && (
                  <h4 className="font-extrabold text-xs sm:text-sm tracking-tight leading-snug">
                    {title}
                  </h4>
                )}
              </div>
            )}
            {description && (
              <div className={`text-xs leading-relaxed font-medium opacity-90 ${compact ? "line-clamp-2 text-[11px]" : ""}`}>
                {description}
              </div>
            )}
            {children}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-start">
          {action && <div className="pl-1">{action}</div>}
          {onClose && (
            <button
              onClick={handleClose}
              className="p-1 rounded-lg hover:bg-black/10 transition-colors text-slate-500 hover:text-slate-900 cursor-pointer"
              aria-label="Dismiss Alert"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
