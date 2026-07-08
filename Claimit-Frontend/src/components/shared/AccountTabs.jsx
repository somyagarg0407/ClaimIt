import { useNavigate, useLocation } from "react-router-dom";
import { User, Bell, Settings as SettingsIcon, HelpCircle } from "lucide-react";
import { CategoryChip } from "@/components/shared/CategoryChip";

const TABS = [
  { label: "Profile", to: "/profile", icon: User },
  { label: "Notifications", to: "/notifications", icon: Bell },
  { label: "Settings", to: "/settings", icon: SettingsIcon },
  { label: "Help", to: "/help", icon: HelpCircle },
];

/**
 * The connective tissue across the Account & Support module. Reuses
 * CategoryChip as-is (icon + label + active state already exist there) —
 * navigation is handled here via useNavigate rather than modifying that
 * component, since it isn't a Link and doesn't need to become one just for
 * this one consumer.
 */
function AccountTabs() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="no-scrollbar -mx-6 flex gap-2.5 overflow-x-auto px-6 sm:mx-0 sm:flex-wrap sm:px-0">
      {TABS.map((tab) => (
        <CategoryChip
          key={tab.to}
          label={tab.label}
          icon={tab.icon}
          active={location.pathname === tab.to}
          onClick={() => navigate(tab.to)}
        />
      ))}
    </div>
  );
}

export { AccountTabs };
