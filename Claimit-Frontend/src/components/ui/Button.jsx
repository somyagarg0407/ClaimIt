import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-[0.9375rem] font-semibold transition-all duration-200 ease-out disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-800 text-white shadow-soft hover:bg-brand-700 hover:shadow-lift",
        secondary:
          "bg-white text-brand-800 border border-brand-100 hover:border-brand-300 hover:bg-brand-25",
        ghost: "text-gray-600 hover:text-ink hover:bg-gray-50",
        outline: "border border-gray-200 text-ink hover:border-brand-300 hover:bg-brand-25",
        link: "text-brand-600 hover:text-brand-700 underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4 text-sm",
        lg: "h-[3.25rem] px-7 text-base",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

const Button = forwardRef(({ className, variant, size, as: Comp = "button", ...props }, ref) => {
  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  );
});
Button.displayName = "Button";

export { Button, buttonVariants };
