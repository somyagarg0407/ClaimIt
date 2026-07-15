import { cn } from "@/lib/utils";

/**
 * Minimal segmented progress indicator for multi-step flows. Generic
 * (steps/current are just props) so it's reusable for any future wizard —
 * not tied to Eligibility's specific fields.
 */
function ProgressSteps({ steps = [], current = 0 }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        {steps.map((label, i) => (
          <span
            key={label}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors duration-300",
              i <= current ? "bg-brand-800" : "bg-gray-100 dark:bg-white/[0.08]"
            )}
          />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-400">
          Step {current + 1} of {steps.length}
        </span>
        <span className="text-xs font-medium text-gray-400 dark:text-[#8A8A8A]">{steps[current]}</span>
      </div>
    </div>
  );
}

export { ProgressSteps };
