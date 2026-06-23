# ExcelViz — Full Public Website Design Prompt
### For: Antigravity Development Team
### Project: ExcelViz Marketing Website + Auth Bridge to Dashboard

---

## 🧭 Project Context

**ExcelViz** (also called *Excel Vista Insights Hub*) is a full-stack enterprise-grade business intelligence platform. Users upload Excel spreadsheets (`.xls` / `.xlsx`), visualize their data in interactive 2D and 3D charts, and receive AI-generated business summaries powered by OpenAI.

The app dashboard already exists (built in React + Redux + Tailwind). This prompt covers the **public-facing marketing website** — a completely separate set of pages that showcase the product, convert visitors, and connect them into the dashboard via login/signup.

---

## 🎨 Global Design System

### Color Palette

| Role | Color | Hex |
|---|---|---|
| Background Primary | Pure White | `#FFFFFF` |
| Background Secondary | Off-White / Light Gray | `#F5F7FA` |
| Dark Surface | Near Black | `#0A0D14` |
| Dark Secondary | Deep Navy | `#0F1623` |
| Brand Blue (Primary Accent) | Electric Blue | `#2563EB` |
| Brand Blue (Hover) | Royal Blue | `#1D4ED8` |
| Brand Blue (Light / Glow) | Sky Blue Tint | `#DBEAFE` |
| Text Primary (Light BG) | Charcoal Black | `#111827` |
| Text Secondary (Light BG) | Slate Gray | `#6B7280` |
| Text Primary (Dark BG) | White | `#FFFFFF` |
| Text Secondary (Dark BG) | Light Slate | `#94A3B8` |
| Success / Positive | Emerald | `#10B981` |
| Warning / Highlight | Amber | `#F59E0B` |
| Border Light | Pale Gray | `#E5E7EB` |
| Border Dark | Dark Slate | `#1E293B` |

### Typography

- **Display / Hero Headings**: `Poppins` — Bold (700) and ExtraBold (800)
- **Section Headings**: `Poppins` — SemiBold (600)
- **Body Text**: `DM Sans` (a refined, geometric sans-serif — NOT Inter or Roboto)
- **Captions / Labels / Tags**: `DM Sans` — Medium (500), letter-spacing: 0.05em
- **Code / Data Snippets**: `JetBrains Mono` or `Fira Code`

> Load via Google Fonts: `Poppins:wght@400;500;600;700;800` and `DM+Sans:wght@400;500;600`

### Motion & Interactions

- **Page Load**: Staggered fade-up for hero elements (delay 0ms → 100ms → 200ms → 300ms)
- **Scroll**: Use `IntersectionObserver` to trigger fade-up + slight translate-Y on section cards
- **Hover States**: Blue glow box-shadow on cards (`0 0 0 2px #2563EB33`), smooth 200ms transitions
- **CTA Buttons**: Scale 1.02 on hover, slight brightness increase, smooth 150ms ease
- **Counters**: Animated number count-up when stats section enters viewport
- **Charts Preview**: Looping CSS animation simulating a live chart updating (subtle bar heights cycling)

### Layout & Spacing

- Max content width: **1280px**, centered with auto margins
- Horizontal padding: **24px** (mobile) → **48px** (tablet) → **80px** (desktop)
- Section vertical padding: **80px** top and bottom (desktop), **48px** (mobile)
- Grid: 12-column CSS Grid for complex layouts, Flexbox for components
- Border radius: `12px` for cards, `8px` for buttons/inputs, `999px` for pills/badges

---

## 📄 Page 1: Home / Landing Page (`/`)

### 1.1 Navigation Bar (Sticky)

**Layout**: Full-width sticky top nav with `backdrop-filter: blur(12px)` and `background: rgba(255,255,255,0.9)` on scroll (transparent on top).

**Left**: ExcelViz logo — `E` icon in a blue square (matching the dashboard icon) + "ExcelViz" in `Poppins 700`. Click → `/`

