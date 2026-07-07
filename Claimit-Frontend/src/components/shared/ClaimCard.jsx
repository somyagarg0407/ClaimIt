import { Link } from "react-router-dom";
import {
  AlertCircle,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Clock,
  Eye,
  FileEdit,
  Sparkles,
  XCircle,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressSteps } from "@/components/ui/ProgressSteps";
import { cn } from "@/lib/utils";

const STAGES = [
  "Application Submitted",
  "Documents Verified",
  "Department Review",
  "Approved",
  "Benefit Released",
];

// Every status stays within the existing blue/black/gray palette — badge
// variant + icon shape carry the meaning instead of red/green/yellow.
const STATUS_META = {
  Draft: { badgeVariant: "outline", icon: FileEdit, stageIndex: null },
  Submitted: { badgeVariant: "soft", icon: Clock, stageIndex: 0 },
  "Documents Required": { badgeVariant: "outline", icon: AlertCircle, stageIndex: 1 },
  "Under Review": { badgeVariant: "soft", icon: Eye, stageIndex: 2 },
  Approved: { badgeVariant: "solid", icon: CheckCircle2, stageIndex: 3 },
  Rejected: { badgeVariant: "outline", icon: XCircle, stageIndex: null },
  Completed: { badgeVariant: "solid", icon: BadgeCheck, stageIndex: 4 },
};

function ClaimCard({
  slug,
  icon: Icon,
  title,
  status,
  matchPercent,
  appliedLabel,
  updatedLabel,
  processingTime,
  nextAction,
}) {
  const meta = STATUS_META[status] ?? STATUS_META.Submitted;
  const StatusIcon = meta.icon;
  const showProgress = meta.stageIndex !== null;
  const showContinue = status === "Draft" || status === "Documents Required";

  return (
    <Card hover className="flex flex-col gap-5 p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
            <Icon className="h-5 w-5" strokeWidth={2} />
          </div>
          <div className="flex flex-col gap-1 pt-0.5">
            <h3 className="font-display text-base font-semibold leading-snug text-ink">{title}</h3>
            <span className="text-xs font-medium text-gray-400">
              {status === "Draft" ? `Started ${appliedLabel}` : `Applied ${appliedLabel} · Updated ${updatedLabel}`}
            </span>
          </div>
        </div>

        <Badge variant={meta.badgeVariant} size="sm" className="shrink-0">
          <StatusIcon className="h-3 w-3" strokeWidth={2} />
          {status}
        </Badge>
      </div>

      {showProgress && <ProgressSteps steps={STAGES} current={meta.stageIndex} />}

      <div className="flex items-start gap-2 rounded-xl bg-brand-25/60 p-3">
        <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-700" strokeWidth={2} />
        <p className="text-xs leading-relaxed text-brand-800">{nextAction}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 rounded-xl bg-gray-50/70 p-3.5">
        <Stat label="AI Match" value={`${matchPercent}%`} highlight />
        <Stat label="Processing" value={processingTime} />
      </div>

      <div className="flex gap-3">
        {showContinue && (
          <Button as={Link} to={`/schemes/${slug}`} className="flex-1">
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
        <Button as={Link} to={`/schemes/${slug}`} variant="secondary" className="flex-1">
          View Details
        </Button>
      </div>
    </Card>
  );
}

function Stat({ label, value, highlight = false }) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <span className={cn("tabular-mono text-[0.8125rem] font-semibold", highlight ? "text-brand-700" : "text-ink")}>
        {value}
      </span>
      <span className="text-[11px] font-medium text-gray-400">{label}</span>
    </div>
  );
}

export { ClaimCard, STATUS_META };
