import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Generic single-open accordion. Takes items as { question, answer } but
 * really just renders a trigger + collapsible body — reusable for any
 * future FAQ-shaped content (Help page, policy details, etc).
 */
function Accordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="flex flex-col divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white dark:divide-white/[0.06] dark:border-white/[0.06] dark:bg-[#0A0A0A]">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[0.9375rem] font-medium text-ink transition-colors duration-200 hover:text-brand-700 dark:text-white dark:hover:text-brand-400"
            >
              {item.question}
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 dark:text-[#8A8A8A]",
                  isOpen && "rotate-180 text-brand-600 dark:text-brand-400"
                )}
                strokeWidth={2}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-4 text-sm leading-relaxed text-gray-500 dark:text-[#B5B5B5]">{item.answer}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export { Accordion };
