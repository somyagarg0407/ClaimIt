import { useMemo, useRef, useState } from "react";
import { Compass } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { SearchBar } from "@/components/shared/SearchBar";
import { CategoryChip } from "@/components/shared/CategoryChip";
import { FilterPanel, DEFAULT_FILTERS } from "@/components/shared/FilterPanel";
import { RecommendationBanner } from "@/components/shared/RecommendationBanner";
import { SchemeResultCard } from "@/components/shared/SchemeResultCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { Pagination } from "@/components/shared/Pagination";
import { CATEGORIES, SCHEMES } from "@/lib/schemes";
import { usePageTitle } from "@/lib/usePageTitle";

const PAGE_SIZE = 6;

function Discover() {
  usePageTitle("Discover");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Schemes");
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const filterPanelRef = useRef(null);

  const filteredSchemes = useMemo(() => {
    const query = search.trim().toLowerCase();
    return SCHEMES.filter((scheme) => {
      const matchesCategory = activeCategory === "All Schemes" || scheme.category === activeCategory;
      const matchesSearch =
        !query ||
        scheme.title.toLowerCase().includes(query) ||
        scheme.description.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredSchemes.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visibleSchemes = filteredSchemes.slice(
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

  function handleClearAll() {
    setSearch("");
    setActiveCategory("All Schemes");
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  }

  return (
    <Section className="pt-10 pb-20 lg:pt-14 lg:pb-28">
      <Container className="flex flex-col gap-10">
        {/* Page header */}
        <div className="flex flex-col gap-4">
          <Badge variant="soft">
            <Compass className="h-3.5 w-3.5" />
            20,000+ Schemes, One Search
          </Badge>
          <h1 className="text-balance text-display-sm font-bold text-ink dark:text-white sm:text-display-md">
            Discover Schemes
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-gray-500 dark:text-[#B5B5B5]">
            Search and filter every government scheme, scholarship and subsidy
            available to you — ranked by how well you match.
          </p>
        </div>

        {/* Search + category chips + filters */}
        <div className="flex flex-col gap-6">
          <SearchBar value={search} onChange={handleSearchChange} />

          <div className="no-scrollbar -mx-6 flex gap-2.5 overflow-x-auto px-6 sm:mx-0 sm:flex-wrap sm:px-0">
            {CATEGORIES.map((cat) => (
              <CategoryChip
                key={cat.label}
                label={cat.label}
                icon={cat.icon}
                active={activeCategory === cat.label}
                onClick={() => handleCategoryChange(cat.label)}
              />
            ))}
          </div>

          <div ref={filterPanelRef}>
            <FilterPanel
              values={filters}
              onChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))}
              onReset={() => setFilters(DEFAULT_FILTERS)}
            />
          </div>
        </div>

        {/* AI recommendation banner */}
        <RecommendationBanner
          matchCount={filteredSchemes.length}
          profileScore={82}
          onImprove={() =>
            filterPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
          }
        />

        {/* Results */}
        {visibleSchemes.length > 0 ? (
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleSchemes.map((scheme) => (
                <SchemeResultCard key={scheme.slug} {...scheme} />
              ))}
            </div>
            <Pagination page={currentPage} totalPages={totalPages} onChange={setPage} />
          </div>
        ) : (
          <EmptyState
            title="No schemes match your search"
            description="Try a different keyword, clear the category filter, or reset everything to see all 20,000+ schemes."
            actionLabel="Clear all filters"
            onAction={handleClearAll}
          />
        )}
      </Container>
    </Section>
  );
}

export default Discover;
