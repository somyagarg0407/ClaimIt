import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full text-xs font-semibold tracking-wide",
  {
    variants: {
      variant: {
        soft:    "bg-brand-50 text-brand-800 border border-brand-100 dark:bg-brand-600/10 dark:text-brand-400 dark:border-brand-600/20",
        outline: "border border-gray-200 text-gray-600 dark:border-white/[0.08] dark:text-[#B5B5B5]",
        solid:   "bg-brand-800 text-white",
        success: "bg-brand-50 text-brand-700 dark:bg-brand-600/10 dark:text-brand-400",
      },
      size: {
        default: "px-3.5 py-1.5",
        sm:      "px-2.5 py-1",
      },
    },
    defaultVariants: {
      variant: "soft",
      size: "default",
    },
  }
);

function Badge({ className, variant, size, ...props }) {
  return <span className={cn(badgeVariants({ variant, size, className }))} {...props} />;
}

export { Badge, badgeVariants };
