import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full text-xs font-semibold tracking-wide",
  {
    variants: {
      variant: {
        soft: "bg-brand-50 text-brand-800 border border-brand-100",
        outline: "border border-gray-200 text-gray-600",
        solid: "bg-brand-800 text-white",
        success: "bg-brand-50 text-brand-700",
      },
      size: {
        default: "px-3.5 py-1.5",
        sm: "px-2.5 py-1",
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
