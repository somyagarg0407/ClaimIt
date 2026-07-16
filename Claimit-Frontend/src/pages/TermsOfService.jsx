import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { usePageTitle } from "@/lib/usePageTitle";

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: `By accessing or using ClaimIt ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Platform. ClaimIt reserves the right to update these terms at any time; continued use after changes constitutes acceptance.`,
  },
  {
    title: "2. About ClaimIt",
    body: `ClaimIt is an independent, AI-powered information service that helps citizens discover and understand Indian government welfare schemes. We are not a government body, government agent, or representative. We do not process official government applications on your behalf, and information on this platform should not be taken as legal, financial, or official government advice.`,
  },
  {
    title: "3. Eligibility and Access",
    body: `ClaimIt is available to any individual with access to the internet. You must be at least 13 years old to use the platform. By using ClaimIt, you confirm that the information you provide (age, income, location, etc.) is accurate to the best of your knowledge. Providing false information may lead to inaccurate eligibility results.`,
  },
  {
    title: "4. Permitted Use",
    body: `You may use ClaimIt solely for personal, non-commercial purposes — to discover schemes, check eligibility, and track your applications. You may not scrape, crawl, copy, reproduce, or redistribute any content from ClaimIt without prior written permission. You may not use the platform to engage in any unlawful activity or to misrepresent your eligibility to any government authority.`,
  },
  {
    title: "5. Accuracy of Information",
    body: `While we strive to keep scheme information accurate and up to date, ClaimIt does not guarantee the completeness or current accuracy of any scheme detail. Scheme eligibility criteria, benefit amounts, and deadlines can change without notice. Always verify information with the official scheme portal or government department before applying.`,
  },
  {
    title: "6. AI Eligibility Scores",
    body: `AI match scores are estimates based on the profile information you provide and the published eligibility criteria of each scheme. They are not official eligibility determinations. A high match score does not guarantee approval; a low score does not mean you are ineligible. Final eligibility decisions rest with the relevant government authority.`,
  },
  {
    title: "7. Intellectual Property",
    body: `All design, code, copy, and trade marks associated with the ClaimIt brand are the property of ClaimIt AI and its creator. Government scheme information is derived from publicly available government sources. Nothing in these Terms grants you any intellectual property rights in ClaimIt's original work.`,
  },
  {
    title: "8. Disclaimer of Warranties",
    body: `ClaimIt is provided "as is" and "as available" without warranties of any kind, express or implied. We do not warrant that the platform will be uninterrupted, error-free, or free of viruses. Your use of ClaimIt is entirely at your own risk.`,
  },
  {
    title: "9. Limitation of Liability",
    body: `To the maximum extent permitted by applicable law, ClaimIt AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising out of or in connection with your use of the platform, even if advised of the possibility of such damages.`,
  },
  {
    title: "10. Governing Law",
    body: `These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of India.`,
  },
  {
    title: "11. Contact",
    body: `For questions about these Terms, contact us at somyagarg0407@gmail.com.`,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: d } }),
};

function TermsOfService() {
  usePageTitle("Terms of Service");
  return (
    <Section className="pt-16 pb-24 lg:pt-24 lg:pb-32">
      <Container>
        <motion.div initial="hidden" animate="show" variants={fadeUp} className="mx-auto mb-14 flex max-w-xl flex-col items-center gap-4 text-center">
          <Badge variant="soft"><FileText className="h-3.5 w-3.5" />Legal</Badge>
          <h1 className="text-balance text-display-sm font-bold text-ink dark:text-white sm:text-display-md">Terms of Service</h1>
          <p className="text-gray-500 dark:text-[#B5B5B5]">Last updated: July 2026</p>
          <p className="text-lg leading-relaxed text-gray-500 dark:text-[#B5B5B5]">
            Please read these terms carefully before using ClaimIt. They govern your use of our platform and the relationship between you and ClaimIt AI.
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

export default TermsOfService;
