import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { Badge } from "../ui/badge";
import type { PolicyBadge } from "../../types";

const ICONS = {
  yes: CheckCircle2,
  no: XCircle,
  warning: AlertTriangle,
} as const;

export function PolicyBadgeRow({ badges }: { badges: PolicyBadge[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((b) => {
        const Icon = ICONS[b.status];
        return (
          <Badge key={b.label} variant={b.status} title={b.note}>
            <Icon className="h-3.5 w-3.5 shrink-0" />
            <span>{b.label}</span>
          </Badge>
        );
      })}
    </div>
  );
}
