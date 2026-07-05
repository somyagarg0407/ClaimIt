import { Button } from "@/components/ui/Button";

/**
 * Google's mark is reproduced here in its real brand colors (rather than
 * forced into ClaimIt's blue palette) because a recolored, unrecognizable
 * Google logo would undermine the exact trust this page is meant to build.
 * ClaimIt's own UI chrome stays strictly on-palette everywhere else.
 */
function GoogleMark(props) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden="true" {...props}>
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47c-.28 1.48-1.13 2.73-2.4 3.58v2.98h3.88c2.27-2.09 3.54-5.17 3.54-8.8z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.92l-3.88-2.98c-1.08.72-2.45 1.15-4.05 1.15-3.11 0-5.75-2.1-6.69-4.93H1.3v3.09C3.26 21.3 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.31 14.32c-.24-.72-.38-1.49-.38-2.32s.14-1.6.38-2.32V6.59H1.3A11.98 11.98 0 0 0 0 12c0 1.93.46 3.76 1.3 5.41l4.01-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.3 6.59l4.01 3.09c.94-2.83 3.58-4.93 6.69-4.93z"
      />
    </svg>
  );
}

const PROVIDER_MARKS = {
  google: GoogleMark,
};

function SocialLoginButton({ provider = "google", label, ...props }) {
  const Mark = PROVIDER_MARKS[provider];
  const providerLabel = label ?? `Continue with ${provider.charAt(0).toUpperCase()}${provider.slice(1)}`;

  return (
    <Button type="button" variant="outline" size="lg" className="w-full" {...props}>
      {Mark && <Mark />}
      {providerLabel}
    </Button>
  );
}

export { SocialLoginButton };
