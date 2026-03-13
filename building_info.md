# Metademic — Building Information & Coding Guide

> **Purpose:** This document is the single source of truth for any AI model or developer working on this codebase. It describes the project's intent, tech stack, architecture, design system, coding conventions, and file structure so you can contribute without breaking existing patterns.

---

## 1. Project Overview

**Metademic** is an open-access academic publishing platform website, built as a clone of [MDPI.com](https://www.mdpi.com). It is a **static marketing / portal homepage** — not a full CMS. The site showcases journals, recent articles, news, and subject-based navigation in a layout faithful to MDPI's 3-column design.

- **Owner Location:** Dhaka, Bangladesh
- **Current Stage:** Homepage UI clone (frontend only, no backend data fetching yet)
- **Backend (planned):** Supabase (credentials in `.env.local`)

---

## 2. Tech Stack

| Layer              | Technology                | Version    | Notes                                      |
|--------------------|---------------------------|------------|--------------------------------------------|
| Framework          | **Next.js** (App Router)  | `16.1.6`   | Uses `src/app/` directory structure        |
| Language           | **TypeScript**            | `^5`       | Strict mode enabled in `tsconfig.json`     |
| UI Library         | **React**                 | `19.2.3`   |                                            |
| Styling            | **Tailwind CSS v4**       | `^4`       | Via `@tailwindcss/postcss`, imported with `@import "tailwindcss"` |
| Font               | **Open Sans**             | Google     | Loaded via `next/font/google` in `layout.tsx` |
| Icons              | **lucide-react**          | `^0.575.0` | All icons come from this library           |
| Date formatting    | **date-fns**              | `^4.1.0`   | Used in article cards                      |
| Animations (avail) | **framer-motion**         | `^12.34.3` | Installed but not heavily used yet         |
| CSS Utilities      | **clsx**, **tailwind-merge** |           | Available for conditional class merging    |
| Backend Client     | **@supabase/supabase-js** | `^2.98.0`  | Client in `src/lib/supabase.ts`            |
| Compiler           | **React Compiler**        | `1.0.0`    | Enabled via `reactCompiler: true` in `next.config.ts` |

### Commands

```bash
npm run dev      # Start development server (hot reload)
npm run build    # Create production build in .next/
npm start        # Serve the production build
npm run lint     # Run ESLint
```

---

## 3. Project Structure

```
f:\AI_AGENT\Metademic\
├── .env.local                  # Supabase credentials (NEXT_PUBLIC_*)
├── next.config.ts              # Next.js config (reactCompiler enabled)
├── package.json
├── tsconfig.json               # Path alias: @/* → ./src/*
├── schema.sql                  # Supabase database schema (for future use)
├── public/                     # Static assets (favicon, images)
├── src/
│   ├── app/
│   │   ├── globals.css         # 🎨 Design system — ALL colors, tokens, utilities
│   │   ├── layout.tsx          # Root layout — font loading, metadata
│   │   ├── page.tsx            # 🏠 Homepage — assembles all components
│   │   └── favicon.ico
│   ├── components/
│   │   ├── Navbar.tsx          # Top navigation bar
│   │   ├── Hero.tsx            # Blue hero banner + announcement + search bar
│   │   ├── LeftSidebar.tsx     # Journal list sidebar (left column)
│   │   ├── FeaturedCarousel.tsx# Auto-rotating featured article carousel
│   │   ├── ArticleCard.tsx     # Individual article listing card
│   │   ├── RightSidebar.tsx    # News, blog, special issues (right column)
│   │   ├── FeedbackBanner.tsx  # Dark overlay feedback carousel banner
│   │   ├── JournalsBySubject.tsx # Subject category grid with journal icons
│   │   └── Footer.tsx          # Multi-column footer with subscribe
│   └── lib/
│       └── supabase.ts         # Supabase client initialization
```

---

## 4. Design System & Color Palette

All design tokens are defined in `src/app/globals.css` as CSS custom properties and mapped to Tailwind via `@theme inline`.

### Color Tokens

| Token Name             | CSS Variable              | Hex Value   | Usage                                    |
|------------------------|---------------------------|-------------|------------------------------------------|
| `mdpi-blue`            | `--mdpi-blue`             | `#004a87`   | Primary brand — navbar, buttons, titles  |
| `mdpi-blue-light`      | `--mdpi-blue-light`       | `#2a7ab8`   | Hero gradient mid-point                  |
| `mdpi-blue-dark`       | `--mdpi-blue-dark`        | `#003366`   | Button hover, logo border                |
| `mdpi-green`           | `--mdpi-green`            | `#007b5e`   | "Open Access" badge, special issue links |
| `mdpi-maroon`          | `--mdpi-maroon`           | `#8b0000`   | "Article" type badge                     |
| `mdpi-gray-bg`         | `--mdpi-gray-bg`          | `#f0f2f5`   | Page background                          |
| `mdpi-gray-light`      | `--mdpi-gray-light`       | `#e8e8e8`   | Light borders, dividers                  |
| `mdpi-gray-text`       | `--mdpi-gray-text`        | `#555`      | Secondary text, meta info                |
| `mdpi-footer-bg`       | `--mdpi-footer-bg`        | `#2c3e50`   | Footer background                        |
| `mdpi-footer-dark`     | `--mdpi-footer-dark`      | `#1a252f`   | Bottom copyright bar                     |
| `mdpi-link-blue`       | `--mdpi-link-blue`        | `#0056b3`   | All clickable links                      |
| `mdpi-border`          | `--mdpi-border`           | `#ddd`      | Card borders, input borders              |
| `mdpi-text-dark`       | `--mdpi-text-dark`        | `#333`      | Headings, strong labels                  |
| `mdpi-text-body`       | `--mdpi-text-body`        | `#444`      | Default body text                        |

### How to Use Colors in Tailwind

All colors are available as Tailwind utility classes prefixed with `mdpi-`:

```tsx
// Backgrounds
className="bg-mdpi-blue"
className="bg-mdpi-gray-bg"

// Text
className="text-mdpi-text-dark"
className="text-mdpi-link-blue"

// Borders
className="border-mdpi-border"
```

### Hero Gradient

The hero banner uses an inline style gradient (not a Tailwind class):

```tsx
style={{ background: 'linear-gradient(135deg, #5b9bd5 0%, #2a7ab8 40%, #1a5276 100%)' }}
```

---

## 5. Typography

- **Font Family:** `Open Sans` (loaded via `next/font/google` as variable `--font-open-sans`)
- **Base Size:** `14px` (set on `body`)
- **Line Height:** `1.6`
- **No serif font is used.** All headings and body text use Open Sans.

### Common Font Sizes Used

| Size         | Where                                     |
|--------------|-------------------------------------------|
| `text-[11px]`| Badges, tiny metadata                     |
| `text-[12px]`| Dates, DOI links, footer text, copyright  |
| `text-[13px]`| Body text, sidebar links, search inputs   |
| `text-[14px]`| Nav links, more-links                     |
| `text-[15px]`| Search bar label                          |
| `text-[16px]`| Article titles, hero subtitle (mobile)    |
| `text-[17px]`| Carousel slide titles                     |
| `text-[18px]`| Section headers (h2), hero subtitle (lg)  |
| `text-[22px]`| Major section headers                     |
| `text-[32px]`| Hero h1 (mobile)                          |
| `text-[42px]`| Hero h1 (desktop)                         |

---

## 6. Layout Architecture

### Page Width
- Max width: `max-w-[1280px]` with `mx-auto px-4`
- This is the consistent wrapper used across all sections

### 3-Column Homepage Layout

```
┌──────────────────────────────────────────────────────────────┐
│                        NAVBAR (sticky)                       │
├──────────────────────────────────────────────────────────────┤
│                   ANNOUNCEMENT BANNER                        │
├──────────────────────────────────────────────────────────────┤
│                   HERO (gradient blue)                        │
├──────────────────────────────────────────────────────────────┤
│                   SEARCH BAR (white bg)                       │
├──────────────────────────────────────────────────────────────┤
│  LEFT SIDEBAR  │     CENTER CONTENT      │  RIGHT SIDEBAR    │
│  (220px fixed) │     (flex-1 fluid)      │  (260px fixed)    │
│                │                         │                    │
│  - Journal     │  - Featured Carousel    │  - News            │
│    search      │  - Recent Articles      │  - Blog Posts      │
│  - Browse by   │    (ArticleCard list)   │  - Special Issues  │
│    Indexing    │  - "More Articles..."   │  - Topical         │
│  - Browse by   │                         │    Collections     │
│    Subject     │                         │                    │
│  - Journal     │                         │                    │
│    list w/     │                         │                    │
│    colored     │                         │                    │
│    icons       │                         │                    │
├──────────────────────────────────────────────────────────────┤
│                   FEEDBACK BANNER (carousel)                  │
├──────────────────────────────────────────────────────────────┤
│                   JOURNALS BY SUBJECT                         │
│  Subject Tabs (left)  │  Journal Icon Grid (right)           │
├──────────────────────────────────────────────────────────────┤
│                         FOOTER                                │
│  5-column: Info | Guidelines | Initiatives | Social | Sub    │
├──────────────────────────────────────────────────────────────┤
│                   COPYRIGHT BAR (darker bg)                   │
└──────────────────────────────────────────────────────────────┘
```

### Responsive Behavior
- On `lg:` (1024px+): Full 3-column layout
- Below `lg`: Columns stack vertically (sidebars go full width)
- Nav links hide below `lg`, replaced by hamburger menu

---

## 7. Component Patterns & Conventions

### Server vs. Client Components

- **Server Components (default):** `page.tsx`, `layout.tsx`, `Footer.tsx`
- **Client Components (`'use client'`):** Any component with `useState`, `useEffect`, or event handlers:
  - `Navbar.tsx` — mobile menu toggle
  - `Hero.tsx` — search input state
  - `ArticleCard.tsx` — abstract expand/collapse
  - `FeaturedCarousel.tsx` — auto-play carousel
  - `FeedbackBanner.tsx` — banner carousel
  - `JournalsBySubject.tsx` — active category tab
  - `LeftSidebar.tsx` — (client for interactivity)
  - `RightSidebar.tsx` — (client, could be server)

### Component Structure Pattern

Every component follows this pattern:

```tsx
'use client'  // only if needed

import Link from 'next/link'
import { IconName } from 'lucide-react'
import { useState } from 'react'  // only if needed

// Types / interfaces defined inline at top
interface Props { ... }

// Static data arrays defined outside the component
const items = [ ... ]

// Single default export
export default function ComponentName() {
  // state hooks
  // return JSX
}
```

### Styling Convention

- **Primary method:** Tailwind utility classes directly in `className`
- **Pixel-specific values:** Use bracket syntax `text-[13px]`, `w-[220px]`, `h-[56px]`
- **Reusable classes:** Defined in `globals.css` (`.badge-open-access`, `.badge-article`, `.journal-icon`, `.carousel-dot`, `.subject-link`)
- **Inline styles:** Only for gradients and complex background patterns
- **No CSS Modules** — everything is Tailwind or global CSS
- **Link styling:** Always add `no-underline` to `<Link>` components, then selectively add `hover:underline`

### Data Pattern (Current)

All data is currently **hardcoded as static arrays** in:
- `page.tsx` — recent articles
- `LeftSidebar.tsx` — journal list with colors
- `RightSidebar.tsx` — news, blog posts, special issues
- `FeaturedCarousel.tsx` — carousel slides
- `FeedbackBanner.tsx` — banner slides
- `JournalsBySubject.tsx` — subject categories and journal grids

**Future plan:** Replace static arrays with Supabase queries using the client in `src/lib/supabase.ts`.

---

## 8. Key Design Details to Preserve

### Navbar
- Height: `56px`
- Logo: Single letter `M` in a `42x36px` dark blue rounded box (`text-[25px]`)
- "Sign In / Sign Up" is an **outlined** button (border only)
- "Submit" is a **filled** dark blue button
- Sticky with `z-50`

### Article Cards
- Two badges: Green "Open Access" + Maroon "Article"
- File info (pages, KB) aligned right
- Title in `mdpi-blue` bold
- Authors with "by" prefix, linked, last author joined with "and"
- Journal name in italic + year, volume(issue), DOI link, date
- Abstract has "Read more." / "Show less" toggle
- Green special issue references
- "Show Figures" expandable (visual only, not functional yet)

### Journal Icons
- `44x44px` colored squares with `border-radius: 6px`
- White abbreviated text centered
- Each journal has a unique color assigned in a `Record<string, string>` map

### Carousels
- Auto-rotate every 5 seconds (`FeaturedCarousel`)
- Navigation arrows only visible on hover (opacity transition)
- Dot indicators at bottom

---

## 9. File Naming Conventions

| Item           | Convention                        | Example                     |
|----------------|-----------------------------------|-----------------------------|
| Components     | PascalCase `.tsx`                 | `ArticleCard.tsx`           |
| Pages          | `page.tsx` in route folder        | `src/app/page.tsx`          |
| Layouts        | `layout.tsx` in route folder      | `src/app/layout.tsx`        |
| CSS            | `globals.css`                     | `src/app/globals.css`       |
| Lib/Utilities  | camelCase `.ts`                   | `src/lib/supabase.ts`       |
| Config files   | Standard names                    | `next.config.ts`            |

---

## 10. Import Aliases

The project uses the `@/*` path alias mapping to `./src/*`:

```tsx
import Navbar from "@/components/Navbar"
import { supabase } from "@/lib/supabase"
```

---

## 11. Environment Variables

Stored in `.env.local` (git-ignored):

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_xxxxx
```

Both are `NEXT_PUBLIC_*` prefixed so they are available on the client side.

---

## 12. What NOT to Do

- ❌ Do NOT use serif fonts — the design is fully sans-serif (Open Sans)
- ❌ Do NOT add Tailwind config file (`tailwind.config.ts`) — Tailwind v4 uses CSS-based config via `@theme inline` in `globals.css`
- ❌ Do NOT change the `mdpi-` color naming convention — all Tailwind colors use this prefix
- ❌ Do NOT use external image URLs as placeholders — use colored divs or lucide icons
- ❌ Do NOT install additional UI libraries (shadcn, MUI, etc.) — the project uses raw Tailwind
- ❌ Do NOT convert server components to client without reason — only add `'use client'` when state/effects are needed
- ❌ Do NOT change the max-width from `1280px` — this is the consistent page container

---

## 13. What TO Do When Adding Features

1. **New components** → Create in `src/components/` with PascalCase naming
2. **New pages** → Create in `src/app/[route]/page.tsx` (App Router convention)
3. **New colors** → Add to both `:root` variables AND `@theme inline` block in `globals.css`
4. **Data from Supabase** → Import client from `@/lib/supabase`, fetch in server components or use `useEffect` in client components
5. **Icons** → Always use `lucide-react`, import individually: `import { IconName } from 'lucide-react'`
6. **Responsive** → Mobile-first, use `lg:` breakpoint for desktop 3-column layout changes

---

*Last updated: March 4, 2026*
