import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { AuthCard } from "@/components/shared/AuthCard";
import { AuthDivider } from "@/components/shared/AuthDivider";
import { SocialLoginButton } from "@/components/shared/SocialLoginButton";
import { ClaimItLogo } from "@/components/shared/ClaimItLogo";
import { usePageTitle } from "@/lib/usePageTitle";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Login() {
  usePageTitle("Login");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const next = {};
    if (!email.trim()) next.email = "Enter your email address.";
    else if (!EMAIL_PATTERN.test(email)) next.email = "Enter a valid email address.";
    if (!password) next.password = "Enter your password.";
    return next;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // No backend yet — simulate the request, then continue to the app.
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 900);
  }

  return (
    <Section className="relative flex min-h-[calc(100vh-72px)] items-center overflow-hidden pt-10 pb-20 lg:pt-14 lg:pb-24">
      {/* Liquid glass background — rich gradient that the card blurs against */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,119,182,0.18)_0%,transparent_65%),linear-gradient(175deg,#e8f4fb_0%,#f0f8ff_40%,#ffffff_100%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,180,216,0.14)_0%,transparent_65%),linear-gradient(175deg,#050d14_0%,#060e18_40%,#0A0A0A_100%)]" />
      {/* Soft orb glow behind the card */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-400/[0.08] blur-[80px] dark:bg-brand-400/[0.06]" />
      <Container>
        <div className="mx-auto flex w-full max-w-md flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-4 text-center">
            {/* Official ClaimIt icon — large, centred above the form */}
            <ClaimItLogo variant="icon" h={52} />
            <div className="flex flex-col gap-2">
              <h1 className="text-balance font-display text-display-sm font-bold text-ink dark:text-white sm:text-display-md">
                Welcome Back
              </h1>
              <p className="max-w-xs text-[0.9375rem] leading-relaxed text-gray-500 dark:text-[#B5B5B5]">
                Continue discovering and claiming the benefits you&apos;re eligible for.
              </p>
            </div>
          </div>

          <AuthCard className="w-full
            border-white/70 bg-white/[0.60] backdrop-blur-xl
            [background-image:linear-gradient(145deg,rgba(255,255,255,0.80)_0%,rgba(255,255,255,0.35)_100%)]
            [box-shadow:0_8px_32px_rgba(0,119,182,0.08),0_1px_0_rgba(255,255,255,0.9)_inset,0_-1px_0_rgba(0,0,0,0.04)_inset]
            dark:border-white/[0.08] dark:bg-white/[0.05] dark:backdrop-blur-xl
            dark:[background-image:linear-gradient(145deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0.02)_100%)]
            dark:[box-shadow:0_8px_40px_rgba(0,0,0,0.40),0_1px_0_rgba(255,255,255,0.07)_inset]">
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              <Input
                label="Email Address"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
              />
              <PasswordInput
                label="Password"
                name="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-[#B5B5B5]">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 accent-brand-800"
                  />
                  Remember me
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-brand-600 transition-colors duration-200 hover:text-brand-700"
                >
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? "Signing in…" : "Continue"}
                {!loading && <ArrowRight className="h-4 w-4" />}
              </Button>
            </form>

            <AuthDivider label="OR" />

            <SocialLoginButton provider="google" />

            <p className="text-center text-sm text-gray-500 dark:text-[#B5B5B5]">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="font-semibold text-brand-700 hover:text-brand-800 dark:text-brand-400 dark:hover:text-brand-300">
                Create one
              </Link>
            </p>
          </AuthCard>

          <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-[#8A8A8A]">
            <ShieldCheck className="h-3.5 w-3.5 text-brand-500" strokeWidth={2} />
            Your information is encrypted and securely stored.
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default Login;
