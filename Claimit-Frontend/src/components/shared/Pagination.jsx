import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Pill-style pagination. Generic (page/totalPages/onChange) so it can sit
 * under any future paginated list, not just Discover's results grid.
 */
function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-2">
      <button
        type="button"
        aria-label="Previous page"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors duration-200 hover:border-brand-300 hover:text-brand-700 disabled:pointer-events-none disabled:opacity-40 dark:border-white/[0.08] dark:text-[#8A8A8A] dark:hover:border-brand-500/40 dark:hover:text-brand-400"
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={2} />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          type="button"
          aria-label={`Go to page ${p}`}
          aria-current={p === page ? "page" : undefined}
          onClick={() => onChange(p)}
          className={cn(
            "tabular-mono flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors duration-200",
            p === page
              ? "bg-brand-800 text-white shadow-soft"
              : "text-gray-500 hover:bg-brand-25 hover:text-brand-700 dark:text-[#8A8A8A] dark:hover:bg-brand-600/10 dark:hover:text-brand-400"
          )}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        aria-label="Next page"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors duration-200 hover:border-brand-300 hover:text-brand-700 disabled:pointer-events-none disabled:opacity-40 dark:border-white/[0.08] dark:text-[#8A8A8A] dark:hover:border-brand-500/40 dark:hover:text-brand-400"
      >
        <ChevronRight className="h-4 w-4" strokeWidth={2} />
      </button>
    </nav>
  );
}

export { Pagination };
