import { useState } from "react";
import {
  Settings as SettingsIcon,
  Lock,
  Download,
  LogOut,
  Trash2,
  Check,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { Switch } from "@/components/ui/Switch";
import { AccountTabs } from "@/components/shared/AccountTabs";
import { FormSection } from "@/components/shared/FormSection";
import { usePageTitle } from "@/lib/usePageTitle";

const LANGUAGE_OPTIONS = ["English", "Hindi", "Tamil", "Telugu", "Bengali", "Marathi"];

function Settings() {
  usePageTitle("Settings");
  const [language, setLanguage] = useState("English");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [personalizedRecs, setPersonalizedRecs] = useState(true);
  const [savedAt, setSavedAt] = useState(null);

  function handleSave() {
    // No backend yet — simulate PATCH /api/settings.
    setSavedAt(new Date());
  }

  return (
    <Section className="pt-10 pb-20 lg:pt-14 lg:pb-28">
      <Container className="flex flex-col gap-8">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
          <Badge variant="soft">
            <SettingsIcon className="h-3.5 w-3.5" />
            Account Settings
          </Badge>
          <h1 className="text-balance text-display-sm font-bold text-ink dark:text-white sm:text-display-md">
            Settings
          </h1>
          <p className="text-lg leading-relaxed text-gray-500 dark:text-[#B5B5B5]">
            Manage your account, notification preferences, and privacy — all in one place.
          </p>
        </div>

        <AccountTabs />

        <div className="flex flex-col gap-6">
          <FormSection title="Account" description="Your sign-in details.">
            <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-100 px-4 py-3.5 dark:border-white/[0.06]">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-ink dark:text-white">Email</span>
                <span className="text-sm text-gray-500 dark:text-[#B5B5B5]">aarav.sharma@example.com</span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-100 px-4 py-3.5 dark:border-white/[0.06]">
              <div className="flex items-center gap-3">
                <Lock className="h-4 w-4 text-gray-400" strokeWidth={2} />
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium text-ink dark:text-white">Password</span>
                  <span className="text-sm text-gray-500 dark:text-[#B5B5B5]">Last changed a while ago</span>
                </div>
              </div>
              <Button variant="outline" size="sm" disabled>
                Change Password
              </Button>
            </div>
          </FormSection>

          <FormSection title="Preferences" description="Language and how we reach you.">
            <Select
              label="Language"
              name="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              options={LANGUAGE_OPTIONS}
            />
            <Switch
              label="Email Notifications"
              name="emailNotifications"
              description="Claim updates, new matches, and reminders by email."
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
            />
            <Switch
              label="Push Notifications"
              name="pushNotifications"
              description="Real-time alerts on your device."
              checked={pushNotifications}
              onChange={(e) => setPushNotifications(e.target.checked)}
            />
          </FormSection>

          <FormSection title="Privacy" description="Control how your data is used.">
            <Switch
              label="Personalized Recommendations"
              name="personalizedRecs"
              description="Use your profile to improve AI match scores and suggestions."
              checked={personalizedRecs}
              onChange={(e) => setPersonalizedRecs(e.target.checked)}
            />
            <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-100 px-4 py-3.5 dark:border-white/[0.06]">
              <div className="flex items-center gap-3">
                <Download className="h-4 w-4 text-gray-400" strokeWidth={2} />
                <span className="text-sm font-medium text-ink dark:text-white">Download my data</span>
              </div>
              <Button variant="outline" size="sm" disabled>
                Request Export
              </Button>
            </div>
          </FormSection>

          <FormSection title="Danger Zone" description="Irreversible and account-level actions.">
            <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-100 px-4 py-3.5 dark:border-white/[0.06]">
              <div className="flex items-center gap-3">
                <LogOut className="h-4 w-4 text-gray-400" strokeWidth={2} />
                <span className="text-sm font-medium text-ink dark:text-white">Log out of ClaimIt</span>
              </div>
              <Button variant="outline" size="sm" disabled>
                Soon
              </Button>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-100 px-4 py-3.5 dark:border-white/[0.06]">
              <div className="flex items-center gap-3">
                <Trash2 className="h-4 w-4 text-gray-400" strokeWidth={2} />
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium text-ink dark:text-white">Delete Account</span>
                  <span className="text-sm text-gray-500 dark:text-[#B5B5B5]">Permanently remove your data</span>
                </div>
              </div>
              <Button variant="outline" size="sm" disabled>
                Future
              </Button>
            </div>
          </FormSection>

          <div className="flex flex-col-reverse items-center gap-3 sm:flex-row sm:justify-end">
            {savedAt && (
              <span className="flex items-center gap-1.5 text-sm font-medium text-brand-700 dark:text-brand-400">
                <Check className="h-4 w-4" strokeWidth={2} />
                Saved
              </span>
            )}
            <Button onClick={handleSave} className="w-full sm:w-auto">
              Save Changes
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default Settings;
