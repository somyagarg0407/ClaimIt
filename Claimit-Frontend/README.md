# ClaimIt — Marketing Site

_Find. Understand. Claim What's Yours._

An AI-powered platform that helps Indian citizens discover the government
schemes, scholarships, subsidies and pensions they're eligible for. This repo
is the public marketing/landing site, built as a scalable base for the rest
of the product (Discover, Eligibility, My Claims, Login/Register, etc.).

## Stack

- **React 18** + **Vite 5**
- **Tailwind CSS 3** — utility-first styling, brand tokens in `tailwind.config.js`
- **shadcn/ui-style primitives** — hand-rolled `Button` / `Card` / `Badge` built
  with `class-variance-authority`, following shadcn conventions so they're easy
  to swap for the CLI-generated versions later if you adopt the full shadcn toolchain
- **Framer Motion** — subtle fade-ups and scroll reveals only
- **Lucide Icons**
- **React Router 6** — route map ready for future pages

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build      # production build -> dist/
npm run preview    # serve the production build locally
```

## Project structure

```
src/
  components/
    ui/           Design-system primitives: Button, Card, Badge, Container,
                  Section, Select, Accordion
    layout/       Navbar, Footer — persistent across every page
    shared/       Domain components reused across pages: SchemeCard, FeatureCard,
                  ScoreRing (the eligibility-score gauge), EligibilityDashboard,
                  SearchBar, CategoryChip, FilterPanel, RecommendationBanner,
                  SchemeResultCard, EmptyState, Pagination
    sections/     Landing-page-specific blocks: Hero, HowItWorks, Features,
                  PopularSchemes, CTA
  pages/          One component per route — Home, Discover and Scheme Details
                  are fully built; the rest are ComingSoon placeholders (see below)
  lib/
    utils.js      cn() class-merging helper used by every component
    schemes.js    Single source of truth for scheme data (SCHEMES, CATEGORIES,
                  getSchemeBySlug, getRelatedSchemes) — both Discover and
                  Scheme Details read from here so they can't drift out of sync
  index.css       Tailwind layers, font setup, global base styles
  App.jsx         Route map
  main.jsx        Entry point
```

## Pages built so far

- **Home** (`/`) — marketing landing page.
- **Discover** (`/discover`) — search, category chips, filters, AI match
  banner, results grid with pagination.
- **Scheme Details** (`/schemes/:slug`) — full scheme profile: overview,
  eligibility, required documents, how-to-apply steps, FAQs, a sticky sidebar
  summary, and related schemes. Reads its data from `lib/schemes.js` by slug
  and shows a friendly not-found state (via the shared `EmptyState`) for an
  unknown slug.

`SchemeResultCard`'s "View Details" button and the related-schemes grid both
link to `/schemes/:slug` using the existing `Button`/`Card` `as={Link}`
pattern — no extra routing glue needed when a new scheme is added to the data
file.

## Design system

All brand colors, type scale, shadows and radii live in `tailwind.config.js`
under `theme.extend` — nothing is hard-coded as an arbitrary hex value in
components. Stick to this palette when adding new UI:

| Token         | Hex       | Use                                  |
|---------------|-----------|---------------------------------------|
| `brand-800`   | `#03045E` | Primary buttons, logo mark, headlines accent |
| `brand-700`   | `#023E8A` | Hover states on primary                |
| `brand-600`   | `#0077B6` | Links, highlighted text, icons         |
| `brand-500`   | `#0096C7` | Secondary accents                      |
| `brand-400`   | `#00B4D8` | Gradient endpoints, active states      |
| `brand-300`/`200`/`100`/`50` | `#48CAE4`…`#CAF0F8` | Soft backgrounds, badges, borders |
| `ink`         | `#000000` | Headings only (never gray)             |

Body copy uses Tailwind's neutral `gray-500`/`gray-600`. Never introduce a
color outside this table.

Type: `font-display` (Sora) for all headings, `font-sans` (Inter) for body
copy, and `.tabular-mono` (JetBrains Mono) for every numeric data point —
percentages, currency, counts. That mono treatment is intentional: it's the
site's signature detail, tying every "data" moment (eligibility score, match
%, benefit amount) back to the product's AI/data-driven identity. Keep using
it whenever a new page surfaces a number.

## Extending with new pages

The Navbar and Footer already link to the full future IA (`/discover`,
`/eligibility`, `/claims`, `/help`, `/about`, `/contact`, legal pages).
`/discover` and `/schemes/:slug` are now real pages; the rest still resolve to
a shared `ComingSoon` placeholder registered in `App.jsx`. To ship one of
those:

1. Build `src/pages/Eligibility.jsx` (for example) using the existing `ui/`
   and `shared/` components — and `lib/schemes.js` if it needs scheme data.
2. In `App.jsx`, swap `<ComingSoon title="Eligibility" />` for
   `<Eligibility />` on the matching `<Route>`.

No other wiring is required — navigation, footer links and layout are already
in place.

## Notes

- Login/Register are currently non-functional buttons in the Navbar — wire
  them up to your auth flow when it's ready.
- "My Claims" intentionally does **not** appear in the Navbar for logged-out
  visitors, per the product brief; add it conditionally once auth state
  exists.
- Animations are intentionally restrained (fade-ups, hover lifts, one
  scroll-triggered ring animation) — avoid adding floating/particle/3D
  effects, per the design brief.
