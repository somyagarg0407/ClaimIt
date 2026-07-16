import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Bookmark, Compass, SearchX } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SearchBar } from "@/components/shared/SearchBar";
import { CategoryChip } from "@/components/shared/CategoryChip";
import { SavedSchemeCard } from "@/components/shared/SavedSchemeCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { Pagination } from "@/components/shared/Pagination";
import { getSchemeBySlug, CATEGORIES } from "@/lib/schemes";
import { usePageTitle } from "@/lib/usePageTitle";

const PAGE_SIZE = 6;

// Mock personal collection — replace with a real GET /api/saved-schemes
// call (auth'd via JWT) once the backend exists. `level` is kept here
// rather than added to lib/schemes.js since Discover/Scheme Details don't
// need it yet and this task shouldn't touch shared catalog data.
const MOCK_SAVED = [
  {
    slug: "pm-kisan-samman-nidhi",
    level: "Central",
    savedAt: "2026-07-04",
    whyRecommended: "Matches your income bracket and farming occupation.",
  },
  {
    slug: "ayushman-bharat-pm-jay",
    level: "Central",
    savedAt: "2026-06-28",
    whyRecommended: "Strong fit based on your household income profile.",
  },
  {
    slug: "national-scholarship-portal",
    level: "Central",
    savedAt: "2026-06-20",
    whyRecommended: "Aligned with your education level and income bracket.",
  },
  {
    slug: "sukanya-samriddhi-yojana",
    level: "Central",
    savedAt: "2026-06-10",
    whyRecommended: "Popular among families in your state.",
  },
  {
    slug: "pm-awas-yojana",
    level: "Central",
    savedAt: "2026-05-25",
    whyRecommended: "Matches your housing status and income criteria.",
  },
  {
    slug: "pm-mudra-yojana",
    level: "Central",
    savedAt: "2026-05-01",
    whyRecommended: "Great fit for your self-employed profile.",
  },
  {
    slug: "disability-pension-scheme",
    level: "State",
    savedAt: "2026-04-15",
    whyRecommended: "Matches the disability status on your profile.",
  },
];

function relativeSavedLabel(isoDate) {
  const diffDays = Math.floor((Date.now() - new Date(isoDate).getTime()) / 86400000);
  if (diffDays <= 0) return "today";
  if (diffDays === 1) return "yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  const weeks = Math.floor(diffDays / 7);
  if (weeks < 5) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  const months = Math.floor(diffDays / 30);
  return `${months} month${months > 1 ? "s" : ""} ago`;
}