**Center Links** (desktop only):
- Product
- Solutions
- Pricing
- Blog
- About Us

**Right**:
- "Log In" link → `/login` (text style, dark color)
- "Get Started Free" button → `/register` (filled blue, `Poppins SemiBold`)

**Mobile**: Hamburger icon opens a full-screen slide-down menu with the same links.

---

### 1.2 Hero Section

**Layout**: Centered, two-zone layout. Top zone is text + CTA. Bottom zone is a large product screenshot / animation mockup.

**Background**: White base with a subtle blue radial gradient glow behind the headline (`radial-gradient(ellipse at 50% 0%, #DBEAFE 0%, transparent 70%)`). Add a very faint dot-grid pattern overlay for texture.

**Eyebrow Label**: Pill badge — `"🚀 Now Powered by OpenAI GPT-4"` in blue text on a `#DBEAFE` background.

**Headline** (H1, `Poppins 800`, ~60–72px desktop):
```
Turn Your Spreadsheets Into
Instant Business Intelligence.
```
The word **"Business Intelligence"** is in `#2563EB` (blue).

**Subheadline** (`DM Sans`, 20px, slate gray):
```
Upload any Excel workbook. Get stunning 2D & 3D visualizations,
AI-driven insights, and exportable reports — in seconds.
```

**CTA Buttons** (horizontal stack):
1. Primary: `"Start Analyzing Free"` → `/register` — Filled blue, white text, `Poppins 600`
2. Secondary: `"Watch Demo"` → anchor / modal — White background, blue border, blue text, with a ▶ play icon

**Social proof line** below buttons:
`"✓ No credit card required  ·  ✓ Works with .xls & .xlsx  ·  ✓ Free forever plan"`
In gray, small text, `DM Sans`.

**Hero Image Zone**:
A large, slightly-angled browser window mockup (CSS `transform: perspective(1200px) rotateX(4deg)`) showing the ExcelViz dashboard screenshot (the dark-themed dashboard with sidebar + AI Insights panel). Add a soft blue drop shadow beneath it: `box-shadow: 0 40px 80px rgba(37,99,235,0.15)`. This is the "floating app" effect used by tools like Linear, Vercel, etc.

---

### 1.3 Logos / Trust Bar

**Label**: `"Trusted by analysts at leading companies"` — centered, gray, small caps.

Below: Horizontal scrolling ticker (on mobile) or static flex row (desktop) of 6–8 greyed-out company logos (use placeholder SVGs — generic industry names like "Acme Corp", "FinTrack", "DataBridge" etc. styled as minimal wordmarks in gray `#9CA3AF`).

---

### 1.4 Features Overview Section

**Section Header**:
- Eyebrow: `"WHAT YOU GET"` — blue, small caps, letter-spaced
- H2: `"Everything you need to understand your data"` — `Poppins 700`, dark
- Subtext: `"From raw spreadsheets to actionable intelligence, ExcelViz handles every step."` — gray body

**Layout**: 3-column card grid (desktop), 1-column (mobile)

**Feature Cards** (6 total, rounded `12px`, border `#E5E7EB`, white bg, hover blue border glow):

| Icon | Title | Description |
|---|---|---|
| 📁 Upload icon | Instant Workbook Parsing | Drag & drop `.xls` / `.xlsx` files. Sheets are parsed instantly with zero permanent storage. |
| 📈 Chart icon | Dynamic 2D Visualizations | Line, bar, scatter, radar, and pie charts with interactive tooltips powered by Chart.js. |
| 🧊 3D cube icon | Immersive 3D Charts | Rotate, zoom, and explore multidimensional data in WebGL-rendered 3D space using Three.js. |
| 🤖 AI/brain icon | AI-Powered Insights | Get trend analysis, anomaly detection, and executive summaries generated by OpenAI. |
| 📋 List icon | Historical Analysis Logs | Track every upload and analysis run. Reload past charts and insights in one click. |
| 📄 Export icon | Exportable Reports | Download charts as high-res PNGs or full PDF reports for stakeholders. |

