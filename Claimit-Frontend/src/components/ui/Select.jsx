import { forwardRef } from "react";
import { AlertCircle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Generic styled <select>. Kept as a plain native element (not a custom
 * listbox) so it stays keyboard- and screen-reader-accessible for free.
 * Used by FilterPanel and the Eligibility form; reusable for any future
 * form (Register, Profile settings, etc).
 */
const Select = forwardRef(({ className, label, error, id, options = [], ...props }, ref) => {
  const selectId = id || props.name;

  return (
    <label htmlFor={selectId} className="flex flex-col gap-1.5">
      {label && <span className="text-xs font-medium text-gray-500">{label}</span>}
      <span className="relative flex items-center">
        <select
          ref={ref}
          id={selectId}
          className={cn(
            "h-11 w-full appearance-none rounded-xl border border-gray-200 bg-white pl-3.5 pr-9 text-sm font-medium text-ink transition-colors duration-200 hover:border-brand-300 focus:border-brand-400 focus:outline-none",
            error && "border-ink focus:border-ink",
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${selectId}-error` : undefined}
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
      {error && (
        <span id={`${selectId}-error`} className="flex items-center gap-1 text-xs font-medium text-ink">
          <AlertCircle className="h-3 w-3 shrink-0" strokeWidth={2} />
          {error}
        </span>
      )}
    </label>
  );
});
Select.displayName = "Select";

export { Select };
