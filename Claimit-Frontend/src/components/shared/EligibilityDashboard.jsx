import { motion } from "framer-motion";
import { Lock, Wheat, ShieldPlus, GraduationCap, ListChecks, Wallet } from "lucide-react";
import { ScoreRing } from "@/components/shared/ScoreRing";

const schemes = [
  { icon: Wheat,          name: "PM Kisan Samman Nidhi", category: "Income support", match: 98 },
  { icon: ShieldPlus,     name: "Ayushman Bharat",       category: "Healthcare cover", match: 95 },
  { icon: GraduationCap,  name: "National Scholarship",  category: "Education",       match: 89 },
];

/**
 * A realistic product interface, not an illustration — this is the hero's
 * visual anchor. It doubles as a preview of the future Eligibility page,
 * so its data shape should stay close to what that page will actually show.
 */
function EligibilityDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="relative w-full max-w-[480px] overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-lift dark:border-white/[0.06] dark:bg-[#0A0A0A] dark:shadow-lift-dark"
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50/70 px-5 py-3.5 dark:border-white/[0.06] dark:bg-white/[0.03]">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-gray-200 dark:bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-gray-200 dark:bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-gray-200 dark:bg-white/10" />
        </div>
        <div className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-400 dark:border-white/[0.08] dark:bg-[#111111] dark:text-[#8A8A8A]">
          <Lock className="h-3 w-3" />
          <span className="tabular-mono">app.claimit.in/eligibility</span>
        </div>
      </div>

      <div className="flex flex-col gap-5 p-6">
        {/* Top stat row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-4 rounded-2xl border border-gray-100 p-4 dark:border-white/[0.06]">
            <ScoreRing value={92} size={64} strokeWidth={6} />
            <div className="flex flex-col">
              <span className="text-xs font-medium text-gray-400 dark:text-[#8A8A8A]">Eligibility score</span>
              <span className="text-sm font-semibold text-ink dark:text-white">Strong match</span>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-3 rounded-2xl border border-gray-100 p-4 dark:border-white/[0.06]">
            <div className="flex items-center gap-2 text-gray-400 dark:text-[#8A8A8A]">
              <ListChecks className="h-4 w-4" />
              <span className="text-xs font-medium">Matched schemes</span>
            </div>
            <span className="tabular-mono text-2xl font-semibold text-ink dark:text-white">18</span>
          </div>
        </div>

        {/* Estimated benefits banner — brand-gradient always looks great in both themes */}
        <div className="flex items-center justify-between rounded-2xl bg-brand-gradient p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white">
              <Wallet className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium text-white/80">Estimated benefits</span>
          </div>
          <span className="tabular-mono text-xl font-semibold text-white">₹3,62,000</span>
        </div>

        {/* Recommended schemes */}
        <div className="flex flex-col gap-1">
          <span className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-[#8A8A8A]">
            Recommended for you
          </span>
          {schemes.map((scheme) => (
            <div
              key={scheme.name}
              className="flex items-center justify-between rounded-xl px-2 py-3 transition-colors hover:bg-brand-25 dark:hover:bg-brand-600/10"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-700 dark:bg-brand-600/10 dark:text-brand-400">
                  <scheme.icon className="h-4 w-4" strokeWidth={2} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-ink dark:text-white">{scheme.name}</span>
                  <span className="text-xs text-gray-400 dark:text-[#8A8A8A]">{scheme.category}</span>
                </div>
              </div>
              <span className="tabular-mono text-xs font-semibold text-brand-600 dark:text-brand-400">{scheme.match}% match</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export { EligibilityDashboard };
