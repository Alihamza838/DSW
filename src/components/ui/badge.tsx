import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all select-none",
  {
    variants: {
      variant: {
        default: "border-ink-100 bg-ink-50 text-ink",
        outline: "border-ink-100 bg-white text-ink",
        yes: "border-transparent bg-signal-yes-bg text-signal-yes font-semibold shadow-xs",
        no: "border-transparent bg-signal-no-bg text-signal-no font-semibold shadow-xs",
        warning: "border-transparent bg-signal-warn-bg text-signal-warn font-semibold shadow-xs",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "yes" | "no" | "warning" | null;
  children?: React.ReactNode;
  className?: string;
  title?: string;
  key?: string | number | null;
}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
