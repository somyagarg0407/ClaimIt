import { useTheme } from "@/context/ThemeContext";

/**
 * Inline SVG ClaimIt logo — no external file dependency, so Sora font
 * renders correctly (inherited from the page) and nothing can be clipped.
 *
 * variant="wordmark" → full logo (C icon + "Claim" + "It")
 * variant="icon"     → standalone C icon only
 *
 * h prop controls rendered height; width scales proportionally.
 * brandColor adapts automatically: #0077B6 in light, #00B4D8 in dark.
 */
function ClaimItLogo({ variant = "wordmark", h = 32, className = "" }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const brand     = isDark ? "#00B4D8" : "#0077B6";
  const ink       = isDark ? "#FFFFFF" : "#111111";
  const bg        = isDark ? "#111111" : "#FFFFFF";
  const bgBorder  = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const trackBg   = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,119,182,0.10)";

  /* ─── ICON VARIANT ───────────────────────────────────────────────── */
  if (variant === "icon") {
    /**
     * 48×48 viewBox. C is centred at (24,24).
     *   arc radius   = 16
     *   stroke-width = 6.5  →  outer 19.25, inner 12.75 from centre
     *   margin each side = 24 − 19.25 = 4.75 px  ✓ (no clipping)
     *   opening = ±42° from 3 o'clock
     *
     * Opening points (±42°):
     *   top:    (24 + 16 cos−42°, 24 + 16 sin−42°) ≈ (35.88, 13.29)
     *   bottom: (35.88, 34.71)
     *
     * Checkmark sits inside the ring hole (inner radius 12.75):
     *   L 15 24  →  22 30  →  33 18
     */
    const arc = "M 35.88 13.29 A 16 16 0 1 0 35.88 34.71";
    const check = "M 17 24 L 22 29 L 31 18";

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={h}
        height={h}
        viewBox="0 0 48 48"
        aria-label="ClaimIt icon"
        role="img"
        className={className}
        style={{ display: "block", flexShrink: 0 }}
      >
        {/* Background square */}
        <rect
          x="1"
          y="1"
          width="46"
          height="46"
          rx="10"
          fill={bg}
          stroke={bgBorder}
          strokeWidth="1.5"
        />
        {/* C arc */}
        <path
          d={arc}
          fill="none"
          stroke={ink}
          strokeWidth="6.5"
          strokeLinecap="round"
        />
        {/* Checkmark */}
        <path
          d={check}
          fill="none"
          stroke={brand}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  /* ─── WORDMARK VARIANT ───────────────────────────────────────────── */
  /**
   * viewBox="0 0 272 52"
   *
   * C icon centred at (26, 26):
   *   arc radius   = 18
   *   stroke-width = 7   →  outer 21.5, inner 14.5 from centre
   *   margin each side = 26 − 21.5 = 4.5 px  ✓
   *   opening ±42° → top (38.38, 13.95)  bottom (38.38, 38.05)
   *
   * Divider:  x=60, y1=11, y2=41
   * Text: x=70, y=39, font-size=36
   *   Sora Bold cap-height ≈ 0.72×36 = 25.9 px (matches C outer ~43 px)
   *
   * Total width: 60 icon + 12 gap + 1 divider + 10 gap + ~180 text + margin ≈ 272
   */
  const wordArc   = "M 38.38 13.95 A 18 18 0 1 0 38.38 38.05";
  const wordCheck = "M 19 26 L 24 31 L 33 21";
  const wordW = Math.round(h * (272 / 52));

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={wordW}
      height={h}
      viewBox="0 0 272 52"
      aria-label="ClaimIt"
      role="img"
      className={className}
      style={{ display: "block", flexShrink: 0, overflow: "visible" }}
    >
      {/* C arc */}
      <path
        d={wordArc}
        fill="none"
        stroke={ink}
        strokeWidth="7"
        strokeLinecap="round"
      />
      {/* Checkmark inside C */}
      <path
        d={wordCheck}
        fill="none"
        stroke={brand}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Vertical divider */}
      <line
        x1="60"
        y1="11"
        x2="60"
        y2="41"
        stroke={isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* "Claim" + "It" — inline SVG inherits Sora from the page */}
      <text
        x="70"
        y="39"
        fontFamily="'Sora', 'Inter', system-ui, sans-serif"
        fontWeight="700"
        fontSize="36"
        letterSpacing="-0.5"
      >
        <tspan fill={ink}>Claim</tspan>
        <tspan fill={brand}>It</tspan>
      </text>
    </svg>
  );
}

export { ClaimItLogo };
