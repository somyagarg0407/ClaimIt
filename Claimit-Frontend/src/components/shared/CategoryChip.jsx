import { cn } from "@/lib/utils";

/**
 * A single quick-filter chip. Purely presentational + a click handler —
 * the parent owns which chip is active, so this is reusable anywhere a
 * horizontal category strip is needed.
 */
function CategoryChip({ label, icon: Icon, active = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
        active
          ? "border-brand-800 bg-brand-800 text-white shadow-soft"
          : "border-gray-200 bg-white text-gray-600 hover:border-brand-300 hover:bg-brand-25 hover:text-brand-700 dark:border-white/[0.08] dark:bg-transparent dark:text-[#B5B5B5] dark:hover:border-brand-500/40 dark:hover:bg-brand-600/10 dark:hover:text-brand-400"
      )}
    >
      {Icon && <Icon className="h-3.5 w-3.5" strokeWidth={2} />}
      {label}
    </button>
  );
}

export { CategoryChip };