Each card has: icon in a blue rounded square (like the dashboard stat cards), bold title, body text, and a subtle `"→"` link at the bottom in blue.

---

### 1.5 How It Works Section

**Background**: Light gray `#F5F7FA` full-width band.

**Section Header**:
- H2: `"From upload to insight in 3 steps"` — Poppins 700

**Layout**: Horizontal step flow with connecting dotted line (desktop). Vertical stack (mobile).

**Steps**:

1. **Upload Your Spreadsheet**
   Icon: Upload cloud
   Text: "Drag and drop any `.xls` or `.xlsx` file. ExcelViz parses your sheets instantly."

2. **Choose Your Visualization**
   Icon: Chart type selector
   Text: "Select columns, pick a 2D or 3D chart type, and customize your view in seconds."

3. **Get AI Insights**
   Icon: Sparkle / AI
   Text: "OpenAI analyzes your data distribution and generates plain-English summaries and recommendations."

Each step: numbered circle (`01`, `02`, `03`) in blue, title in Poppins 600, description in DM Sans gray.

---

### 1.6 3D Chart Demo / Interactive Preview Section

**Full-width section**, alternating layout (image left, text right).

**Left**: Animated mockup of the 3D chart (a looping CSS/JS animation of a WebGL-style scatter plot rotating slowly). Add a dark card background (`#0F1623`) to make it pop on the white page.

**Right**:
- Eyebrow: `"3D VISUALIZATIONS"`
- H2: `"See your data from every angle"`
- Body: "ExcelViz's Three.js engine renders your spreadsheet data as spatial 3D charts. Rotate, zoom, and explore multidimensional patterns invisible in flat spreadsheets."
- Feature bullets:
  - ✓ Click-to-drag rotation
  - ✓ Scroll-to-zoom
  - ✓ Multi-axis labels
  - ✓ Glowing data point spheres
- CTA: `"Try It Free →"` → `/register`

---

### 1.7 AI Insights Preview Section

**Alternating layout** (text left, visual right).

**Left**:
- Eyebrow: `"AI-POWERED ANALYSIS"`
- H2: `"Your personal data analyst, available 24/7"`
- Body: "Stop staring at raw numbers. ExcelViz feeds your sheet statistics into OpenAI and delivers natural-language summaries, trend detection, anomaly alerts, and action items — automatically."
- Feature bullets:
  - ✓ Trend & growth analysis
  - ✓ Anomaly detection
  - ✓ Action-oriented recommendations
  - ✓ Executive summary export

**Right**: A dark card (`#0F1623`, rounded, shadow) showing a mock of the `InsightCard` component from the dashboard — the "Data Trend Detected", "Potential Anomaly", "Chart Recommendation" rows. Use the exact visual style from the dashboard screenshot.

---

### 1.8 Stats / Social Proof Counter Section

**Background**: Blue (`#2563EB`) full-width band. White text.

**Layout**: 4 stats in a row.

| Stat | Label |
|---|---|
| 10,000+ | Workbooks Analyzed |
| 500+ | Teams Using ExcelViz |
| 3M+ | Charts Generated |
| 98% | User Satisfaction |

Each stat: Large number in `Poppins 800` (~56px), label in `DM Sans` below. Animated count-up on scroll enter.

---

### 1.9 Testimonials Section

**Section Header**: H2 `"What analysts are saying"` — Poppins 700.

**Layout**: 3-column card grid (desktop), 1-column (mobile).

**Card Style**: White background, subtle border, `12px` radius, soft shadow on hover.

Each card:
- Quote in italics, `DM Sans`, dark gray
- Reviewer name in `Poppins SemiBold`
- Role + Company in gray
- Star rating (5 blue stars) at top

