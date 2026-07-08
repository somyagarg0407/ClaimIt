import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  Bell,
  CheckCircle2,
  FileText,
  Heart,
  Home,
  HelpCircle,
  LogOut,
  Search,
  Settings,
  User,
  X,
} from "lucide-react";
import { DrawerItem } from "@/components/ui/DrawerItem";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const PRIMARY_ITEMS = [
  { icon: Home, label: "Home", to: "/" },
  { icon: Search, label: "Discover", to: "/discover" },
  { icon: CheckCircle2, label: "Eligibility", to: "/eligibility" },
];

const ACTIVITY_ITEMS = [
  { icon: Heart, label: "My Schemes", to: "/my-schemes" },
  { icon: FileText, label: "My Claims", to: "/my-claims" },
];

const ACCOUNT_ITEMS = [
  { icon: User, label: "Profile", to: "/profile" },
  { icon: Bell, label: "Notifications", to: "/notifications" },
  { icon: Settings, label: "Settings", to: "/settings" },
];

/**
 * Slide-out navigation drawer, triggered by the hamburger beside the logo.
 * A strict superset of the old mobile-only nav toggle (same links, plus
 * My Activity / Account) — so it now serves as the single mobile nav
 * surface too, rather than running two different hamburgers side by side.
 */
function NavigationDrawer({ open, onClose }) {
  const location = useLocation();

  useEffect(() => {
    if (!open) return undefined;

    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  const isActive = (to) => location.pathname === to;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-ink/30 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            key="drawer-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 left-0 z-[70] flex w-[300px] flex-col overflow-y-auto border-r border-gray-100 bg-white p-5 shadow-lift sm:w-[320px]"
          >
            <div className="mb-2 flex items-center justify-between">
              <Link to="/" onClick={onClose} className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-800">
                  <span className="tabular-mono text-sm font-bold text-white">C</span>
                </span>
                <span className="font-display text-[1.125rem] font-bold tracking-tight text-ink">
                  ClaimIt
                </span>
              </Link>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-colors duration-200 hover:bg-gray-50 hover:text-ink"
              >
                <X className="h-[18px] w-[18px]" strokeWidth={2} />
              </button>
            </div>

            <div className="flex flex-col gap-1 border-t border-gray-100 pt-3">
              {PRIMARY_ITEMS.map((item) => (
                <DrawerItem key={item.to} {...item} active={isActive(item.to)} onClick={onClose} />
              ))}
            </div>

            <div className="mt-4 flex flex-col gap-1 border-t border-gray-100 pt-4">
              <SectionHeading>My Activity</SectionHeading>
              {ACTIVITY_ITEMS.map((item) => (
                <DrawerItem key={item.to} {...item} active={isActive(item.to)} onClick={onClose} />
              ))}
            </div>

            <div className="mt-4 flex flex-col gap-1 border-t border-gray-100 pt-4">
              <SectionHeading>Account</SectionHeading>
              {ACCOUNT_ITEMS.map((item) => (
                <DrawerItem key={item.to} {...item} active={isActive(item.to)} onClick={onClose} />
              ))}
            </div>

            <div className="mt-4 flex flex-col gap-1 border-t border-gray-100 pt-4">
              <DrawerItem
                icon={HelpCircle}
                label="Help"
                to="/help"
                active={isActive("/help")}
                onClick={onClose}
              />
              <DrawerItem icon={LogOut} label="Logout" disabled badge="Soon" />
            </div>

            {/*
              Fix for: mobile users only ever see this drawer (the desktop
              Navbar's Login/Register buttons live in a `hidden lg:flex`
              cluster), so without this section they had no way to sign in
              on mobile at all. TODO(auth): once real JWT session state
              exists, hide this whole block when logged in, and swap it for
              the user's name/avatar + a functional Logout above instead of
              the disabled one.
            */}
            <div className="mt-4 flex flex-col gap-2 border-t border-gray-100 pt-4">
              <Button as={Link} to="/login" variant="outline" size="sm" onClick={onClose} className="w-full">
                Login
              </Button>
              <Button as={Link} to="/register" size="sm" onClick={onClose} className="w-full">
                Register
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export { NavigationDrawer };
