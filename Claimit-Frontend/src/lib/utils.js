import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge conditional class names and resolve Tailwind conflicts.
 * Standard shadcn/ui-style helper used across all components.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
