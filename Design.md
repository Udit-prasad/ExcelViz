# ExcelViz Design System Foundations & Marketing UI Guidance (`Design.md`)
Optimized for consistency, accessibility, and high-fidelity delivery.

---

## 🧭 1. Context and Goals

### Design Intent
> Democratize complex spreadsheets by converting raw Excel files into interactive 2D graphs, spatial 3D telemetry coordinates, and OpenAI-powered executive summaries, presenting a highly polished, editorial-grade SaaS aesthetic that maximizes user trust and conversions.

### Brand Alignment
*   **Product/Brand**: ExcelViz (Excel Vista Insights Hub)
*   **URL**: `https://excelviz.io/`
*   **Audience**: Data practitioners, finance specialists, operations leads, business analysts, and corporate decision-makers.
*   **Product Surface**: Public Marketing Platform (Pre-Login Pages & Authentication Bridge).

---

## 🎨 2. Design Tokens and Foundations

All UI implementations **must** rely strictly on the token scales defined below. Localized exceptions are strictly prohibited to maintain system consistency.

### 2.1 Typography Foundations
Marketing typography is engineered as a high-end editorial blend of classic serif copy for readability and modern geometric sans-serif details for crisp numbers and technical highlights.

| Token | CSS Variable / Value | Description |
| :--- | :--- | :--- |
| `font.family.primary` | `Georgia, Cambria, "Times New Roman", Times, serif` | Editorial primary copy (high trust, premium). |
| `font.family.headings` | `'Plus Jakarta Sans', 'Inter', ui-sans-serif, sans-serif` | Clean geometric headings. |
| `font.family.digits` | `'Plus Jakarta Sans', 'Inter', sans-serif` | Scoped via `unicode-range: U+0030-0039` for inline digits. |
| `font.family.code` | `'JetBrains Mono', 'Fira Code', monospace` | Data tables, codes, technical metadata. |

#### Typography Scale
*   `font.size.xs` = `12px` (line-height: `16px`, tracking: `0.05em`)
*   `font.size.sm` = `14px` (line-height: `20px`, tracking: `0.01em`)
*   `font.size.md` = `16px` (line-height: `24px`, tracking: `0`)
*   `font.size.lg` = `18px` (line-height: `28px`, tracking: `0`)
*   `font.size.xl` = `20px` (line-height: `30px`, tracking: `-0.01em`)
*   `font.size.2xl` = `24px` (line-height: `32px`, tracking: `-0.02em`)
*   `font.size.3xl` = `36px` (line-height: `44px`, tracking: `-0.02em`)
*   `font.size.4xl` = `48px` (line-height: `56px`, tracking: `-0.03em`)
*   `font.size.5xl` = `72px` (line-height: `80px`, tracking: `-0.04em`)

---

### 2.2 Color System (Semantic Tokens)
Color variables map directly to visual components. Engineers **must** use these semantic assignments rather than hardcoding hex codes.

#### Background and Surface Tokens
*   `color.surface.base` = `#FFFFFF` (Light page backgrounds)
*   `color.surface.muted` = `#F5F7FA` (Alternating section bands, light cards)
*   `color.surface.raised` = `#FFFFFF` (Floating cards, modals, navigation bars)
*   `color.surface.dark.base` = `#0A0D14` (Hero background, dark cards, footer background)
*   `color.surface.dark.raised` = `#0F1623` (Interactive WebGL viewports, dark pricing cards)
*   `color.surface.dark.accent` = `#1E293B` (Form container boxes, card layers)

#### Interactive & Accent Tokens
*   `color.accent.primary` = `#2563EB` (Electric Blue: primary buttons, hyperlinks, tags)
*   `color.accent.primary.hover` = `#1D4ED8` (Royal Blue)
*   `color.accent.primary.glow` = `rgba(37, 99, 235, 0.15)` (Accent borders, drop glows)
*   `color.accent.glow.cyan` = `#06B6D4` (Glowing Neon Cyan: highlight accents, stats numbers)
*   `color.accent.glow.indigo` = `#6366F1` (Subtle backing gradients)
*   `color.accent.success` = `#10B981` (Emerald: checkmarks, positive highlights)
*   `color.accent.warning` = `#F59E0B` (Amber: alert tags, pricing limits)