**3 Sample Testimonials**:
1. *"ExcelViz transformed how our finance team reports quarterly data. The AI summaries alone save us 3 hours every week."* — **Riya Sharma**, Financial Analyst, FinTrack
2. *"The 3D visualizations genuinely impressed our board. No other tool does this so effortlessly."* — **James K.**, Data Manager, DataBridge
3. *"Setup took 2 minutes. The insights were immediately actionable. Highly recommend."* — **Priya M.**, Operations Lead, Acme Corp

---

### 1.10 Final CTA Section

**Background**: Near-black `#0A0D14`, centered layout.

**H2**: `"Ready to see your data differently?"` — `Poppins 800`, white, ~48px
**Subtext**: `"Join thousands of analysts using ExcelViz. Free to start, powerful to scale."` — gray
**CTA Button**: `"Get Started — It's Free"` → `/register` — Large blue button, white text, Poppins 700.

Below button: `"Already have an account?  Log in →"` — in light gray text, login link in blue.

---

### 1.11 Footer

**Layout**: 4-column footer on dark background (`#0A0D14`).

**Column 1 (Brand)**:
- ExcelViz logo (white version)
- Tagline: `"Spreadsheets to Intelligence, Instantly."`
- Social icons: LinkedIn, Twitter/X, GitHub (white, hover blue)

**Column 2 (Product)**:
- Features
- Pricing
- Changelog
- Roadmap

**Column 3 (Company)**:
- About Us
- Blog
- Careers
- Contact

**Column 4 (Legal/Support)**:
- Privacy Policy
- Terms of Service
- Support
- Status Page

**Bottom bar**: `© 2025 ExcelViz. All rights reserved.` — centered, gray, small.

---

## 📄 Page 2: Product Page (`/product`)

### Overview

A deep-dive into what ExcelViz does. Think of this as the "features tour" page.

**Hero**:
- H1: `"The complete Excel analysis platform"` — Poppins 800
- Subtext: `"One tool for uploads, visualizations, AI insights, and reports."`
- Background: Light gray `#F5F7FA`, no CTA buttons — just scroll invitation.

**Section 1 — Upload & Parse Engine**
- Heading: `"Smart Workbook Parsing"`
- Full-width two-column layout: left text + bullets, right animated file-upload mockup (drag & drop UI).
- Details: Multer-based file handling, SheetJS parsing, no permanent disk storage, supports all Excel formats.

**Section 2 — 2D Visualizations**
- Heading: `"5 Chart Types, Zero Configuration"`
- Full-width dark card with embedded chart type switcher mockup (tabs: Line | Bar | Scatter | Radar | Pie), showing a preview render for each.
- Each chart type described: use case, strengths.

**Section 3 — 3D Visualizations**
- Heading: `"Three.js 3D Explorer"`
- Same as homepage 3D section but more detailed — include tech specs: orthographic camera, dynamic grids, legend sprites, glowing sphere/pillar plot modes.

**Section 4 — AI Insights Engine**
- Heading: `"GPT-4 Powered Analytics"`
- Show a "before/after" layout: left = raw spreadsheet numbers, right = AI-generated insight card.
- List output types: trend summaries, anomaly detection, action items, executive reports.

**Section 5 — History & Export**
- Heading: `"Never Lose an Analysis"`
- Show mock of HistoryTable component with pagination, sorting, date filter.
- Export options: PNG, PDF — show export card mockup.

**Bottom CTA**: Same as homepage final CTA section.

---

## 📄 Page 3: Solutions Page (`/solutions`)

### Overview

Who is ExcelViz for? Segment-based page showing different use cases.

**Hero**:
- H1: `"Built for every team that lives in spreadsheets"`
- Subtext: `"Finance, operations, sales, HR — if you work with Excel, ExcelViz works for you."`
- Background: White with blue accent glow top-center.

**Segment Cards** (4 large cards, alternating layout — left image/right text, then right image/left text):

**1. Finance & Accounting Teams**
- Visual: Bar chart of quarterly revenue
- Headline: `"From Excel reports to boardroom-ready charts"`
- Body: Describe how finance teams can upload P&L statements, budget trackers, cash flow models and get instant visual reports + AI summaries.
- Bullets: Monthly trend analysis, anomaly detection in expenses, PDF export for stakeholder reports.

