import { cn } from "@/lib/utils";

/**
 * Vertical rhythm wrapper. Every top-level landing page block should be a
 * <Section> so spacing stays consistent as new pages/sections are added.
 */
function Section({ className, children, id, ...props }) {
  return (
    <section id={id} className={cn("py-20 lg:py-28", className)} {...props}>
      {children}
    </section>
  );
}

export { Section };
