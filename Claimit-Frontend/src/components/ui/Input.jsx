import { forwardRef } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Generic styled text input. Mirrors Select's sizing/border/focus treatment
 * so forms feel like one system. Not auth-specific — reusable for any
 * future form (Register, Profile, Contact, Eligibility questionnaire).
 */
const Input = forwardRef(({ className, label, error, id, ...props }, ref) => {
  const inputId = id || props.name;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-xs font-medium text-gray-500 dark:text-[#8A8A8A]">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={cn(
          "h-11 w-full rounded-xl border border-gray-200 bg-white px-3.5 text-sm font-medium text-ink placeholder:font-normal placeholder:text-gray-400 transition-colors duration-200 hover:border-brand-300 focus:border-brand-400 focus:outline-none",
          "dark:border-white/[0.08] dark:bg-[#111111] dark:text-white dark:placeholder:text-[#8A8A8A] dark:hover:border-brand-500/40 dark:focus:border-brand-500",
          error && "border-ink focus:border-ink dark:border-red-500/50 dark:focus:border-red-500/50",
          className
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <span id={`${inputId}-error`} className="flex items-center gap-1 text-xs font-medium text-ink dark:text-red-400">
          <AlertCircle className="h-3 w-3 shrink-0" strokeWidth={2} />
          {error}
        </span>
      )}
    </div>
  );
});
Input.displayName = "Input";

export { Input };