**2. Sales & Revenue Operations**
- Visual: Line chart of sales pipeline
- Headline: `"Visualize your pipeline. Spot deals at risk."`
- Body: Upload CRM exports, sales data, quota trackers. Get AI-powered analysis on growth trends and at-risk accounts.
- Bullets: 2D/3D pipeline charts, trend detection, team performance snapshots.

**3. HR & People Analytics**
- Visual: Radar chart of team metrics
- Headline: `"Turn headcount data into workforce intelligence"`
- Body: Analyze hiring funnels, attrition rates, performance reviews, compensation distributions.
- Bullets: Multi-axis radar charts, anomaly detection in attrition, exportable HR reports.

**4. Operations & Supply Chain**
- Visual: Scatter plot of inventory vs demand
- Headline: `"See patterns in complexity"`
- Body: Upload inventory data, logistics sheets, operational metrics. Spot bottlenecks and outliers instantly with 3D charts.
- Bullets: 3D scatter for multi-dimensional ops data, AI outlier detection, historical log tracking.

**Bottom CTA**: `"Which team are you? Start for free →"` → `/register`

---

## 📄 Page 4: Pricing Page (`/pricing`)

### Overview

Clean, honest, SaaS pricing page.

**Hero**:
- H1: `"Simple pricing. Powerful analysis."` — Poppins 800
- Toggle: `Monthly | Yearly` (toggle switch, blue) — yearly shows 20% discount badge.
- Background: White.

**Pricing Cards** (3 tiers, centered row):

**Free**
- Price: `$0 / month`
- Subtitle: `"Perfect for individuals"`
- Features:
  - 5 workbook uploads/month
  - 2D charts only
  - Basic AI insights (5/month)
  - PNG export
  - 7-day history log
- CTA: `"Get Started Free"` → `/register` (blue outlined button)

**Pro** ⭐ (MOST POPULAR — highlighted with blue border + top badge)
- Price: `$19 / month` (or `$15/mo billed yearly`)
- Subtitle: `"For power users & analysts"`
- Features:
  - Unlimited uploads
  - 2D + 3D charts
  - Unlimited AI insights
  - PNG + PDF export
  - Full history log
  - Priority support
- CTA: `"Start Pro Trial"` → `/register` (filled blue button)

**Enterprise**
- Price: `Custom`
- Subtitle: `"For teams & organizations"`
- Features:
  - Everything in Pro
  - Team collaboration
  - SSO / Firebase Auth integration
  - Custom branding
  - Dedicated support
  - SLA guarantee
- CTA: `"Contact Sales"` → `/contact` (dark button)

**FAQ Section** below pricing cards:

- Q: Can I cancel anytime? A: Yes, cancel from your profile settings, no questions asked.
- Q: What Excel formats are supported? A: `.xls` and `.xlsx` files are both fully supported.
- Q: Is my data stored permanently? A: No. Files are parsed in memory and never permanently stored on disk.
- Q: How does AI analysis work? A: Your sheet's statistical data is sent to OpenAI's API for analysis. No raw personal data leaves without consent.
- Q: Do you offer student discounts? A: Yes — contact us with your institution email.

---

## 📄 Page 5: About Us Page (`/about`)

### Hero

- H1: `"We believe spreadsheets deserve better."` — Poppins 800, centered
- Subtext: `"ExcelViz was built by data practitioners who were tired of staring at raw rows. We built the tool we always wished existed."` — DM Sans, centered, gray.
- Background: Near-black `#0A0D14`, white text. Full-viewport height hero.

### Our Mission Section (White BG)

- H2: `"Making data intelligence accessible to everyone"`
- Body: 2–3 paragraph description of ExcelViz's mission — democratizing BI tools, no more bloated enterprise software, instant insights for non-data-scientists.
- Two-column: text left, abstract data illustration right (an SVG visualization art piece — abstract connected nodes, glowing blue on dark background, styled as a mini card).

