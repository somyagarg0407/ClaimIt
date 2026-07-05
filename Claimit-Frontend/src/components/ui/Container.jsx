import { cn } from "@/lib/utils";

/**
 * Constrains and centers content to the site's reading/layout width.
 * Use inside every Section instead of ad-hoc max-w-* classes.
 */
function Container({ className, ...props }) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1200px] px-6 lg:px-8", className)}
      {...props}
    />
  );
}

export { Container };
