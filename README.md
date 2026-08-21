# United Hormone — Premium Performance & Pharmaceutical Web Application

A modern, high-performance web showcase for **United Hormone**, designed with ultra-premium aesthetics, smooth GSAP animations, Lenis smooth scrolling, and full mobile responsiveness.

---

## 🌟 Key Features & Components

- **Cinematic Hero Section (`HeroSection.tsx`)**
  - High-impact visual header with dark gradient overlays, subtle motion effects, and quick-action CTAs to explore products or verify batch authenticity.

- **Brand Mindset & Story (`AboutSection.tsx`)**
  - Interactive multi-layer parallax section driven by GSAP ScrollTrigger, highlighting pharmaceutical integrity and hardcore athletic performance.

- **Brand Values Marquee (`MarqueeSection.tsx`)**
  - Continuous infinite text marquee showcasing brand pillars: *HPLC Verified*, *Pharmaceutical Grade*, *99%+ Purity*, *Zero Fillers*.

- **Interactive Product Categories (`ProductCategoriesSection.tsx`)**
  - Showcases product lines (**Anabolics**, **SARMs**, **Peptides**) with dynamic, mouse-following 1:1 image preview overlays.

- **Assay Quality & Standards (`QualitySection.tsx`)**
  - Multi-column presentation outlining HPLC assay testing, sterile filtration, and batch consistency standards.

- **Featured & New Arrivals Catalogs (`ProductCatalog.tsx` & `ProductDetailModal.tsx`)**
  - Clean product cards with interactive modals presenting compound specifications, dosages, and HPLC purity reports.

- **Product Authenticity Verification Portal (`VerifySection.tsx` & `VerifyModal.tsx`)**
  - Interactive modal enabling customers to input serial batch codes to verify third-party lab testing and certificate of analysis (COA).

- **Frequently Asked Questions (`FaqSection.tsx`)**
  - Accordion FAQ addressing authenticity checks, ordering, shipping, and lab testing parameters with smooth GSAP background parallax.

- **Adaptive Navigation & Footer (`Navbar.tsx` & `Footer.tsx`)**
  - Glassmorphic fixed navigation bar with mobile drawer support, direct section anchors (`#hero`, `#products`, `#about`, `#contact`, `#faq`), and quick action controls.

---

## 🛠️ Tech Stack & Libraries

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **UI & React**: [React 19](https://react.dev/)
- **Animations**: [GSAP (GreenSock Animation Platform)](https://gsap.com/) & [ScrollTrigger](https://gsap.com/scrolltrigger/)
- **Smooth Scroll**: [@studio-freight/lenis](https://lenis.darkroom.engineering/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS Design Tokens
- **Language**: [TypeScript](https://www.typescriptlang.org/)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18.x or higher) and `npm` installed.

### Installation

1. Navigate to the project directory:
   ```bash
   cd main
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server

Run the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📦 Production Build

To create an optimized production build:

```bash
npm run build
```

To run the built production app locally:

```bash
npm start
```

---

## 📁 Project Structure

```
main/
├── app/
│   ├── components/
│   │   ├── AboutSection.tsx            # Brand philosophy & parallax story
│   │   ├── FaqSection.tsx              # Interactive accordion FAQ
│   │   ├── Footer.tsx                  # Footer & contact section
│   │   ├── HeroSection.tsx            # Main hero banner
│   │   ├── Logo.tsx                    # Reusable SVG brand logo
│   │   ├── MarqueeSection.tsx          # Tilted infinite scroll marquee
│   │   ├── Navbar.tsx                  # Fixed glassmorphic navigation bar
│   │   ├── ProductCatalog.tsx          # Catalog grid for products
│   │   ├── ProductCategoriesSection.tsx# Category cards with hover preview
│   │   ├── ProductDetailModal.tsx      # Compound detail modal
│   │   ├── QualitySection.tsx          # Quality & lab standards breakdown
│   │   ├── SmoothScroll.tsx            # Lenis smooth scrolling wrapper
│   │   ├── VerifyModal.tsx             # Serial batch verification modal
│   │   └── VerifySection.tsx           # Verification CTA banner
│   ├── layout.tsx                      # Root layout & font configurations
│   ├── page.tsx                        # Main landing page route
│   └── globals.css                     # Design system tokens & global styling
├── public/                             # Static images, WebP assets & icons
└── package.json                        # Dependencies & scripts configuration
```

---

## 📜 License

Private & Proprietary — United Hormone. All rights reserved.