#### Typography and Border Tokens
*   `color.text.primary` = `#111827` (Charcoal Black: primary text on light backgrounds)
*   `color.text.secondary` = `#6B7280` (Slate Gray: captions, descriptions)
*   `color.text.inverse.primary` = `#FFFFFF` (White: text on dark surfaces)
*   `color.text.inverse.secondary` = `#94A3B8` (Light Slate: subtitles on dark surfaces)
*   `color.border.light` = `#E5E7EB` (Pale gray border for grids and forms)
*   `color.border.dark` = `#1E293B` (Dark slate borders for micro-elements)
*   `color.border.accent` = `rgba(37, 99, 235, 0.25)` (Transparent blue focus borders)

---

### 2.3 Spacing, Borders, and Motion Scale
All structural layout variables **must** match the standard geometric values below.

#### Spacing Scale
*   `space.1` = `4px`
*   `space.2` = `8px`
*   `space.3` = `12px`
*   `space.4` = `16px`
*   `space.5` = `24px`
*   `space.6` = `32px`
*   `space.7` = `48px`
*   `space.8` = `64px`
*   `space.9` = `96px`

#### Corner Radii
*   `radius.xs` = `4px` (Small pills, inline checkboxes)
*   `radius.sm` = `8px` (Buttons, inputs, form text fields)
*   `radius.md` = `12px` (Medium components, navigation items)
*   `radius.lg` = `24px` (Large cards, feature grid widgets, WebGL zones)
*   `radius.pill` = `9999px` (Badges, tags, toggle controls)

#### Shadow Definitions
*   `shadow.light.sm` = `0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03)`
*   `shadow.light.lg` = `0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.03)`
*   `shadow.dark.glow` = `0 0 40px rgba(37,99,235,0.08)` (Subtle blue backing glow for dark cards)
*   `shadow.dark.neon` = `0 0 50px rgba(6,182,212,0.12)` (Teal glow for WebGL nodes)

#### Motion & Transition Timings
*   `motion.duration.instant` = `100ms` (Active taps, scales)
*   `motion.duration.fast` = `150ms` (Hover states, color swaps)
*   `motion.duration.smooth` = `300ms` (Dropdown triggers, panel expansions)
*   `motion.easing.standard` = `cubic-bezier(0.4, 0, 0.2, 1)`
*   `motion.easing.bounce` = `cubic-bezier(0.34, 1.56, 0.64, 1)`

---

## 🧩 3. Component-Level Rules

Based on known page density metrics, components **must** adhere strictly to these token allocations and interaction maps.

```
Page Component Density: Links (77), Lists (12), Buttons (7), Cards (4), Navigation (2)
```

---

### 3.1 Links (Density: 77)
Hyperlinks form the primary navigation grid across text fields, lists, headers, and structural footers.

#### Link Anatomy
1.  **Anchor Text**: Enclosed in semantic tags (`<a>` or React Router `<Link>`).
2.  **Visual Indicator**: Optional trailing chevron `→` for redirect links, or simple underlines for inline text.

#### Link Token Rules
*   **Typography**:
    *   Inline Body: `font.family.primary`, `font.size.md`, `font.weight.base` (regular Georgia).
    *   Navigational / Footers: `font.family.headings`, `font.size.sm`, `font.weight.bold` (Plus Jakarta Sans).
*   **Default Color**:
    *   Light BG: `color.accent.primary` (Electric Blue).
    *   Dark BG: `color.text.inverse.primary` (White).
*   **Text Underline**: Not visible by default for navigational links; always active for inline text paragraphs.

