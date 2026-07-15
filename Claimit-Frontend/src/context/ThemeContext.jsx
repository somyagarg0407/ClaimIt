import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

/**
 * Global theme provider — supports "light" | "dark".
 *
 * Persistence strategy:
 *   1. Read from localStorage ("claimit-theme") on mount.
 *   2. If no saved preference, fall back to prefers-color-scheme.
 *   3. Persist every change back to localStorage.
 *
 * Application strategy:
 *   The "dark" class is added/removed on <html> so Tailwind's
 *   `darkMode: ["class"]` picks it up globally without any
 *   prop-drilling.
 */
function getInitialTheme() {
  try {
    const stored = localStorage.getItem("claimit-theme");
    if (stored === "dark" || stored === "light") return stored;
  } catch {
    // localStorage may be unavailable in restricted environments
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  // Keep the <html> class in sync and persist to localStorage.
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem("claimit-theme", theme);
    } catch {
      // ignore
    }
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Convenience hook — throws if used outside ThemeProvider so mistakes
 * are caught early in development.
 */
function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}

export { ThemeProvider, useTheme };
