# Amber Property Corner — Luxury Real Estate & Architectural Estates Platform

An architecturally refined, luxury real estate web platform built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. Designed following the Neuform design system (earthy paper tones, stratified glass, Inter & JetBrains Mono typography, and 7xl guide-rail framing).

---

## ✨ Features

- **🏛️ Curated Properties Catalog (`/properties`):**
  - Real-time multi-parameter search & filtering (Location, Architecture Style, Bedrooms, Status).
  - Dynamic sorting (Price High/Low, Square Footage, Newest).
  - Responsive 3-column listing cards with swipeable image carousels, spec tags, and one-click shortlist save.

- **🏡 Immersive Property Detail Page (`/properties/[slug]`):**
  - High-definition architectural photo masonry with full-screen lightbox modal.
  - Key architectural specs grid (Bedrooms, Bathrooms, Living Area, Year Built, Parking, Energy Rating).
  - Interactive **Floor Plan Viewer** with floor level switcher.
  - Real-time **Home Loan & Mortgage Calculator** with live amortization sliders.
  - Sticky Listing Advisor Card & **Schedule Private Viewing Modal** (In-Person / 4K Virtual Tour).

- **📍 Metropolitan Enclave Guides (`/neighborhoods` & `/[slug]`):**
  - Comprehensive district overviews, lifestyle context, and signature highlights.
  - Micro-market metrics (Average $/Sq Ft, 12-month appreciation, walkability & transit scores).
  - Filtered localized property listings.

- **📊 Instant Property Valuation Tool (`/valuation`):**
  - Multi-step interactive estimator evaluating property category, dimensions, finishes, and premium amenities.
  - Algorithmic valuation calculation delivering estimated offering ranges and price per sqft metrics.

- **💼 Private Client Services & Representation (`/services`):**
  - Detailed advisory protocols for confidential acquisitions, bespoke divestment, and architectural development.

- **🤝 About & Private Concierge (`/about`, `/contact`, `/saved`):**
  - Architectural curation philosophy and Senior Managing Partner profiles.
  - Encrypted client consultation form with non-disclosure protections.
  - Client shortlist collection manager backed by `localStorage`.

---

## 🎨 Design System & Visual Tokens

| Token | Specification | Value |
| :--- | :--- | :--- |
| **Canvas Background** | Earthy Paper Tone | `#f5efe6` |
| **Card Surface** | Warm Stone Parchment | `#fbf6f0` / `#fcf8f1` |
| **Dark Ground Base** | Deep Mahogany Black | `#1F1B16` |
| **Primary Accent** | Rich Mahogany | `#5c3822` |
| **Secondary Accent**| Deep Moss Green | `#2e3a2f` |
| **Subtle Borders** | Sand & Taupe Tint | `#d8cebe` / `#d7cbbb` |
| **Display Font** | Inter (Medium, Tight Tracking) | `display-lg` (64px, 1.04) |
| **Body Font** | Inter / System UI | `body-md` (14-16px, 1.6-1.75) |
| **Metadata Font** | JetBrains Mono (Uppercase) | `label-md` (12px, tracking 0.18em) |
| **Depth & Glass** | Stratified Linear Gradient + Inset Light | `backdrop-blur-xl`, `inset 0 1px 0 rgba(255,255,255,0.75)` |

---

## 🛠️ Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + Custom CSS Custom Properties
- **Icons:** [Lucide React](https://lucide.dev/)
- **Motion:** [Framer Motion](https://www.framer.com/motion/) (Word-by-word staggered reveal sequence)
- **Interactive Effects:** [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Backdrop:** Procedural WebGL Shader Canvas with reduced-motion fallback

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── layout.tsx                # Root layout (Fonts, WebGL background, Guide-rails, Nav, Footer)
│   ├── page.tsx                  # Landing / Home page
│   ├── globals.css               # Design tokens & stratified glass utility classes
│   ├── properties/
│   │   ├── page.tsx              # Properties catalog with live filtering
│   │   └── [slug]/page.tsx       # Property detail (Gallery, Floor plans, Calculator, Booking)
│   ├── neighborhoods/
│   │   ├── page.tsx              # Neighborhood guides hub
│   │   └── [slug]/page.tsx       # Individual neighborhood profile & localized listings
│   ├── valuation/page.tsx        # Instant property valuation estimator
│   ├── services/page.tsx         # Private advisory & client representation
│   ├── about/page.tsx            # Brand heritage, curation standards & partners
│   ├── contact/page.tsx          # Private client consultation form & office details
│   └── saved/page.tsx            # Saved properties shortlist collection
├── components/
│   ├── common/                   # HeaderNavbar, Footer, GuideRails, BackgroundCanvas
│   ├── properties/               # PropertyCard, SearchFilterBar, PropertyGallery, FloorPlanViewer, MortgageCalculator, ScheduleViewingModal
│   └── ui/                       # Button, Badge, GlassCard, Input, Select, Modal, TextReveal
├── data/
│   ├── mockProperties.ts         # Luxury listings data models
│   └── neighborhoods.ts          # Neighborhood profiles & market stats
├── lib/
│   └── utils.ts                  # Currency formatting, Tailwind utilities, mortgage math
└── types/
    └── index.ts                  # Core TypeScript interfaces (Property, Neighborhood, Filter, etc.)
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17+ or 20+
- npm, pnpm, or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ahmed-husssain/RealEstate-.git
   cd RealEstate-
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm run start
```

---

## 📄 License

This project is created for Amber Property Corner. All rights reserved.
