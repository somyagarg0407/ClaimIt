import { useState } from "react";
import { Link } from "react-router-dom";
import { Bookmark, ArrowRight, Clock, FileText } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

/**
 * The Discover results card. This is intentionally a separate component
 * from shared/SchemeCard (the lighter teaser card used in the landing
 * page's "Popular Schemes" grid) — Discover needs more data per card
 * (processing time, document count, bookmarking) and overloading the
 * landing-page card with those props would compromise its simplicity there.
 * Both share the same visual language (Card primitive, brand-50 icon tile,
 * tabular-mono numerics, hover lift).
 */
function SchemeResultCard({
  slug,
  icon: Icon,
  title,
  category,
  description,
  benefit,
  matchPercent,
  processingTime,
  documentsCount,
}) {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <Card hover className="flex flex-col gap-5 p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-600/10 dark:text-brand-400">
            <Icon className="h-5 w-5" strokeWidth={2} />
          </div>
          <div className="flex flex-col gap-1.5 pt-0.5">
            <Badge variant="outline" size="sm" className="w-fit">
              {category}
            </Badge>
            <h3 className="font-display text-base font-semibold leading-snug text-ink dark:text-white">{title}</h3>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setBookmarked((v) => !v)}
          aria-label={bookmarked ? "Remove bookmark" : "Bookmark this scheme"}
          aria-pressed={bookmarked}
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-200",
            bookmarked
              ? "border-brand-200 bg-brand-50 text-brand-700 dark:border-brand-600/30 dark:bg-brand-600/10 dark:text-brand-400"
              : "border-gray-100 text-gray-300 hover:border-brand-200 hover:text-brand-600 dark:border-white/[0.06] dark:text-white/20 dark:hover:border-brand-500/30 dark:hover:text-brand-400"
          )}
        >
          <Bookmark className="h-4 w-4" strokeWidth={2} fill={bookmarked ? "currentColor" : "none"} />
        </button>
      </div>

      <p className="line-clamp-2 text-sm leading-relaxed text-gray-500 dark:text-[#B5B5B5]">{description}</p>

      <div className="grid grid-cols-2 gap-3 rounded-xl bg-gray-50/70 p-3.5 sm:grid-cols-4 dark:bg-white/[0.04]">
        <Stat label="Match" value={`${matchPercent}%`} highlight />
        <Stat label="Benefit" value={benefit} />
        <Stat label="Processing" value={processingTime} icon={Clock} />
        <Stat label="Documents" value={`${documentsCount} docs`} icon={FileText} />
      </div>

      <Button as={Link} to={`/schemes/${slug}`} variant="secondary" className="w-full">
        View Details
        <ArrowRight className="h-4 w-4" />
      </Button>
    </Card>
  );
}

function Stat({ label, value, icon: Icon, highlight = false }) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <span className={cn("tabular-mono text-sm font-semibold", highlight ? "text-brand-700 dark:text-brand-400" : "text-ink dark:text-white")}>
        {value}
      </span>
      <span className="flex items-center gap-1 text-[11px] font-medium text-gray-400 dark:text-[#8A8A8A]">
        {Icon && <Icon className="h-3 w-3" strokeWidth={2} />}
        {label}
      </span>
    </div>
  );
}

export { SchemeResultCard };
