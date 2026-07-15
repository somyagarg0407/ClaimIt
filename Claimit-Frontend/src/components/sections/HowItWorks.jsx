import { motion } from "framer-motion";
import { UserRoundPen, Sparkles, FileCheck2 } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

const STEPS = [
  {
    number: "01",
    icon: UserRoundPen,
    title: "Tell us about yourself",
    description:
      "Answer a short set of questions about your income, location, occupation and family — takes under two minutes.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "AI matches your schemes",
    description:
      "ClaimIt cross-checks your profile against 20,000+ verified government schemes and ranks them by real match confidence.",
  },
  {
    number: "03",
    icon: FileCheck2,
    title: "Understand & claim",
    description:
      "Get a plain-language breakdown of eligibility, required documents and the exact steps to submit your claim.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

function HowItWorks() {
  return (
    <Section id="how-it-works" className="bg-brand-25/60 dark:bg-brand-600/[0.04]">
      <Container>
        <div className="mx-auto mb-16 flex max-w-2xl flex-col items-center gap-4 text-center">
          <Badge variant="outline">How It Works</Badge>
          <h2 className="text-balance text-display-sm font-bold text-ink dark:text-white sm:text-display-md">
            Three steps between you and your benefits
          </h2>
          <p className="text-lg leading-relaxed text-gray-500 dark:text-[#B5B5B5]">
            No paperwork maze, no jargon — just a clear path from your
            situation to the schemes you actually qualify for.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp}
              custom={i * 0.15}
              className="relative flex flex-col gap-5 rounded-2xl border border-gray-100 bg-white p-8 dark:border-white/[0.06] dark:bg-[#0A0A0A]"
            >
              <span className="tabular-mono text-sm font-semibold text-brand-300">
                {step.number}
              </span>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-800 text-white">
                <step.icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <h3 className="font-display text-lg font-semibold text-ink dark:text-white">{step.title}</h3>
              <p className="text-[0.9375rem] leading-relaxed text-gray-500 dark:text-[#B5B5B5]">{step.description}</p>

              {i < STEPS.length - 1 && (
                <div className="absolute right-[-1.25rem] top-1/2 hidden h-px w-6 -translate-y-1/2 bg-gray-200 md:block dark:bg-white/[0.06]" />
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export { HowItWorks };
