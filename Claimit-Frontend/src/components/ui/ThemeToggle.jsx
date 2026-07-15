import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

/**
 * Premium sun/moon pill toggle for the Navbar.
 *
 * Design: animated pill track with a sliding thumb that swaps between
 * Sun (light) and Moon (dark) icons. Fully keyboard accessible — the
 * underlying element is a <button> with aria-pressed.
 *
 * Transition: 200ms ease-out on colours, transform, and shadows only.
 * Layout is never animated (no width/height changes during transition).
 */
function ThemeToggle({ className }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={toggleTheme}
      className={cn(
        // Pill track
        "relative flex h-8 w-[3.25rem] shrink-0 cursor-pointer items-center rounded-full border p-0.5",
        "transition-colors duration-200 ease-out",
        // Focus ring
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400",
        // Light track
        "border-gray-200 bg-gray-100",
        // Dark track
        "dark:border-white/10 dark:bg-white/10",
        className
      )}
    >
      {/* Sliding thumb */}
      <span
        aria-hidden="true"
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-full shadow-soft",
          "transition-all duration-200 ease-out",
          // Thumb position & colour
          isDark
            ? "translate-x-[1.375rem] bg-[#111111] text-[#E8E8E8]"
            : "translate-x-0 bg-white text-amber-500"
        )}
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5" strokeWidth={2} />
        ) : (
          <Sun className="h-3.5 w-3.5" strokeWidth={2} />
        )}
      </span>
    </button>
  );
}

export { ThemeToggle };