#### Link States
*   **Default**: Colored base font, no underline (unless in-paragraph).
*   **Hover**: Translate chevron `+4px` horizontally, add `underline`, color swaps to `color.accent.primary.hover`.
*   **Focus-Visible**: Add `outline: 2px solid color.accent.primary`, `outline-offset: 4px`. Outline corner radius **must** be `radius.xs`.
*   **Active (Pressed)**: Scale down `scale(0.98)` instantly using `motion.duration.instant`.
*   **Disabled**: Color matches `color.text.secondary`, opacity set to `50%`, `pointer-events: none`.
*   **Loading**: Append custom animated spinner icon, hide text, maintain dimensions.
*   **Error**: Text changes to reddish accent `color.accent.warning` for validation loops.

#### Link Interactions & Edge Cases
*   **Keyboard**: Focusable via `Tab`. Executed via `Enter`.
*   **Pointer/Touch**: Trigger area **must** maintain a minimum height of `44px` on mobile displays.
*   **Overflow**: Long link text **must** gracefully truncate using `text-overflow: ellipsis` rather than forcing wraps.

---

### 3.2 Lists (Density: 12)
Used in pricing comparison grids, solve-segment details, and feature summary lists.

#### List Anatomy
1.  **Prefix Indicator**: Semantic SVG checkmark (`color.accent.success`) or numeric index.
2.  **Item Content**: Body text containing descriptive benefits.

#### List Token Rules
*   **Typography**:
    *   Body: `font.family.primary`, `font.size.sm`, `font.weight.base` (Georgia).
    *   Numbers: `font.family.digits`, `font.size.xs`, `font.weight.bold` (Plus Jakarta Sans).
*   **Color**: `color.text.primary` (Light BG) or `color.text.inverse.secondary` (Dark BG).
*   **Spacing**:
    *   Item margin-bottom: `space.3`.
    *   Icon padding-right: `space.2`.

#### List States
*   **Default**: Unmodified line heights, prefix icon colored securely.
*   **Hover (List Row)**: Subtle background highlight `color.surface.muted` with `radius.sm`.
*   **Focus-Visible (List Items with anchors)**: Wrap outline matching `radius.sm`.
*   **Disabled**: Opacity set to `40%`, text struck-through if highlighting unavailable features.

#### List Edge Cases
*   **Long-Content Handling**: List text wrapping **must** indent properly so that wrapped lines align flush with the start of the text, **never** spilling underneath the prefix check icon.

---

### 3.3 Buttons (Density: 7)
High-priority interactive elements triggers conversion actions, pricing selections, and authentication.

#### Button Variants & Anatomy
1.  **Primary CTA (Filled)**: Linear gradient background, bold centered label, optional trailing icon.
2.  **Secondary CTA (Outline)**: Ghost transparent background, thin colored border.
3.  **Authentication Switcher (Toggle)**: Pill badge shape, sliding selected pill background.

#### Button Token Rules
*   **Typography**: `font.family.headings`, `font.size.xs`, `font.weight.bold` (Plus Jakarta Sans), `letter-spacing: 0.05em`.
*   **Heights**:
    *   Desktop standard: `48px` (padding: `0 space.5`).
    *   Large CTA: `56px` (padding: `0 space.6`).
*   **Borders & Radius**:
    *   Radius: `radius.sm` (Standard buttons) or `radius.pill` (Pricing switchers).
    *   Borders: `1px solid color.border.light` (Secondary ghost) or `none` (Primary filled).

#### Button States
*   **Default**:
    *   Primary: `bg-gradient-to-r from-cyan-500 to-indigo-500`, shadow: `shadow.light.sm`.
    *   Secondary: `bg-white/5 border border-white/10 text-white`.
*   **Hover**:
    *   Primary: Brightness increases by `10%`, translate-Y is `-2px`, shadow shifts to `shadow.light.lg`.
    *   Secondary: Background swaps to `bg-white/10`, border matches `color.accent.primary.glow`.
