import { forwardRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Accessible toggle switch built on a real checkbox input (so it's keyboard
 * and screen-reader friendly for free) with a styled track/thumb overlay.
 * Generic — no Settings-specific knowledge — so it's reusable anywhere a
 * future page needs an on/off control.
 */
const Switch = forwardRef(({ className, label, description, checked, onChange, id, ...props }, ref) => {
  const switchId = id || props.name;

  return (
    <label htmlFor={switchId} className="flex cursor-pointer items-center justify-between gap-4">
      {(label || description) && (
        <span className="flex flex-col gap-0.5">
          {label && <span className="text-sm font-medium text-ink dark:text-white">{label}</span>}
          {description && <span className="text-xs text-gray-500 dark:text-[#8A8A8A]">{description}</span>}
        </span>
      )}
      <span className="relative inline-flex h-6 w-11 shrink-0 items-center">
        <input
          ref={ref}
          id={switchId}
          type="checkbox"
          role="switch"
          checked={checked}
          onChange={onChange}
          className="peer sr-only"
          {...props}
        />
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 rounded-full bg-gray-200 transition-colors duration-200 peer-checked:bg-brand-800 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-400",
            "dark:bg-white/10 dark:peer-checked:bg-brand-600",
            className
          )}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none relative inline-block translate-x-1 rounded-full bg-white shadow-soft transition-transform duration-200 peer-checked:translate-x-6 dark:shadow-none"
          style={{ height: "1.125rem", width: "1.125rem" }}
        />
      </span>
    </label>
  );
});
Switch.displayName = "Switch";

export { Switch };
