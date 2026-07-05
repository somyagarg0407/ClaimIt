import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Generic styled <select>. Kept as a plain native element (not a custom
 * listbox) so it stays keyboard- and screen-reader-accessible for free.
 * Used by FilterPanel today; reusable for any future form (Eligibility
 * questionnaire, Register, Profile settings, etc).
 */
const Select = forwardRef(({ className, label, options = [], ...props }, ref) => {
  return (
    <label className="flex flex-col gap-1.5">
      {label && <span className="text-xs font-medium text-gray-500">{label}</span>}
      <span className="relative flex items-center">
        <select
          ref={ref}
          className={cn(
            "h-11 w-full appearance-none rounded-xl border border-gray-200 bg-white pl-3.5 pr-9 text-sm font-medium text-ink transition-colors duration-200 hover:border-brand-300 focus:border-brand-400 focus:outline-none",
            className
          )}
          {...props}
        >
          {options.map((opt) => {
            const value = typeof opt === "string" ? opt : opt.value;
            const label = typeof opt === "string" ? opt : opt.label;
            return (
              <option key={value} value={value}>
                {label}
              </option>
            );
          })}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-gray-400" strokeWidth={2} />
      </span>
    </label>
  );
});
Select.displayName = "Select";

export { Select };
