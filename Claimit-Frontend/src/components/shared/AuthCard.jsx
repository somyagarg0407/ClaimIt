import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

/**
 * Shared card shell for auth pages (Login today, Register next). Just a
 * themed wrapper around the existing Card primitive — keeps padding and
 * internal spacing consistent between auth screens without duplicating it.
 */
function AuthCard({ className, children }) {
  return <Card className={cn("flex w-full flex-col gap-6 p-8 sm:p-10", className)}>{children}</Card>;
}

export { AuthCard };