*   **Focus-Visible**: Standardized focused outline `2px solid color.accent.primary` with `outline-offset: 2px`.
*   **Active (Pressed)**: Transform scales down to `scale(0.97)` instantly, depth shadow vanishes.
*   **Disabled**: Opacity forced to `40%`, gray background fallback `color.text.secondary`, cursor defaults to `not-allowed`.
*   **Loading**: Show spinner SVG, label text opacity set to `0` (retains button dimensions).
*   **Error**: Shake animation horizontally for `300ms` using `motion.easing.standard`, border swaps to highlight warning red.

#### Button Keyboard, Pointer & Touch Interactions
*   **Focus**: Navigable via `Tab`.
*   **Trigger**: Triggered via `Spacebar` or `Enter`.
*   **Touch target**: Minimum dimensions **must** be `48px x 48px`.

---

### 3.4 Cards (Density: 4)
Used to organize feature grids, company values, testimonial blocks, and pricing plans.

#### Card Anatomy
1.  **Header**: Glowing icon box or star rating + bold category pill.
2.  **Body Content**: Large title headings and descriptive paragraphs.
3.  **Footer Action**: Contextual redirection link or full-width button.

#### Card Token Rules
*   **Typography**:
    *   Titles: `font.family.headings`, `font.size.xl`, `font.weight.bold` (Plus Jakarta Sans).
    *   Descriptions: `font.family.primary`, `font.size.sm`, `font.weight.base` (Georgia).
*   **Borders & Backgrounds**:
    *   Base light theme: `color.surface.muted`, `color.border.light`.
    *   Premium dark theme: `color.surface.dark.raised`, `color.border.dark`.
    *   Corner Radius: `radius.lg` (24px) for all content cards.

#### Card States
*   **Default**: Base border, micro shadows, transparent glowing outlines.
*   **Hover**: Translate-Y shifted `-6px` upward, border color matches `color.accent.primary.glow`, backdrop glow shifts to `shadow.dark.glow`.
*   **Focus-Visible**: Focus ring wraps the entire border with radius `radius.lg`.
*   **Active (Tapped)**: Depress card `scale(0.99)` using transition time `motion.duration.instant`.

#### Card Edge-Cases & Responsive Flow
*   **Grid layout**: Must collapse from 3 columns (desktop) to 2 columns (tablet) and 1 column (mobile).
*   **Equal Heights**: Card grids **must** utilize flex layouts (`flex flex-col justify-between`) so that cards on the same row maintain identical heights regardless of dynamic description lengths.

---

### 3.5 Navigation (Density: 2)
Includes the sticky navigation header and the detailed sitemap footer.

#### Navigation Token Rules
*   **Heights**: Header Navigation **must** be `80px` tall.
*   **Background Blur**: `backdrop-filter: blur(12px)`, background `rgba(255,255,255,0.9)` (light theme scroll) or `rgba(11,15,25,0.95)` (dark theme scroll).
*   **Fonts**: Navigation links use `font.family.headings`, `font.size.sm`, `font.weight.bold` (Plus Jakarta Sans).

---

## ♿ 4. Accessibility Requirements & Acceptance Criteria

Every component and layout **must** adhere strictly to WCAG 2.2 AA standards. All conditions listed below are testable in production environments.

### 4.1 Non-Negotiable Accessibility Rules
*   **Text Contrast**: Light text on dark backgrounds **must** achieve a contrast ratio of at least `4.5:1` for regular text and `3:1` for large text (`>18px`).
*   **Keyboard Navigation**:
    *   All interactive elements (links, buttons, expandable cards) **must** be reachable using only the `Tab` key.
    *   All active focus indicators **must** be highly visible. Hidden focus indicators are strictly prohibited.
*   **Touch Target Minimum**: Every interactive link, tab selector, and primary button **must** maintain a bounding touch zone of at least `44px x 44px`.

### 4.2 Accessibility QA Acceptance Criteria (Pass/Fail Checks)

