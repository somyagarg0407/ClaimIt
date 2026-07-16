import { useEffect, useMemo, useState } from "react";
import { Bell, CheckCheck } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AccountTabs } from "@/components/shared/AccountTabs";
import { CategoryChip } from "@/components/shared/CategoryChip";
import { NotificationItem } from "@/components/shared/NotificationItem";
import { EmptyState } from "@/components/shared/EmptyState";
import { usePageTitle } from "@/lib/usePageTitle";

// Mock notification feed — replace with a real GET /api/notifications call
// (auth'd via JWT) once the backend exists; markAllRead()/markRead() below
// already update local state optimistically, so wiring a real PATCH is a
// drop-in swap.
const MOCK_NOTIFICATIONS = [
  {
    id: "n1",
    type: "documents_required",
    title: "Documents needed for National Scholarship Portal",
    description: "Upload your latest mark sheet to keep your claim moving.",
    createdAt: "2026-07-06T09:30:00",
    read: false,
  },
  {
    id: "n2",
    type: "claim_approved",
    title: "PM Kisan Samman Nidhi approved",
    description: "Your benefit is now being processed for disbursal.",
    createdAt: "2026-07-05T14:10:00",
    read: false,
  },
  {
    id: "n3",
    type: "scheme_recommendation",
    title: "New match: PM Awas Yojana",
    description: "Based on your profile, you're a 79% match for this housing scheme.",
    createdAt: "2026-07-04T11:00:00",
    read: false,
  },
  {
    id: "n4",
    type: "claim_updated",
    title: "Ayushman Bharat (PM-JAY) is under review",
    description: "The department has started verifying your submitted details.",
    createdAt: "2026-07-03T08:45:00",
    read: true,
  },
  {
    id: "n5",
    type: "eligibility_reminder",
    title: "Your eligibility profile could be stronger",
    description: "Complete your profile to unlock more precise AI match scores.",
    createdAt: "2026-06-29T17:20:00",
    read: true,
  },
  {
    id: "n6",
    type: "platform_update",
    title: "ClaimIt now covers 20,000+ schemes",
    description: "We've expanded our database with hundreds of new state-level schemes.",
    createdAt: "2026-06-22T10:00:00",
    read: true,
  },
];

function timeAgoLabel(isoDateTime) {
  const diffMinutes = Math.floor((Date.now() - new Date(isoDateTime).getTime()) / 60000);
  if (diffMinutes < 1) return "just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  const weeks = Math.floor(diffDays / 7);
  return `${weeks}w ago`;
}

const FILTERS = ["All", "Unread"];

function Notifications() {
  usePageTitle("Notifications");
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setNotifications(MOCK_NOTIFICATIONS);
      setLoading(false);
    }, 700);
    return () => window.clearTimeout(timer);
  }, []);

  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications]);

  const visibleNotifications = useMemo(() => {
    const sorted = [...notifications].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    return filter === "Unread" ? sorted.filter((n) => !n.read) : sorted;
  }, [notifications, filter]);

  function markRead(id) {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  return (
    <Section className="pt-10 pb-20 lg:pt-14 lg:pb-28">
      <Container className="flex flex-col gap-8">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
          <Badge variant="soft">
            <Bell className="h-3.5 w-3.5" />
            Stay Updated
          </Badge>
          <h1 className="text-balance text-display-sm font-bold text-ink dark:text-white sm:text-display-md">
            Notifications
          </h1>
          <p className="text-lg leading-relaxed text-gray-500 dark:text-[#B5B5B5]">
            New matches, claim updates, and reminders — all in one place.
          </p>
        </div>

        <AccountTabs />

        {loading ? (
          <NotificationsSkeleton />
        ) : notifications.length === 0 ? (
          <EmptyState
            icon={Bell}
            title="You're all caught up"
            description="New scheme matches, claim updates, and reminders will show up here."
          />
        ) : (
          <>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-2.5">
                {FILTERS.map((f) => (
                  <CategoryChip key={f} label={f} active={filter === f} onClick={() => setFilter(f)} />
                ))}
              </div>
              <Button variant="ghost" size="sm" onClick={markAllRead} disabled={unreadCount === 0}>
                <CheckCheck className="h-4 w-4" />
                Mark all as read
              </Button>
            </div>

            {visibleNotifications.length > 0 ? (
              <Card className="flex flex-col gap-2 p-3 sm:p-4">
                {visibleNotifications.map((n) => (
                  <NotificationItem
                    key={n.id}
                    type={n.type}
                    title={n.title}
                    description={n.description}
                    timeLabel={timeAgoLabel(n.createdAt)}
                    read={n.read}
                    onClick={() => markRead(n.id)}
                  />
                ))}
              </Card>
            ) : (
              <EmptyState
                icon={CheckCheck}
                title="No unread notifications"
                description="You've read everything — switch back to All to see your full history."
              />
            )}
          </>
        )}
      </Container>
    </Section>
  );
}

function NotificationsSkeleton() {
  return (
    <Card className="flex flex-col gap-3 p-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-start gap-3.5 rounded-2xl p-4">
          <div className="h-10 w-10 shrink-0 animate-pulse rounded-xl bg-gray-100 dark:bg-white/[0.06]" />
          <div className="flex flex-1 flex-col gap-2">
            <div className="h-4 w-1/2 animate-pulse rounded-full bg-gray-100 dark:bg-white/[0.06]" />
            <div className="h-3 w-3/4 animate-pulse rounded-full bg-gray-100 dark:bg-white/[0.06]" />
            <div className="h-3 w-16 animate-pulse rounded-full bg-gray-100 dark:bg-white/[0.06]" />
          </div>
        </div>
      ))}
    </Card>
  );
}

export default Notifications;
