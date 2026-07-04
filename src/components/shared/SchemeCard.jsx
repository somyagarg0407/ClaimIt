import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/Card";

/**
 * Represents a single government scheme. Used on the landing page's
 * "Popular schemes" grid and reusable on the future Discover / Eligibility
 * pages wherever a scheme needs to be listed.
 */
function SchemeCard({ icon: Icon, name, category, matchPercent, benefit }) {
  return (
    <Card hover className="group relative flex cursor-pointer flex-col gap-5 p-6">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
          <Icon className="h-5 w-5" strokeWidth={2} />
        </div>
        <span className="tabular-mono rounded-full bg-brand-25 px-2.5 py-1 text-xs font-semibold text-brand-700">
          {matchPercent}%
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <h4 className="font-display text-base font-semibold text-ink">{name}</h4>
        <p className="text-sm text-gray-500">{category}</p>
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 pt-4">
        <span className="text-xs font-medium text-gray-400">Est. benefit</span>
        <span className="tabular-mono text-sm font-semibold text-ink">{benefit}</span>
      </div>

      <ArrowUpRight className="absolute right-6 bottom-6 h-4 w-4 text-gray-300 opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-600 group-hover:opacity-100" />
    </Card>
  );
}

export { SchemeCard };
