import { Search, Mic } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Large search input used at the top of Discover. Kept generic (no scheme
 * knowledge inside) so it can be reused wherever the product needs a
 * prominent search moment.
 */
function SearchBar({
  value,
  onChange,
  placeholder = "Search schemes, scholarships, pensions...",
  className,
}) {
  return (
    <div
      className={cn(
        "flex h-14 items-center gap-3 rounded-2xl border border-gray-200 bg-white px-5 shadow-soft transition-colors duration-200 focus-within:border-brand-400 focus-within:shadow-card",
        "dark:border-white/[0.08] dark:bg-[#111111] dark:shadow-soft-dark dark:focus-within:border-brand-500",
        className
      )}
    >
      <Search className="h-5 w-5 shrink-0 text-gray-400 dark:text-[#8A8A8A]" strokeWidth={2} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        aria-label="Search schemes, scholarships and pensions"
        className="h-full flex-1 bg-transparent text-[0.9375rem] text-ink placeholder:text-gray-400 focus:outline-none dark:text-white dark:placeholder:text-[#8A8A8A]"
      />
      <button
        type="button"
        aria-label="Search by voice"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-400 transition-colors duration-200 hover:bg-brand-25 hover:text-brand-600 dark:text-[#8A8A8A] dark:hover:bg-brand-600/10 dark:hover:text-brand-400"
      >
        <Mic className="h-[18px] w-[18px]" strokeWidth={2} />
      </button>
    </div>
  );
}

export { SearchBar };
