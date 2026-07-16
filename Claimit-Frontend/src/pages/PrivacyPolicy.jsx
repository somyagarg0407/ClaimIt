import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { usePageTitle } from "@/lib/usePageTitle";

const SECTIONS = [
  {
    title: "Information We Collect",
    body: `When you use ClaimIt, we may collect information you provide directly — such as your age, state of residence, occupation, income bracket, and education level — to calculate eligibility scores and personalise your scheme recommendations. We also collect standard usage data (page views, session duration, feature interactions) to improve the platform. We do not collect Aadhaar numbers, PAN, bank account details, or any other government-issued identity documents.`,
  },
  {
    title: "How We Use Your Information",
    body: `Your profile data is used solely to compute eligibility scores, rank schemes, and tailor the recommendations you see. We do not use your personal information for advertising, profiling, or monetisation. Aggregated, anonymised usage statistics may be used to improve ClaimIt's matching algorithms.`,
  },
  {
    title: "Data Storage and Security",
    body: `All data is stored securely. We apply industry-standard encryption in transit (HTTPS/TLS) and at rest. Access to personal data is strictly limited to systems that require it to perform the service. We regularly review our security practices.`,
  },
  {
    title: "Data Sharing",
    body: `We do not sell, rent, or share your personal information with third parties for marketing purposes. We may share data with trusted service providers (e.g. hosting, analytics) who process it on our behalf under strict confidentiality obligations. We may disclose information if required by law or a valid court order.`,
  },
  {
    title: "Cookies and Tracking",
    body: `ClaimIt uses minimal cookies: a theme preference cookie (to persist your light/dark mode selection) and standard analytics cookies. No cross-site tracking cookies are used. See our Cookie Policy for full details.`,
  },
  {
    title: "Your Rights",
    body: `You have the right to access, correct, or delete the personal information we hold about you. To exercise any of these rights, email us at somyagarg0407@gmail.com. We will respond within 30 days.`,
  },
  {
    title: "Children's Privacy",
    body: `ClaimIt is not directed to children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us and we will delete it promptly.`,
  },
  {
    title: "Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. When we do, we will revise the "Last updated" date below and, for material changes, notify you via the platform. Your continued use of ClaimIt after any changes constitutes acceptance of the revised policy.`,
  },
  {
    title: "Contact",
    body: `Questions or concerns about this Privacy Policy? Reach us at somyagarg0407@gmail.com.`,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: d } }),
};

function PrivacyPolicy() {
  usePageTitle("Privacy Policy");
  return (
    <Section className="pt-16 pb-24 lg:pt-24 lg:pb-32">
      <Container>
        <motion.div initial="hidden" animate="show" variants={fadeUp} className="mx-auto mb-14 flex max-w-xl flex-col items-center gap-4 text-center">
          <Badge variant="soft"><Shield className="h-3.5 w-3.5" />Legal</Badge>
          <h1 className="text-balance text-display-sm font-bold text-ink dark:text-white sm:text-display-md">Privacy Policy</h1>
          <p className="text-gray-500 dark:text-[#B5B5B5]">Last updated: July 2026</p>
          <p className="text-lg leading-relaxed text-gray-500 dark:text-[#B5B5B5]">
            ClaimIt is committed to protecting your privacy. This policy explains what data we collect, how we use it, and what rights you have.
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl flex flex-col gap-10">
          {SECTIONS.map((s, i) => (
            <motion.div key={s.title} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={i * 0.04} className="flex flex-col gap-3 border-t border-gray-100 pt-8 first:border-t-0 first:pt-0 dark:border-white/[0.06]">
              <h2 className="font-display text-xl font-semibold text-ink dark:text-white">{s.title}</h2>
              <p className="leading-relaxed text-gray-500 dark:text-[#B5B5B5]">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default PrivacyPolicy;
