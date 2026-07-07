import { motion } from "framer-motion";

/**
 * The eligibility score ring is ClaimIt's signature visual motif — it shows
 * up wherever the product needs to communicate a confidence/match number
 * (hero mockup, scheme cards, future Eligibility page). Keeping it as one
 * component means the motif stays consistent as the product grows.
 */
function ScoreRing({ value = 92, size = 88, strokeWidth = 8, label }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const gradientId = `score-ring-gradient-${size}-${value}`;

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0077B6" />
            <stop offset="100%" stopColor="#00B4D8" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#CAF0F8"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="tabular-mono text-lg font-semibold text-brand-800">
          {value}%
        </span>
        {label && (
          <span className="text-[10px] font-medium text-gray-400">{label}</span>
        )}
      </div>
    </div>
  );
}

export { ScoreRing };
