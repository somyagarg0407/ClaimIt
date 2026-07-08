import {
  AlertCircle,
  Bell,
  CheckCircle2,
  Clock,
  Megaphone,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Every type stays within the existing blue/black/gray palette — icon
// shape carries the meaning, not color.
const TYPE_META = {
  scheme_recommendation: { icon: Sparkles, label: "New Match" },
  claim_approved: { icon: CheckCircle2, label: "Claim Approved" },
  claim_updated: { icon: Clock, label: "Claim Updated" },
  documents_required: { icon: AlertCircle, label: "Action Needed" },
  eligibility_reminder: { icon: Bell, label: "Reminder" },
  platform_update: { icon: Megaphone, label: "Update" },
};

/**
 * A single notification row. Read/unread is conveyed with a dot + subtle
 * background tint rather than a color change, staying on-palette.
 */
function NotificationItem({ type, title, description, timeLabel, read, onClick }) {
  const meta = TYPE_META[type] ?? TYPE_META.platform_update;
  const Icon = meta.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-start gap-3.5 rounded-2xl border border-gray-100 p-4 text-left transition-colors duration-200 hover:border-brand-200/70 hover:bg-brand-25/40 sm:p-5",
        !read && "bg-brand-25/50"
      )}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
        <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
      </span>

      <span className="flex flex-1 flex-col gap-1">
        <span className="flex items-center gap-2">
          <span className="text-sm font-semibold text-ink">{title}</span>
          {!read && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" aria-hidden="true" />}
        </span>
        <span className="text-sm leading-relaxed text-gray-500">{description}</span>
        <span className="text-xs font-medium text-gray-400">{timeLabel}</span>
      </span>
    </button>
  );
}

export { NotificationItem, TYPE_META };
