import { motion } from "framer-motion";
import { ArrowRight, Compass, Sparkles, BadgeCheck, Layers } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { EligibilityDashboard } from "@/components/shared/EligibilityDashboard";

const TRUST_INDICATORS = [
  { icon: Layers, label: "20,000+ Government Schemes" },
  { icon: Sparkles, label: "AI Powered Matching" },
  { icon: BadgeCheck, label: "100% Free" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Faint structural grid — subtle, not decorative noise */}
      <div className="pointer-events-none absolute inset-0 bg-grid-faint bg-[length:56px_56px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />

      <Container className="relative grid grid-cols-1 items-center gap-16 py-20 lg:grid-cols-2 lg:gap-12 lg:py-28">
        <div className="flex flex-col items-start gap-7">
          <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0}>
            <Badge variant="soft">
              <Compass className="h-3.5 w-3.5" />
              India&apos;s Personal Benefits Platform
            </Badge>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={0.1}
            className="text-balance text-display-md font-bold text-ink sm:text-display-lg lg:text-display-xl"
          >
            Find. Understand.
            <br />
            <span className="text-brand-600">Claim What&apos;s Yours.</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={0.2}
            className="max-w-md text-lg leading-relaxed text-gray-500"
          >
            ClaimIt uses AI to match you against 20,000+ government schemes,
            scholarships and subsidies — then shows you exactly what
            you&apos;re eligible for and how to claim it.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={0.3}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <Button size="lg">
              Check Eligibility
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="secondary">
              Explore Schemes
            </Button>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={0.4}
            className="flex w-full flex-col gap-4 border-t border-gray-100 pt-7 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3"
          >
            {TRUST_INDICATORS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm font-medium text-gray-500">
                <Icon className="h-4 w-4 text-brand-600" strokeWidth={2} />
                {label}
              </div>
            ))}
          </motion.div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <EligibilityDashboard />
        </div>
      </Container>
    </section>
  );
}

export { Hero };
