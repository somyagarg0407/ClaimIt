import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

function CTA() {
  return (
    <Section className="pt-0">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl bg-brand-gradient px-8 py-16 text-center sm:px-16"
        >
          <div className="pointer-events-none absolute inset-0 bg-grid-faint bg-[length:48px_48px] opacity-[0.08]" />
          <div className="relative flex flex-col items-center gap-6">
            <h2 className="text-balance text-display-sm font-bold text-white sm:text-display-md">
              Your benefits are waiting. Let&apos;s go find them.
            </h2>
            <p className="max-w-lg text-lg leading-relaxed text-white/80">
              It takes under two minutes to check your eligibility — no
              paperwork, no fees, no login required to get started.
            </p>
            <Button size="lg" variant="secondary" className="border-none bg-white text-brand-800 hover:bg-brand-50">
              Check Eligibility
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}

export { CTA };