### Team Section

- H2: `"The people behind ExcelViz"`
- Cards (3–4 team members): photo placeholder (gray circle with initial), name in Poppins 600, role in DM Sans, LinkedIn icon.
- Layout: 4-column grid (desktop), 2-column (tablet), 1-column (mobile).

### Values Section

- H2: `"What we stand for"`
- 3 value cards with large icon, short title, 2-line description:
  - ⚡ Speed — "No waiting. Upload, analyze, visualize in seconds."
  - 🔒 Privacy — "Your data is never permanently stored. Full stop."
  - 🎯 Clarity — "We turn complexity into plain English."

### Timeline / Story Section (Optional)

- Thin vertical timeline showing ExcelViz milestones: Founded → Beta Launch → First 1000 Users → AI Integration → Today

---

## 📄 Page 6: Blog Page (`/blog`)

### Blog Index

**Hero**: Simple — H1 `"Insights & Tutorials"`, subtitle `"Excel tips, data visualization guides, and product updates."`, search bar.

**Layout**: Featured post (large card, left) + recent posts (right column, 2–3 smaller cards).

**Filter Tags**: All | Tutorial | Product Update | Data Tips | AI Analysis — pill buttons in blue.

**Post Card Structure**:
- Cover image area (placeholder gradient in blue shades)
- Tag pill (e.g. "TUTORIAL", "PRODUCT")
- Post title in Poppins 600
- 2-line excerpt in DM Sans gray
- Author avatar + name + date
- `"Read More →"` link in blue

### Blog Post Page (`/blog/:slug`)

**Layout**: Single-column article, max width 720px, centered.
- H1 post title in Poppins 800
- Author + date meta row
- Cover image (full width, rounded)
- Body in DM Sans, 18px line height 1.75
- Headings in Poppins 600
- Code blocks in JetBrains Mono, dark background
- Related posts section at the bottom (3 cards)

---

## 📄 Auth Pages: Login & Register

These pages serve as the **bridge between the marketing website and the dashboard**.

### Login Page (`/login`)

**Layout**: Split-screen (desktop).
- **Left half**: White background, centered login form.
- **Right half**: Dark blue background (`#0F1623`) with ExcelViz product screenshot/illustration, a quote from a testimonial, and the tagline `"Spreadsheets to Intelligence."` in white Poppins.

**Login Form (left)**:
- ExcelViz logo at top
- H2: `"Welcome back"` — Poppins 700
- Subtext: `"Log in to your ExcelViz account"`
- Email input (styled, blue focus ring)
- Password input (with show/hide toggle)
- `"Forgot password?"` link → `/reset-password` — right aligned, blue text
- Primary CTA: `"Log In"` — full-width blue button, Poppins 600
- Divider: `"or continue with"`
- Google sign-in button (white, border, Google icon)
- Bottom: `"Don't have an account? Sign up free →"` → `/register`

**On successful login → redirect to `/dashboard`**

### Register Page (`/register`)

**Layout**: Same split-screen as login.

**Register Form (left)**:
- H2: `"Create your free account"` — Poppins 700
- Fields: Full Name, Email, Password, Confirm Password
- Password strength meter (green/yellow/red bar)
- Terms checkbox: `"I agree to the Terms of Service and Privacy Policy"`
- Primary CTA: `"Create Account"` → full-width blue button
- Google sign-up button
- Bottom: `"Already have an account? Log in →"` → `/login`

**On successful registration → redirect to `/dashboard`**

### Reset Password Page (`/reset-password`)

- Simple centered card, white background
- H2: `"Reset your password"`
- Email input
- `"Send Reset Link"` button → Firebase sends reset email
- Back link: `"← Back to Login"`

---

## 🔗 Navigation Flow Map

