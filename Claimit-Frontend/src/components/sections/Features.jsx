import { motion } from "framer-motion";
import { BrainCircuit, ShieldCheck, Languages, Lock } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { FeatureCard } from "@/components/shared/FeatureCard";

const FEATURES = [
  {
    icon: BrainCircuit,
    title: "AI-powered matching",
    description:
      "Our models read scheme eligibility rules the way a policy expert would, then match them to your exact profile — not generic categories.",
  },
  {
    icon: ShieldCheck,
    title: "Verified government data",
    description:
      "Every scheme is sourced and cross-checked against official government notifications, so you only see benefits that are real and active.",
  },
  {
    icon: Languages,
    title: "Built for every citizen",
    description:
      "Plain-language explanations available in multiple Indian languages, designed for people who've never applied for a scheme before.",
  },
  {
    icon: Lock,
    title: "Privacy by default",
    description:
      "Your data is used only to calculate your eligibility. Nothing is sold, shared with advertisers, or used without your consent.",
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

function Features() {
  return (
    <Section>
      <Container>
        <div className="mx-auto mb-16 flex max-w-2xl flex-col items-center gap-4 text-center">
          <Badge variant="outline">Why ClaimIt</Badge>
          <h2 className="text-balance text-display-sm font-bold text-ink sm:text-display-md">
            Built like a product, not a portal
          </h2>
          <p className="text-lg leading-relaxed text-gray-500">
            Government benefits shouldn&apos;t require a middleman. ClaimIt is
            the intelligence layer that makes them findable.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp}
              custom={i * 0.1}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export { Features };
