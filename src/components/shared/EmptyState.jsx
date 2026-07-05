import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/Button";

/**
 * Generic empty state. Not Discover-specific — the icon/copy/action are
 * all props, so this is reusable for My Claims, bookmarks, or any other
 * list that can come up empty.
 */
function EmptyState({
  icon: Icon = SearchX,
  title = "No schemes found",
  description = "Try adjusting your search or filters to see more results.",
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center gap-5 rounded-2xl border border-dashed border-gray-200 px-6 py-20 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
        <Icon className="h-6 w-6" strokeWidth={2} />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
        <p className="max-w-sm text-[0.9375rem] leading-relaxed text-gray-500">{description}</p>
      </div>
      {actionLabel && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export { EmptyState };
