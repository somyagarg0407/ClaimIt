/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
    },
    extend: {
      colors: {
        // Strict ClaimIt palette — do not introduce colors outside this scale.
        ink: "#000000",
        // Dark theme surface tokens
        dark: {
          bg:       "#000000",  // OLED true black — base canvas
          surface:  "#0A0A0A",  // primary surface (cards, navbar)
          elevated: "#111111",  // secondary surface (drawer, dialogs)
          border:   "rgba(255,255,255,0.08)",
          text:     "#FFFFFF",
          muted:    "#B5B5B5",
          subtle:   "#8A8A8A",
        },
        brand: {
          25:  "#F5FBFD",
          50:  "#CAF0F8",
          100: "#ADE8F4",
          200: "#90E0EF",
          300: "#48CAE4",
          400: "#00B4D8",
          500: "#0096C7",
          600: "#0077B6",
          700: "#023E8A",
          800: "#0077B6",
          900: "#0077B6",
        },
      },
      fontFamily: {
        display: ["'Sora'", "sans-serif"],
        sans:    ["'Inter'", "sans-serif"],
        mono:    ["'JetBrains Mono'", "monospace"],
      },
      fontSize: {
        "display-xl": [
          "4.25rem",
          { lineHeight: "1.04", letterSpacing: "-0.03em" },
        ],
        "display-lg": [
          "3.25rem",
          { lineHeight: "1.08", letterSpacing: "-0.03em" },
        ],
        "display-md": [
          "2.5rem",
          { lineHeight: "1.12", letterSpacing: "-0.02em" },
        ],
        "display-sm": [
          "1.75rem",
          { lineHeight: "1.2", letterSpacing: "-0.015em" },
        ],
      },
      boxShadow: {
        soft:       "0 1px 2px rgba(3, 4, 94, 0.04), 0 8px 24px -12px rgba(3, 4, 94, 0.10)",
        card:       "0 1px 1px rgba(3, 4, 94, 0.03), 0 12px 32px -16px rgba(3, 4, 94, 0.14)",
        lift:       "0 20px 48px -18px rgba(3, 4, 94, 0.22)",
        "soft-dark":     "0 1px 2px rgba(0,0,0,0.4), 0 8px 24px -12px rgba(0,0,0,0.5)",
        "card-dark":     "0 1px 1px rgba(0,0,0,0.3), 0 12px 32px -16px rgba(0,0,0,0.6)",
        "lift-dark":     "0 20px 48px -18px rgba(0,0,0,0.7)",
        "glow-brand":
          "0 0 0 1px rgba(0, 180, 216, 0.16), 0 16px 40px -16px rgba(0, 119, 182, 0.28)",
      },
      borderRadius: {
        xl:   "0.875rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(3,4,94,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(3,4,94,0.045) 1px, transparent 1px)",
        "grid-faint-dark":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "brand-gradient":
          "linear-gradient(135deg, #0077B6 0%, #0077B6 55%, #00B4D8 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "ring-in": {
          "0%": { strokeDashoffset: "251" },
        },
        "theme-in": {
          "0%":   { opacity: "0.7" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up":  "fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "theme-in": "theme-in 0.2s ease-out forwards",
      },
    },
  },
  plugins: [],
};
