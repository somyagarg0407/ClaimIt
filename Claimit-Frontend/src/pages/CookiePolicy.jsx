import { motion } from "framer-motion";
import { Cookie } from "lucide-react";
import { Link } from "react-router-dom";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { usePageTitle } from "@/lib/usePageTitle";

const COOKIE_TABLE = [
  {
    name: "claimit_theme",
    type: "Preference",
    duration: "1 year",
    purpose: "Remembers your light or dark theme preference so it persists across visits.",
  },
  {
    name: "_ga, _gid",
    type: "Analytics",
    duration: "2 years / 24 hours",
    purpose: "Google Analytics cookies used to understand aggregate usage patterns (pages visited, session length). No personal data is sent.",
  },
  {
    name: "Session cookie",
    type: "Functional",
    duration: "Session",
    purpose: "Maintains your temporary session state while you navigate the app. Deleted when you close your browser.",
  },
];

const SECTIONS = [
  {
    title: "What are cookies?",
    body: "Cookies are small text files placed on your device by websites you visit. They are widely used to make websites work efficiently, remember your preferences, and provide reporting information.",
  },
  {
    title: "How ClaimIt uses cookies",
    body: "We use a minimal set of cookies — only what is necessary to make ClaimIt function properly and to understand how the platform is used in aggregate. We do not use advertising cookies, cross-site tracking cookies, or third-party marketing cookies of any kind.",
  },
  {
    title: "Managing cookies",
    body: "You can control and delete cookies through your browser settings. Disabling the theme preference cookie means your light/dark preference will reset on every visit. Disabling analytics cookies will not affect your ability to use ClaimIt. Most browsers allow you to refuse new cookies, be notified when you receive a cookie, or delete existing cookies.",
  },
  {
    title: "Changes to this policy",
    body: "We may update this Cookie Policy occasionally. When we do, the 'Last updated' date below will change. Continued use of ClaimIt after an update means you accept the revised policy.",
  },
  {
    title: "Contact",
    body: "Questions? Email us at somyagarg0407@gmail.com.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: d } }),
};

function CookiePolicy() {
  usePageTitle("Cookie Policy");
  return (
    <Section className="pt-16 pb-24 lg:pt-24 lg:pb-32">
      <Container>
        <motion.div initial="hidden" animate="show" variants={fadeUp} className="mx-auto mb-14 flex max-w-xl flex-col items-center gap-4 text-center">
          <Badge variant="soft"><Cookie className="h-3.5 w-3.5" />Legal</Badge>
          <h1 className="text-balance text-display-sm font-bold text-ink dark:text-white sm:text-display-md">Cookie Policy</h1>
          <p className="text-gray-500 dark:text-[#B5B5B5]">Last updated: July 2026</p>
          <p className="text-lg leading-relaxed text-gray-500 dark:text-[#B5B5B5]">
            ClaimIt uses a minimal number of cookies. Here's exactly what we use and why.
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl flex flex-col gap-10">
          {/* Table */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="overflow-hidden rounded-2xl border border-gray-100 dark:border-white/[0.06]">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50 dark:border-white/[0.06] dark:bg-white/[0.03]">
                    {["Cookie", "Type", "Duration", "Purpose"].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-[#8A8A8A]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-white/[0.06]">
                  {COOKIE_TABLE.map((row) => (
                    <tr key={row.name} className="bg-white dark:bg-[#0A0A0A]">
                      <td className="px-5 py-4 font-mono text-xs font-medium text-ink dark:text-white whitespace-nowrap">{row.name}</td>
                      <td className="px-5 py-4 text-gray-500 dark:text-[#B5B5B5] whitespace-nowrap">{row.type}</td>
                      <td className="px-5 py-4 text-gray-500 dark:text-[#B5B5B5] whitespace-nowrap">{row.duration}</td>
                      <td className="px-5 py-4 text-gray-500 dark:text-[#B5B5B5]">{row.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Text sections */}
          {SECTIONS.map((s, i) => (
            <motion.div key={s.title} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} custom={i * 0.04} className="flex flex-col gap-3 border-t border-gray-100 pt-8 dark:border-white/[0.06]">
              <h2 className="font-display text-xl font-semibold text-ink dark:text-white">{s.title}</h2>
              <p className="leading-relaxed text-gray-500 dark:text-[#B5B5B5]">{s.body}</p>
            </motion.div>
          ))}

          <p className="mt-2 text-sm text-gray-400 dark:text-[#8A8A8A]">
            See also: <Link to="/privacy" className="text-brand-600 hover:underline dark:text-brand-400">Privacy Policy</Link> · <Link to="/terms" className="text-brand-600 hover:underline dark:text-brand-400">Terms of Service</Link>
          </p>
        </div>
      </Container>
    </Section>
  );
}

export default CookiePolicy;