| ID | Test Scenario | Expected Outcome (PASS) | Failure Condition (FAIL) |
| :--- | :--- | :--- | :--- |
| **ACC-01** | Focus Ring Verification | Pressing `Tab` renders a distinct glowing border surrounding the focused element. | Focus outline is missing or color contrast is indistinguishable from background. |
| **ACC-02** | Pricing Switcher Control | Pressing `Left` / `Right` arrows updates billing intervals on the Pricing Page. | Spacebar or Arrow keys are unresponsive; focus remains trapped or lost. |
| **ACC-03** | Text Contrast Verification | Running Lighthouse Accessibility diagnostics yields score `>= 95`. | Colored labels (e.g. gray on white) score contrast ratio `< 4.5:1`. |
| **ACC-04** | Aria-Labels on Icons | Screen reader reads out descriptions of SVG icons (e.g., "Upload excel sheet icon"). | Screen reader reads "SVG image" or is completely silent. |

---

## ✍️ 5. Content and Tone Standards

Our copy should speak with precision, efficiency, and confidence to our technical target audience.

### 5.1 Copywriting Guiding Principles
1.  **Keep it actionable**: Avoid vague, marketing-heavy jargon. State exactly what the product does.
2.  **Highlight details**: Mention real file formats (`.xlsx`), standard library outputs (Three.js, Chart.js), and integration hooks (OpenAI, Firebase).
3.  **Prose Style**: Prose should be elegant (in Georgia), while headers and calls-to-action should be crisp and concise (in Plus Jakarta Sans / Inter).

### 5.2 Copywriting Examples (Do vs. Don't)

*   ❌ **Don't**: "Our system uses cutting-edge supercharged algorithms to make cool charts in a jiffy! We are the best spreadsheet app." *(Vague, childish, lack of technical detail)*
*   **Do**: "ExcelViz parses your `.xls` and `.xlsx` workbooks instantly inside browser memory, plotting spatial dimensions in a WebGL Three.js viewport and delivering OpenAI trend alerts in seconds." *(Clear, technical, feature-driven)*

---

## 🚫 6. Anti-patterns and Prohibited Implementations

To maintain design high-fidelity, engineers **must not** deploy the following configurations:

1.  **No Poppins headings or Outfit details on the public site**: Heading fonts **must** use `'Plus Jakarta Sans'` or `'Inter'`. Pop-headings are prohibited outside the post-login dashboard.
2.  **No pure Georgia numbers in marketing grids**: If Georgia numbers are rendered inline without the unicode-range scoped font mapping, they will appear uneven. Always ensure `GeorgiaNumbersSans` or `font-heading` is correctly applied.
3.  **No nested scroll containers**: Never place scrollable divs inside main page sections. All pages **must** scroll naturally on the vertical axis.
4.  **No fixed height inputs or buttons on mobile**: Elements **must** wrap or scale fluidly to fit tight viewport widths without cropping labels or pushing CTAs off-screen.

---

## 📋 7. Comprehensive QA Checklist

Before merging visual changes to the public-facing sections of `ExcelViz`, developers **must** verify the following points:

- [ ] **Typography Scoping**: Verified that all public-facing pages (`/`, `/product`, `/solutions`, `/pricing`, `/about`, `/blog`) utilize Georgia body copy and Plus Jakarta Sans / Inter headings.
- [ ] **Dashboard Styling**: Verified that the post-login dashboard remains unaffected and retains its core functional sans-serif dark theme.
- [ ] **Inline Number Mappings**: Inspected all pages to ensure numbers (e.g., prices, statistics, list indexes) are rendered using sans-serif fonts via the composite `GeorgiaNumbersSans` or `font-heading` setups.
- [ ] **Keyboard Navigability**: Successfully traversed the full navbar, testimonial sliders, pricing switches, and registration forms using only the `Tab` and `Shift + Tab` keys.
- [ ] **Mobile Responsiveness**: Checked layouts across popular breakpoints (`375px`, `768px`, `1024px`, and `1440px`) to confirm that all cards align, grids wrap, and text doesn't overflow.
- [ ] **Contrast Pass**: Checked text nodes using a color analyzer to verify that all primary text elements maintain a minimum contrast ratio of `4.5:1`.

---
*ExcelViz Design System Guidance. Prepared by the ExcelViz Development Team. Maintain strict alignment to these parameters during code integrations.*