```
/ (Home)
├── /product           → Deep product feature tour
├── /solutions         → Use case segments
├── /pricing           → Pricing tiers
├── /about             → Company + team
├── /blog              → Blog index
│   └── /blog/:slug    → Individual post
├── /login             → Firebase login → /dashboard
├── /register          → Firebase register → /dashboard
└── /reset-password    → Firebase password reset
```

**After `/login` or `/register` (successful auth):**
```
→ Redirect to: http://localhost:3000/dashboard  (dev)
→ Redirect to: https://app.excelviz.io/dashboard  (prod)
```

The marketing website and dashboard can be on separate origins (e.g., `excelviz.io` for marketing, `app.excelviz.io` for the app). Firebase Auth tokens are shared via the same Firebase project — no re-login needed if the user is already authenticated.

---

## 🧩 Component Specifications (Reusable)

### `<NavBar />`
- Props: `transparent` (boolean — transparent on hero, white on scroll)
- Sticky, z-index 100
- Mobile: hamburger → slide-down full menu

### `<HeroSection />`
- Props: `headline`, `subtext`, `ctaPrimary`, `ctaSecondary`, `badge`
- Reusable across Product, Solutions, Pricing heroes

### `<FeatureCard />`
- Props: `icon`, `title`, `description`, `linkText`, `linkHref`
- Used in Home Features, Product page

### `<PricingCard />`
- Props: `tier`, `price`, `features[]`, `highlighted` (boolean), `cta`
- Highlighted = blue border + top badge

### `<TestimonialCard />`
- Props: `quote`, `name`, `role`, `company`, `stars`

### `<SectionHeader />`
- Props: `eyebrow`, `heading`, `subtext`, `align` (`center` | `left`)

### `<CTABanner />`
- Props: `heading`, `subtext`, `ctaText`, `ctaHref`
- Dark background variant

### `<BlogCard />`
- Props: `tag`, `title`, `excerpt`, `author`, `date`, `slug`

### `<Footer />`
- Static, 4-column, dark background
- Includes social links, legal links

---

## 🛠️ Technical Notes for Antigravity

- **Framework**: React 18 (matching the existing dashboard)
- **Styling**: Tailwind CSS (matching dashboard's existing Tailwind setup)
- **Routing**: React Router DOM v6 — marketing website routes + auth pages, then redirect to dashboard app
- **Fonts**: Import via Google Fonts in `index.html`: `Poppins` + `DM Sans`
- **Animations**: Use `framer-motion` (already in dashboard dependencies) for scroll-triggered animations
- **Icons**: Use `lucide-react` (already available) for all icons
- **Auth Integration**: Firebase Auth — same project as dashboard. After login/register, use `window.location.href` or React Router to push to `/dashboard`
- **Image Assets**: Use placeholder mockup screenshots of the existing dashboard (provided separately). Do not use stock photo humans.
- **SEO**: Add `react-helmet` or Next.js `<Head>` for meta tags on each page
- **Responsive Breakpoints**: Mobile (`< 768px`), Tablet (`768px–1024px`), Desktop (`> 1024px`)

---

## ✅ Deliverables Checklist for Antigravity

- [ ] `/` Home page — all 11 sections
- [ ] `/product` — Product deep-dive page
- [ ] `/solutions` — 4 use-case segments
- [ ] `/pricing` — 3 tiers + FAQ
- [ ] `/about` — Mission, team, values
- [ ] `/blog` — Blog index page
- [ ] `/blog/:slug` — Blog post template
- [ ] `/login` — Split-screen login with Firebase
- [ ] `/register` — Split-screen register with Firebase
- [ ] `/reset-password` — Email reset page
- [ ] Global `<NavBar />` and `<Footer />` components
- [ ] Auth bridge: successful login/register → redirect to dashboard
- [ ] Mobile responsive across all pages
- [ ] Scroll animations on all major sections

---

*Prompt prepared for Antigravity by ExcelViz team. All design decisions should align with the existing dashboard's dark-mode aesthetic (for the app side) while the marketing site uses the white/black/blue color system described above.*
