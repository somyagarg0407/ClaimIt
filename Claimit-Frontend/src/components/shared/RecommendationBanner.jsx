import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ScoreRing } from "@/components/shared/ScoreRing";

/**
 * Surfaces the AI match summary above the results grid. Reuses ScoreRing —
 * ClaimIt's signature "confidence" motif — so this reads as the same
 * product as the Home hero, just one level deeper.
 */
function RecommendationBanner({ matchCount = 0, profileScore = 82, onImprove }) {
  return (
    <div className="flex flex-col items-start gap-5 rounded-2xl border border-brand-100 bg-brand-25/60 p-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <ScoreRing value={profileScore} size={56} strokeWidth={5} />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-sm font-semibold text-brand-800">
            <Sparkles className="h-4 w-4" strokeWidth={2} />
            AI Match
          </div>
          <p className="text-[0.9375rem] font-medium text-ink">
            We found{" "}
            <span className="tabular-mono font-semibold">{matchCount}</span>{" "}
            schemes matching your profile.
          </p>
          <p className="text-sm text-gray-500">Based on your income, location and occupation.</p>
        </div>
      </div>

      <Button variant="secondary" size="sm" onClick={onImprove} className="shrink-0">
        Improve Match
        <ArrowRight className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}

export { RecommendationBanner };