function MySchemes() {
  usePageTitle("My Schemes");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [savedSlugs, setSavedSlugs] = useState(() => MOCK_SAVED.map((r) => r.slug));
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Saved");
  const [page, setPage] = useState(1);

  // Simulates the initial GET /api/saved-schemes fetch.
  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 800);
    return () => window.clearTimeout(timer);
  }, []);

  const savedRecords = useMemo(
    () =>
      MOCK_SAVED.filter((r) => savedSlugs.includes(r.slug))
        .map((r) => {
          const scheme = getSchemeBySlug(r.slug);
          if (!scheme) return null;
          return { ...scheme, ...r, savedLabel: relativeSavedLabel(r.savedAt) };
        })
        .filter(Boolean),
    [savedSlugs]
  );

  const availableCategories = useMemo(() => {
    const unique = [...new Set(savedRecords.map((r) => r.category))];
    return ["All Saved", ...unique];
  }, [savedRecords]);

  const filteredRecords = useMemo(() => {
    const query = search.trim().toLowerCase();
    return savedRecords.filter((r) => {
      const matchesCategory = activeCategory === "All Saved" || r.category === activeCategory;
      const matchesSearch = !query || r.title.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [savedRecords, search, activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visibleRecords = filteredRecords.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  function handleSearchChange(value) {
    setSearch(value);
    setPage(1);
  }

  function handleCategoryChange(label) {
    setActiveCategory(label);
    setPage(1);
  }

  function handleRemove(slug) {
    // Optimistic update — remove immediately, then (once the backend
    // exists) fire DELETE /api/saved-schemes/:slug and roll this back on
    // failure with a toast, e.g. setSavedSlugs((prev) => [...prev, slug]).
    setSavedSlugs((prev) => prev.filter((s) => s !== slug));
  }

  const hasAnySaved = savedSlugs.length > 0;

  return (
    <Section className="pt-10 pb-20 lg:pt-14 lg:pb-28">
      <Container className="flex flex-col gap-8">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
          <Badge variant="soft">
            <Bookmark className="h-3.5 w-3.5" />
            Your Saved Collection
          </Badge>
          <h1 className="text-balance text-display-sm font-bold text-ink dark:text-white sm:text-display-md">
            My Schemes
          </h1>
          <p className="text-lg leading-relaxed text-gray-500 dark:text-[#B5B5B5]">
            The opportunities you&apos;ve saved — review, compare, and apply whenever you&apos;re
            ready.
          </p>
          {!loading && hasAnySaved && (
            <p className="text-sm text-gray-400 dark:text-[#8A8A8A]">
              <span className="tabular-mono font-semibold text-ink dark:text-white">{savedRecords.length}</span>{" "}
              scheme{savedRecords.length === 1 ? "" : "s"} saved
            </p>
          )}
        </div>

        {loading && <SavedSchemesSkeleton />}

        {!loading && !hasAnySaved && (
          <EmptyState
            icon={Bookmark}
            title="You haven't saved any schemes yet"
            description="Explore personalized recommendations and build your own collection of schemes worth applying to."
            actionLabel="Explore Schemes"
            onAction={() => navigate("/discover")}
          />
        )}

        {!loading && hasAnySaved && (
          <>
            <div className="flex flex-col gap-6">
              <SearchBar
                value={search}
                onChange={handleSearchChange}
                placeholder="Search your saved schemes..."
              />

              <div className="no-scrollbar -mx-6 flex gap-2.5 overflow-x-auto px-6 sm:mx-0 sm:flex-wrap sm:px-0">
                {availableCategories.map((label) => {
                  const categoryMeta = CATEGORIES.find((c) => c.label === label);
                  return (
                    <CategoryChip
                      key={label}
                      label={label}
                      icon={categoryMeta?.icon}
                      active={activeCategory === label}
                      onClick={() => handleCategoryChange(label)}
                    />
                  );
                })}
              </div>
            </div>

            {visibleRecords.length > 0 ? (
              <div className="flex flex-col gap-8">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <AnimatePresence initial={false}>
                    {visibleRecords.map((record) => (
                      <motion.div
                        key={record.slug}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <SavedSchemeCard {...record} onRemove={() => handleRemove(record.slug)} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <Pagination page={currentPage} totalPages={totalPages} onChange={setPage} />
              </div>
            ) : (
              <EmptyState
                icon={SearchX}
                title="No saved schemes match your search"
                description="Try a different keyword or clear the category filter to see the rest of your collection."
                actionLabel="Clear filters"
                onAction={() => {
                  setSearch("");
                  setActiveCategory("All Saved");
                  setPage(1);
                }}
              />
            )}

            <Card className="flex flex-col items-center gap-4 p-8 text-center sm:flex-row sm:justify-between sm:text-left">
              <div className="flex flex-col gap-1">
                <span className="flex items-center justify-center gap-2 text-sm font-semibold text-ink sm:justify-start">
                  <Compass className="h-4 w-4 text-brand-600 dark:text-brand-400" strokeWidth={2} />
                  Keep exploring
                </span>
                <p className="text-sm text-gray-500 dark:text-[#B5B5B5]">
                  There are 20,000+ schemes waiting to be discovered — new matches show up as your
                  profile improves.
                </p>
              </div>
              <Button as={Link} to="/discover" variant="secondary" className="w-full shrink-0 sm:w-auto">
                Explore Schemes
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Card>
          </>
        )}
      </Container>
    </Section>
  );
}

function SavedSchemesSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="flex flex-col gap-5 p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3.5">
              <div className="h-11 w-11 shrink-0 animate-pulse rounded-xl bg-gray-100 dark:bg-white/[0.06]" />
              <div className="flex flex-col gap-2 pt-0.5">
                <div className="h-4 w-24 animate-pulse rounded-full bg-gray-100 dark:bg-white/[0.06]" />
                <div className="h-4 w-40 animate-pulse rounded-full bg-gray-100 dark:bg-white/[0.06]" />
              </div>
            </div>
            <div className="h-9 w-9 shrink-0 animate-pulse rounded-full bg-gray-100 dark:bg-white/[0.06]" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-3 w-full animate-pulse rounded-full bg-gray-100 dark:bg-white/[0.06]" />
            <div className="h-3 w-2/3 animate-pulse rounded-full bg-gray-100 dark:bg-white/[0.06]" />
          </div>
          <div className="h-16 w-full animate-pulse rounded-xl bg-gray-100 dark:bg-white/[0.06]" />
          <div className="h-9 w-full animate-pulse rounded-xl bg-gray-100 dark:bg-white/[0.06]" />
        </Card>
      ))}
    </div>
  );
}

export default MySchemes;
