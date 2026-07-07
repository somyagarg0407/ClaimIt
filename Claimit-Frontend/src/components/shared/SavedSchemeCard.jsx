import { Sparkles, X, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

/**
 * A single saved scheme in the user's personal collection. Distinct from
 * shared/SchemeCard (landing page teaser) and shared/SchemeResultCard
 * (Discover results) — this one needs a remove action, a saved date, and a
 * short "why we recommended it" note that don't belong on either of those.
 * Shares the same visual language (Card primitive, brand-50 icon tile,
 * tabular-mono numerics, soft stat tray) so it still reads as one product.
 */
function matchTier(matchPercent) {
  if (matchPercent >= 85) return "Strong Match";
  if (matchPercent >= 65) return "Good Match";
  return "Limited Match";
}

function SavedSchemeCard({
  slug,
  icon: Icon,
  title,
  category,
  level,
  description,
  benefit,
  matchPercent,
  savedLabel,
  whyRecommended,
  onRemove,
}) {
  return (
    <Card hover className="flex flex-col gap-5 p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
            <Icon className="h-5 w-5" strokeWidth={2} />
          </div>
          <div className="flex flex-col gap-1.5 pt-0.5">
            <div className="flex flex-wrap items-center gap-1.5">
              <Badge variant="outline" size="sm">
                {category}
              </Badge>
              <Badge variant="outline" size="sm">
                {level}
              </Badge>
            </div>
            <h3 className="font-display text-base font-semibold leading-snug text-ink">{title}</h3>
          </div>
        </div>

        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove from saved schemes"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-100 text-gray-300 transition-colors duration-200 hover:border-gray-200 hover:text-ink"
        >
          <X className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>

      <p className="line-clamp-2 text-sm leading-relaxed text-gray-500">{description}</p>

      {whyRecommended && (
        <div className="flex items-start gap-2 rounded-xl bg-brand-25/60 p-3">
          <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-700" strokeWidth={2} />
          <p className="text-xs leading-relaxed text-brand-800">{whyRecommended}</p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-3 rounded-xl bg-gray-50/70 p-3.5">
        <Stat label="AI Match" value={`${matchPercent}%`} highlight />
        <Stat label="Benefit" value={benefit} />
        <Stat label="Status" value={matchTier(matchPercent)} />
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
        <span className="text-xs font-medium text-gray-400">Saved {savedLabel}</span>
        <Button as={Link} to={`/schemes/${slug}`} variant="secondary" size="sm">
          View Details
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </Card>
  );
}

function Stat({ label, value, highlight = false }) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <span
        className={cn(
          "tabular-mono text-[0.8125rem] font-semibold leading-tight",
          highlight ? "text-brand-700" : "text-ink"
        )}
      >
        {value}
      </span>
      <span className="text-[11px] font-medium text-gray-400">{label}</span>
    </div>
  );
}

export { SavedSchemeCard };
