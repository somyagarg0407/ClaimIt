import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Wheat, ShieldPlus, GraduationCap, HeartHandshake, HandCoins, Home } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SchemeCard } from "@/components/shared/SchemeCard";
import { ArrowRight } from "lucide-react";

const SCHEMES = [
  { icon: Wheat, name: "PM Kisan Samman Nidhi", category: "Income support", matchPercent: 98, benefit: "₹6,000/yr" },
  { icon: ShieldPlus, name: "Ayushman Bharat", category: "Healthcare cover", matchPercent: 95, benefit: "₹5,00,000" },
  { icon: GraduationCap, name: "National Scholarship", category: "Education", matchPercent: 89, benefit: "₹82,000/yr" },
  { icon: HeartHandshake, name: "PM Jeevan Jyoti Yojana", category: "Life insurance", matchPercent: 87, benefit: "₹2,00,000" },
  { icon: HandCoins, name: "Atal Pension Yojana", category: "Pension", matchPercent: 84, benefit: "₹5,000/mo" },
  { icon: Home, name: "PM Awas Yojana", category: "Housing subsidy", matchPercent: 79, benefit: "₹2,67,000" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

function PopularSchemes() {
  return (
    <Section className="bg-brand-25/60 dark:bg-brand-600/[0.04]">
      <Container>
        <div className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="flex max-w-xl flex-col gap-4">
            <Badge variant="outline">Popular Schemes</Badge>
            <h2 className="text-balance text-display-sm font-bold text-ink dark:text-white sm:text-display-md">
              A glimpse of what people are claiming
            </h2>
            <p className="text-lg leading-relaxed text-gray-500 dark:text-[#B5B5B5]">
              A sample of the 20,000+ schemes in our database, with real match
              rates from citizen profiles like yours.
            </p>
          </div>
          <Button as={Link} to="/discover" variant="secondary" className="shrink-0">
            View all schemes
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SCHEMES.map((scheme, i) => (
            <motion.div
              key={scheme.name}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp}
              custom={i * 0.08}
            >
              <SchemeCard {...scheme} />
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export { PopularSchemes };
