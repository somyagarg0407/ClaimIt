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
                  Section, Select, Accordion, Input, PasswordInput,
                  ProgressSteps, SectionHeading, DrawerItem, Switch
    layout/       Navbar, Footer, NavigationDrawer — persistent across every page
    shared/       Domain components reused across pages: SchemeCard, FeatureCard,
                  ScoreRing (the eligibility-score gauge), EligibilityDashboard,
                  SearchBar, CategoryChip, FilterPanel, RecommendationBanner,
                  SchemeResultCard, SavedSchemeCard, ClaimCard, EmptyState,
                  Pagination, AuthCard, AuthDivider, SocialLoginButton,
                  PlaceholderPage, AccountTabs, FormSection, NotificationItem
    sections/     Landing-page-specific blocks: Hero, HowItWorks, Features,
                  PopularSchemes, CTA
  pages/          One component per route — Home, Discover, Scheme Details,
                  Login, Eligibility, My Schemes, My Claims, Help, Profile,
                  Notifications and Settings are fully built; the rest are
                  generic ComingSoon placeholders (see below)
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
- **Login** (`/login`) — email/password with inline validation, a show/hide
  password toggle, Remember me, Forgot password, a UI-only "Continue with
  Google" option, and a security note. On valid submit it simulates a
  request (there's no backend yet) and redirects home — swap that
  `setTimeout` in `pages/Login.jsx` for the real auth call once the
  Node/Express API exists. `/register` and `/forgot-password` are wired to
  `ComingSoon` placeholders so both links on the page already resolve to
  something.
- **Eligibility** (`/eligibility`) — a 3-step guided form (`ProgressSteps`
  shows progress) that reuses `FilterPanel`'s `FILTER_FIELDS` for the
  state/age/gender/occupation/income/category questions, plus
  locally-defined education/minority/disability options (Discover's
  `FilterPanel` doesn't have those fields yet, so they live in
  `pages/Eligibility.jsx` rather than growing that shared component further).
  Submitting shows a skeleton loading state, then an AI-style result: a
  `ScoreRing` match score, a plain-English "why this result" checklist, and
  the top 3 real schemes for the chosen category (reusing `SchemeCard`).
  `computeEligibility()` is a clearly-commented mock heuristic — swap it for
  a real `POST /api/eligibility/check` call once the backend exists; nothing
  else on the page needs to change.
- **My Schemes** (`/claims`) — the user's saved-schemes collection: search,
  category chips (derived from whatever categories are actually saved, not
  the full Discover taxonomy), a skeleton loading state, optimistic
  remove-from-saved (via the new `SavedSchemeCard`, with a fade-out handled
  by Framer Motion's `AnimatePresence`), and two distinct empty states —
  "never saved anything" vs. "search/filter matched nothing." Backed by a
  clearly-commented `MOCK_SAVED` array in `pages/MySchemes.jsx`; swap it for
  a real `GET /api/saved-schemes` call (and wire `handleRemove`'s optimistic
  update to a real `DELETE` with rollback-on-failure) once the backend
  exists. Deliberately reuses `lib/schemes.js` as-is rather than adding a
  Central/State field there — that mapping lives locally in the page since
  Discover and Scheme Details don't need it (yet).

`SchemeResultCard`'s "View Details" button and the related-schemes grid both
link to `/schemes/:slug` using the existing `Button`/`Card` `as={Link}`
pattern — no extra routing glue needed when a new scheme is added to the data
file. The Navbar's Login button now uses the same pattern to link to `/login`.

## Navigation & application integration

A dedicated sprint made every CTA across the app actually navigate, and
added a full navigation drawer:

- **Fixed dead buttons**: Hero's "Check Eligibility"/"Explore Schemes", the
  bottom CTA banner, "View all schemes" on the landing page, and the
  Navbar's "Register"/"Check Eligibility" buttons all now link somewhere
  real. Search and Bell in the Navbar link to `/discover` and
  `/notifications` respectively.
- **`NavigationDrawer`** (`layout/`) — triggered by a hamburger beside the
  logo, visible at every breakpoint. It's a strict superset of the old
  mobile-only nav toggle (same links, plus a "My Activity" and "Account"
  section), so it now serves as the single mobile navigation surface —
  running two different hamburgers side by side on small screens would
  have added exactly the clutter this sprint was meant to remove. Handles
  Escape-to-close, backdrop click-to-close, body scroll lock, and closes
  itself on route change. `Logout` is intentionally rendered disabled with
  a "Soon" badge — there's no auth session to log out of yet.
- **Active-state highlighting** in both the top Navbar and the drawer via
  `useLocation()` — same `isActive()` shape in both, so they can't drift
  out of sync.
- **Route reorganization**: the saved-schemes page moved from `/claims` to
  `/my-schemes` (matching the drawer's "My Activity" section, which
  distinguishes saved schemes from actual submitted applications). The old
  `/claims` now redirects via `<Navigate replace />` so no existing link or
  bookmark 404s. Added `/my-claims`, `/profile`, `/notifications`,
  `/settings` — all premium placeholders (see below), not generic
  ComingSoon dead-ends.
- **`shared/PlaceholderPage`** — the reusable template behind Profile,
  Notifications and Settings. Each supplies its own icon, title and
  description, then gets the same "Under Development" badge and a
  "Back to Discover" CTA — a considered placeholder, not a dead end. (My
  Claims used this template too until it was replaced by the real page —
  see below.)
- **"How It Works" fix**: this anchor only exists on Home, so linking to it
  from any other page previously did nothing. It now links to
  `/#how-it-works`, and `pages/Home.jsx` has a small effect that
  scroll-to's the section on mount when that hash is present.

## My Claims (`/my-claims`)

The application tracker — deliberately built as `My Schemes`'s sister page:
same `Section`/`Container` rhythm, header treatment, skeleton shape,
`EmptyState` reuse, and bottom "keep exploring" `Card`. The one structural
difference is a status-summary bar instead of search/category chips — a
short claims list benefits more from an at-a-glance count than a search box.

- **`shared/ClaimCard`** — status badge, a reused `ProgressSteps` bar
  (the same component built for Eligibility's wizard, now repurposed to
  show the claim pipeline: Submitted → Documents Verified → Department
  Review → Approved → Benefit Released), a plain-English "next action"
  note, an AI Match / processing-time stat row, and a conditional
  "Continue" button (Draft/Documents Required only). Draft and Rejected
  skip the progress bar since they've never entered, or exited, that
  pipeline — showing a partially-filled bar for either would misrepresent
  the claim.
- **Every one of the 7 statuses** (Draft, Submitted, Documents Required,
  Under Review, Approved, Rejected, Completed) is differentiated using only
  `Badge` variant + icon shape — no red/green/yellow anywhere.
- **Loading, empty, and error states** are all built: `fetchClaims()` in
  `pages/MyClaims.jsx` is already shaped like a real `GET /api/claims`
  call, including the error branch — swap the mock body for a real request
  and the error/retry UI works without any other change.

## Account & Support module (Help, Profile, Notifications, Settings)

Built together as one module — all four share `shared/AccountTabs` (a pill
row reusing `CategoryChip` as-is, navigated via `useNavigate` rather than
turning that component into a `Link`) directly under their header, so
moving between them feels like one section of the app rather than four
separate pages.

- **Help** (`/help`) — `SearchBar` filters a real `Accordion` FAQ list
  client-side; "Getting Started" reuses `FeatureCard` (now with a prop
  spread so it can act as `as={Link}`, same minimal pattern already used
  by `SchemeCard`) linking straight into Discover/Eligibility/My
  Schemes/My Claims.
- **Profile** (`/profile`) — reuses `FilterPanel`'s exported `FILTER_FIELDS`
  for State/Occupation/Income so these options can't drift from Discover's.
  "Category" here is the standard Indian-government social/reservation
  category (General/OBC/SC/ST/EWS) — deliberately a local option list,
  distinct from `lib/schemes.js`'s scheme categories, which power
  "Interested Scheme Categories" instead (toggled via `CategoryChip`, no
  new multi-select component needed). Save/Cancel simulate a
  `PATCH /api/profile` call.
- **Notifications** (`/notifications`) — new `shared/NotificationItem`
  per row; 6 notification types differentiated by icon only (no color
  coding). All/Unread filter and "Mark all as read" are fully wired against
  local state; `pages/Notifications.jsx`'s mock feed is shaped like a real
  `GET /api/notifications` response.
- **Settings** (`/settings`) — new `ui/Switch` (didn't exist before;
  a real accessible toggle built on a native checkbox) for notification
  preferences, grouped with Profile's forms under the new
  `shared/FormSection` wrapper so both pages' "sections of settings" read
  as the same pattern. Change Password, Logout and Delete Account render
  disabled with a muted note — mirroring the drawer's existing
  disabled-Logout treatment rather than inventing a different style.

**Fixed bug**: the navigation drawer had no Login/Register presence at
all — desktop keeps those in the Navbar's `hidden lg:flex` cluster, but
since the drawer is the *only* mobile nav surface, logged-out mobile users
previously had no way to reach either. `NavigationDrawer.jsx` now has a
Login/Register button pair at the bottom, with a `TODO(auth)` comment
marking where to hide this section (and make the existing disabled Logout
functional) once real JWT session state exists.

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
color outside this table — the one deliberate exception is the real
multi-color Google mark inside `SocialLoginButton`, reproduced in its actual
brand colors because a recolored, unrecognizable Google logo would undermine
the trust a login page is supposed to build. Form error states also stay
on-palette: they use `ink` (black), never red.

Type: `font-display` (Sora) for all headings, `font-sans` (Inter) for body
copy, and `.tabular-mono` (JetBrains Mono) for every numeric data point —
percentages, currency, counts. That mono treatment is intentional: it's the
site's signature detail, tying every "data" moment (eligibility score, match
%, benefit amount) back to the product's AI/data-driven identity. Keep using
it whenever a new page surfaces a number.

## Extending with new pages

The Navbar and Footer already link to the full future IA (`/discover`,
`/eligibility`, `/claims`, `/help`, `/about`, `/contact`, `/register`,
`/forgot-password`, legal pages). `/discover`, `/schemes/:slug` and `/login`
are now real pages; the rest still resolve to a shared `ComingSoon`
placeholder registered in `App.jsx`. To ship one of those — Register is the
natural next one, and can reuse `AuthCard` / `AuthDivider` /
`SocialLoginButton` / `Input` / `PasswordInput` directly:

1. Build `src/pages/Register.jsx` using the existing `ui/` and `shared/`
   components.
2. In `App.jsx`, swap `<ComingSoon title="Register" />` for `<Register />` on
   the matching `<Route>`.

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
