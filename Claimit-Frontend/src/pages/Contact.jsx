import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Send, MapPin, Clock } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { usePageTitle } from "@/lib/usePageTitle";

const CONTACT_CHANNELS = [
  {
    icon: Mail,
    title: "Email",
    detail: "somyagarg0407@gmail.com",
    href: "mailto:somyagarg0407@gmail.com",
    note: "Typical reply within 1 business day",
  },
  {
    icon: Clock,
    title: "Response time",
    detail: "Within 24 hours",
    note: "Mon – Sat, 9 AM – 8 PM IST",
  },
  {
    icon: MapPin,
    title: "Based in",
    detail: "India",
    note: "Building for 1.4 billion citizens",
  },
];

const TOPICS = [
  "General inquiry",
  "Bug report",
  "Feature suggestion",
  "Press / media",
  "Partnership",
  "Other",
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: d },
  }),
};

function Contact() {
  usePageTitle("Contact Us");
  const [form, setForm] = useState({ name: "", email: "", topic: TOPICS[0], message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  function handleChange(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    // Simulate send — swap for real POST /api/contact once backend exists
    window.setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 1000);
  }

  return (
    <>
      <Section className="pt-16 pb-10 lg:pt-24 lg:pb-14">
        <Container>
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center"
          >
            <Badge variant="soft">
              <MessageSquare className="h-3.5 w-3.5" />
              Get in Touch
            </Badge>
            <h1 className="text-balance text-display-sm font-bold text-ink dark:text-white sm:text-display-md">
              Contact Us
            </h1>
            <p className="text-lg leading-relaxed text-gray-500 dark:text-[#B5B5B5]">
              Have a question, found a bug, or want to share feedback? We'd love to
              hear from you — every message is read personally.
            </p>
          </motion.div>
        </Container>
      </Section>

      <Section className="pb-20 pt-0 lg:pb-28">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.6fr]">
            {/* Left — channels */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="flex flex-col gap-4"
            >
              {CONTACT_CHANNELS.map((ch) => (
                <Card key={ch.title} className="flex items-start gap-4 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-600/10 dark:text-brand-400">
                    <ch.icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-[#8A8A8A]">
                      {ch.title}
                    </span>
                    {ch.href ? (
                      <a
                        href={ch.href}
                        className="text-sm font-semibold text-ink transition-colors hover:text-brand-700 dark:text-white dark:hover:text-brand-400"
                      >
                        {ch.detail}
                      </a>
                    ) : (
                      <span className="text-sm font-semibold text-ink dark:text-white">
                        {ch.detail}
                      </span>
                    )}
                    <span className="text-xs text-gray-400 dark:text-[#8A8A8A]">{ch.note}</span>
                  </div>
                </Card>
              ))}
            </motion.div>

            {/* Right — form */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0.1}
            >
              <Card className="p-8 sm:p-10">
                {sent ? (
                  <div className="flex flex-col items-center gap-4 py-8 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 dark:bg-brand-600/10 dark:text-brand-400">
                      <Send className="h-6 w-6" strokeWidth={2} />
                    </div>
                    <h2 className="font-display text-xl font-semibold text-ink dark:text-white">
                      Message sent!
                    </h2>
                    <p className="max-w-sm text-sm leading-relaxed text-gray-500 dark:text-[#B5B5B5]">
                      Thanks for reaching out. We'll get back to you at{" "}
                      <strong className="text-ink dark:text-white">{form.email}</strong> within
                      one business day.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => { setSent(false); setForm({ name: "", email: "", topic: TOPICS[0], message: "" }); }}
                    >
                      Send another message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <Input
                        label="Your name"
                        name="name"
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        required
                      />
                      <Input
                        label="Email address"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-gray-700 dark:text-[#E8E8E8]">
                        Topic
                      </label>
                      <select
                        value={form.topic}
                        onChange={(e) => handleChange("topic", e.target.value)}
                        className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3.5 text-sm text-ink focus:border-brand-400 focus:outline-none dark:border-white/[0.08] dark:bg-[#111111] dark:text-white dark:focus:border-brand-500"
                      >
                        {TOPICS.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-gray-700 dark:text-[#E8E8E8]">
                        Message
                      </label>
                      <textarea
                        value={form.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        rows={5}
                        required
                        placeholder="Describe your question or feedback in as much detail as you'd like…"
                        className="w-full resize-none rounded-xl border border-gray-200 bg-white px-3.5 py-3 text-sm text-ink placeholder:text-gray-400 focus:border-brand-400 focus:outline-none dark:border-white/[0.08] dark:bg-[#111111] dark:text-white dark:placeholder:text-[#8A8A8A] dark:focus:border-brand-500"
                      />
                    </div>

                    <Button type="submit" disabled={sending} className="w-full sm:w-auto sm:self-end">
                      {sending ? "Sending…" : "Send Message"}
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                )}
              </Card>
            </motion.div>
          </div>
        </Container>
      </Section>
    </>
  );
}

export default Contact;
