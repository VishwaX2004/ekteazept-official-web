# Tailwind CSS Redesign Plan - Ektazept Homepage

## Overview
The existing Tailwind implementation lacks visual polish, clear typography hierarchy, proper spacing, card depth, button styling consistency, and form input styling. This plan details exact Tailwind classes to apply to every component and page to achieve a cohesive, professional design using the existing color palette and custom Tailwind config.

---

## Design Issues Identified

### Typography Issues
- **h1/h2/h3 elements** are unstyled bare text with no font-family, weight, or size classes
- **PageHero h1** lacks proper sizing and lacks the display font
- **Headings** across all pages use inconsistent sizing and no tracking/leading classes
- **Body text** uses inconsistent sizes (some 17px description is not represented, some text is too small)
- **Missing** font-display (Space Grotesk) applied to headings

### Card & Container Issues
- **Service cards** in solutions/products pages lack proper padding, rounded corners, and shadow depth
- **Team member cards** lack proper padding, border styling, and hover effects
- **Cards** missing consistent hover animations (shadow lift, -translate-y-1)
- **Section containers** lack consistent max-width and padding rules
- **Card borders** sometimes missing or too subtle (should use border-line color)

### Button Issues
- **Primary buttons** inconsistent: some have `min-h-12`, others don't; some use `px-5 py-3`, others differ
- **Secondary buttons** missing consistent border styles and hover states
- **Button text** sizing and font-weight varies
- **Missing** proper transition classes for smooth hover effects
- **Arrow icons** not aligned with button styling

### Form Issues
- **Input fields** (in contact/page.jsx) completely unstyled—missing border, padding, focus states, rounded corners
- **Labels** missing font-weight, color classes, and margin-bottom
- **Textareas** unstyled
- **Selects** unstyled
- **Missing** focus:ring and focus:border classes for accessibility

### Spacing & Layout Issues
- **Sections** use inconsistent padding: some `py-16`, some `py-24`, some `lg:py-32`
- **Section containers** have `max-w-7xl` in some places, `max-w-6xl` in others, `max-w-2xl` in others
- **Gaps** between grid items inconsistent (gap-4, gap-6, gap-8)
- **Typography spacing** (mt/mb) varies wildly across pages

### FAQ Specific Issues
- **Details/Summary elements** completely unstyled: no border, padding, rounded corners, or background
- **Missing** styled accordion appearance with proper card styling
- **Missing** hover states and focus states
- **Text inside details** lacks proper styling

### Footer Issues
- **Column headers** (h4) lack cyan color and proper uppercase styling
- **Links** have basic hover:text-cyan but missing transition and visual feedback
- **Overall spacing** could use more consistent padding

### Header Issues
- **Navigation links** missing professional hover animation (should have bottom border slide-in or color shift with smooth transition)
- **Hover states** too simple: just `hover:text-brand`, missing animated underline effect

### Image Path Issue
- **content.js** references `/assets/ektazect-vishwa.jpeg` but actual file is `/assets/ektazept-vishwa.png`
- Must be fixed in **team/page.jsx** where it's displayed

---

## Implementation Plan

### 1. Fix Header Navigation with Hover Animation
**File:** `src/components/Header.jsx`

**Issues:**
- Navigation links need professional animated underline on hover
- Currently only have basic `hover:text-brand` which is too simple
- Need clean bottom-border slide-in effect

**Changes to make:**
- Add wrapper classes to nav links to enable pseudo-element animation
- Use `relative pb-1` on nav links to add space for underline
- Add `after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand after:transition-all after:duration-300 hover:after:w-full` for smooth animated underline
- Keep `md:hover:text-brand` for color change

**Verify:** Visually inspect header navigation in browser—nav links should show smooth bottom border animation on hover without text color flashing awkwardly.

---

### 2. Update PageHero Component for Typography & Spacing
**File:** `src/components/PageHero.jsx`

**Issues:**
- h1 missing `font-display` class
- h1 text-ink but should maintain navy/brand coloring if specified
- Description text uses `text-blue-600` (non-existent in config) instead of `text-muted`
- Missing proper spacing and max-width for description
- Decorative circle missing proper spacing

**Changes to make:**
- Change h1 from `font-display font-bold text-5xl md:text-6xl leading-tight tracking-tight text-ink` to `font-display font-bold text-5xl md:text-6xl lg:text-6xl leading-tight tracking-tight text-ink`
- Change description from `text-blue-600 text-lg max-w-2xl` to `text-muted text-base md:text-lg leading-relaxed max-w-2xl`
- Add `mt-6 mb-0` to description for spacing consistency
- Update eyebrow separator to use `before:w-4 before:h-0.5 before:bg-brand`

**Verify:** Manually check pages like `/pricing`, `/solutions` to confirm typography renders correctly and spacing is consistent.

---

### 3. Redesign Contact Form with Proper Tailwind Styling
**File:** `src/app/contact/page.jsx`

**Issues:**
- All form inputs, selects, and textarea completely unstyled
- Labels missing proper styling
- No focus states or accessibility rings
- Missing placeholder text styling
- No error state styling

**Changes to make:**
- **Labels:** Add `block text-sm font-bold text-ink mb-1.5` to all `<label>` tags
- **Text inputs:** Replace bare `<input />` with `className="w-full px-4 py-3 rounded-xl border border-line bg-white text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors"`
- **Textarea:** Add same input styling: `className="w-full px-4 py-3 rounded-xl border border-line bg-white text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors min-h-32"`
- **Selects:** Add `className="w-full px-4 py-3 rounded-xl border border-line bg-white text-ink focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors"`
- **Submit button:** Change from `bg-brand text-white rounded-lg px-6 py-3` to `inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-navy hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`
- **Status message:** Add `p role="status" className="text-brand font-semibold"`

**Verify:** Test contact form at `/contact` — all inputs should have consistent styling, focus states should show blue ring, and form should submit successfully.

---

### 4. Style FAQ Details/Summary Elements as Accordion Cards
**File:** `src/app/faq/page.jsx`

**Issues:**
- `<details>` and `<summary>` elements have no styling
- No visual distinction between open/closed states
- Missing card appearance with border, padding, shadow
- No hover effects or transitions

**Changes to make:**
- Wrap each FAQ in a styled container
- Update structure to:
  ```jsx
  <article className="bg-white border border-line rounded-2xl p-6 md:p-8 hover:shadow-card-hover transition-shadow">
    <details className="group">
      <summary className="list-none cursor-pointer font-display font-bold text-lg md:text-xl text-ink hover:text-brand transition-colors flex justify-between items-center">
        {q}
        <span className="transform group-open:rotate-180 transition-transform">↓</span>
      </summary>
      <p className="text-muted text-base leading-relaxed mt-4">{a}</p>
    </details>
  </article>
  ```
- Remove `::marker` default styling with `list-none`
- Add smooth transition for arrow rotation

**Verify:** Visit `/faq` page — FAQ items should appear as cards with borders, proper spacing, and smooth expand/collapse animations. Arrow should rotate smoothly when opening.

---

### 5. Standardize All Service/Solution Cards
**Files:** `src/app/solutions/page.jsx`, `src/app/products/page.jsx`, `src/app/pricing/page.jsx`

**Issues:**
- Cards use `bg-paper border border-line rounded-lg p-6 md:p-8` but should use `rounded-2xl` for consistency
- Cards missing shadow and hover animation (should lift with shadow-card-hover)
- Links inside cards missing consistent styling
- Headings (h3) inside cards unstyled

**Changes to make:**
- All card containers: Change from `rounded-lg` to `rounded-2xl`
- All card containers: Add hover effects: `hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300`
- All card h3 elements: Add `className="font-display font-bold text-xl md:text-2xl text-ink mt-3 mb-2"`
- All card p elements: Add `className="text-muted text-base leading-relaxed"`
- All card links: Add `className="text-brand font-bold text-sm hover:text-cyan transition-colors inline-flex items-center gap-1"`

**Specific to each page:**
- **solutions/page.jsx:** Add icon numbers (01, 02, etc.) with `className="w-12 h-12 rounded-2xl bg-lav text-brand grid place-items-center text-2xl font-bold mb-3"`
- **products/page.jsx:** Product short abbreviation already present, ensure proper styling
- **pricing/page.jsx:** Ensure card numbers styled properly

**Verify:** Check `/solutions`, `/products`, and `/pricing` pages — all cards should have rounded corners, lift on hover with shadow, proper typography hierarchy, and links should be blue and shift to cyan on hover.

---

### 6. Redesign Team Member Cards and Fix Image Path
**File:** `src/app/team/page.jsx`

**Issues:**
- Team cards lack proper border, padding, and shadow styling
- Images need to be taller (h-96 is not enough—should be h-[400px] per spec)
- h3 (name) is completely unstyled
- Role and skills need proper coloring and spacing
- Bio paragraph needs proper text styling
- LinkedIn link needs proper styling
- **Image path:** Uses `/assets/ektazect-vishwa.jpeg` but actual file is `/assets/ektazept-vishwa.png`

**Changes to make:**
- Update page structure to use proper semantic elements and breadcrumb styling
- **Breadcrumb:** Add `className="text-muted text-sm mb-4 flex items-center gap-2"` to breadcrumb container
- **Section heading:** Add `className="inline-block text-xs font-bold tracking-widest text-brand uppercase mb-4"`
- **Page h1:** Add `className="font-display font-bold text-5xl md:text-6xl text-ink mb-2"`
- **Page description:** Add `className="text-muted text-base md:text-lg leading-relaxed max-w-2xl"`
- **Team grid section:** Add `className="py-16 md:py-24 lg:py-32"`
- **Team container:** Add `className="max-w-6xl mx-auto px-6 md:px-8"`
- **Team card:** Change to:
  ```
  bg-white border border-line rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-member-shadow hover:-translate-y-1 transition-all duration-300
  ```
- **Team card image:** Change from `h-96` to `h-[400px]` and add `object-cover rounded-2xl mb-4 shadow-sm`
- **Team card h3 (name):** Add `className="font-display font-bold text-2xl text-ink mb-1"`
- **Team card role:** Add `className="text-brand font-bold text-sm mb-3"`
- **Skills container:** Add `className="flex flex-wrap gap-2 mb-4"`
- **Each skill badge:** Add `className="inline-block px-3 py-1.5 bg-lav text-brand text-xs font-bold rounded-lg"`
- **Bio paragraph:** Add `className="text-muted text-base leading-relaxed mb-4"`
- **LinkedIn link:** Add `className="text-brand font-bold text-sm hover:text-cyan transition-colors inline-flex items-center gap-1"`
- **Fix image path for Vishwa:** Change `ektazect-vishwa.jpeg` to `ektazept-vishwa.png` in content.js

**Verify:** Visit `/team` page — all team members should display with:
- 400px tall images
- Proper card styling with visible border and shadow
- Clear typography hierarchy (name > role > bio)
- Professional skill badges
- Hover animations that lift the card

---

### 7. Update Main Page Homepage Sections
**File:** `src/app/page.jsx`

**Issues:**
- Sections use inconsistent padding (py-16, py-24, etc.)
- Section containers use different max-width values
- All h2 and h3 headings lack proper font-display and sizing
- List items and paragraphs need consistent text styling
- Card styling in "right side" section (blue box) needs refinement
- CTA section (cyan box) needs better spacing and alignment

**Changes to make:**

#### Hero Section
- Add `lg:gap-16` for larger screens (already has it, keep it)
- h1 already properly styled, verify it renders correctly
- Eyebrow already styled, keep as-is
- Description: Already `text-lg md:text-xl leading-relaxed` — good
- Buttons already styled with proper classes, keep as-is

#### Foundation Section (first grey + blue box)
- **Section:** Add `py-20 md:py-28 lg:py-32` for proper spacing
- **Container:** Add `max-w-6xl mx-auto px-6 md:px-8`
- **Eyebrow:** Already styled
- **h2:** Change to `font-display font-bold text-4xl md:text-5xl lg:text-5xl leading-tight tracking-tight text-ink mt-3 mb-6`
- **Body paragraph:** Add `text-muted text-base md:text-lg leading-relaxed max-w-lg mb-8`
- **List items:** Change `text-sm` to `text-base md:text-lg` and add `leading-relaxed` and `text-muted`
- **Button:** Already properly styled
- **Right side blue box:** Add `rounded-3xl bg-gradient-to-br from-blue-50 to-blue-100 p-8 md:p-12`
- **Box h3:** Add `font-display font-bold text-2xl md:text-3xl text-navy mb-3`
- **Box paragraph:** Add `text-muted text-base leading-relaxed mb-6`
- **Grid items in box:** Change card styling to `bg-white border border-line/60 rounded-2xl p-4 text-center text-sm font-bold text-navy shadow-sm hover:shadow-card-hover transition-shadow`

#### Services Section
- **Section:** Add `py-20 md:py-28 lg:py-32`
- **Container & center box:** Keep `max-w-2xl mx-auto` with proper padding
- **Eyebrow:** Already styled
- **h2:** Change to `font-display font-bold text-4xl md:text-5xl leading-tight tracking-tight text-ink mt-3 mb-6`
- **Description:** Change `text-muted` if not already present, ensure `text-base md:text-lg leading-relaxed`
- **Service cards grid:** Already uses gap-4, keep it but verify cards have proper rounded-2xl, shadow, and hover
- **Card h3:** Ensure `font-display font-bold text-xl md:text-2xl text-ink`
- **Card paragraph:** Ensure `text-muted text-base leading-relaxed`
- **Card link:** Ensure `text-brand font-bold hover:text-cyan transition-colors`

#### Approach Section (navy/dark)
- **Section:** Keep dark navy background, add `py-20 md:py-28 lg:py-32`
- **Container:** Add `max-w-6xl mx-auto px-6 md:px-8`
- **Eyebrow:** Already styled with cyan
- **h2:** Already styled with white, verify `leading-tight tracking-tight`
- **Description:** Already `text-blue-100`, verify `text-base md:text-lg leading-relaxed`
- **Step cards:** Already have numbered circles and styling, verify h3 is `font-display font-bold text-2xl text-white`

#### CTA Section (cyan box)
- **Section:** Already styled, verify padding and layout
- **Eyebrow:** Already styled
- **h2:** Ensure `font-display font-bold text-4xl md:text-5xl leading-tight tracking-tight`
- **Description:** Ensure `text-navy/75 text-base leading-relaxed`
- **Button:** Already properly styled

**Verify:** Load homepage at `/` — all sections should have:
- Consistent py-20 md:py-28 lg:py-32 spacing
- Display font for all headings
- Proper text hierarchy and sizing
- Consistent card styling with rounded-2xl and shadows
- Smooth hover animations
- Proper color contrast

---

### 8. Update Footer for Typography & Link Styling
**File:** `src/components/Footer.jsx`

**Issues:**
- Column headers (h4) are using `text-cyan` but need to be `font-display font-bold` and `uppercase`
- Links in footer need better hover styling beyond just `hover:text-cyan`
- Need better transition and visual feedback
- Overall spacing could be more generous

**Changes to make:**
- **Column h4:** Change from `font-display font-bold text-xs text-cyan tracking-widest uppercase mb-3` to add proper styling classes if missing
- **Footer links:** Add consistent styling to all footer links: `text-blue-200 text-sm hover:text-cyan transition-colors duration-200 font-medium`
- **Main CTA button:** Already properly styled
- **Copyright section:** Ensure proper text sizing and spacing

**Verify:** Visit footer on any page — column headers should be cyan and uppercase, links should smoothly transition to brighter cyan on hover.

---

### 9. Create Missing Tasks Directory
**Action:** Ensure `.agents/tasks/` directory exists for plan storage.

**Verify:** Directory exists and plan file is written.

---

## Summary of Global Tailwind Patterns to Apply

### Typography Everywhere
```
h1: font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight [color-class]
h2: font-display font-bold text-4xl md:text-5xl leading-tight tracking-tight [color-class]
h3: font-display font-bold text-xl md:text-2xl text-ink
body: text-base md:text-lg leading-relaxed [text-color]
small: text-sm font-medium
```

### Cards (Universal Pattern)
```
bg-white border border-line rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300
```

### Buttons (Primary)
```
inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-navy hover:-translate-y-0.5 transition-all duration-200
```

### Buttons (Secondary)
```
inline-flex items-center gap-2 border-2 border-line text-ink px-6 py-3 rounded-xl font-bold text-sm hover:border-brand hover:text-brand transition-all duration-200
```

### Form Inputs
```
w-full px-4 py-3 rounded-xl border border-line bg-white text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors
```

### Section Spacing
```
py-20 md:py-28 lg:py-32
```

### Section Container
```
max-w-6xl mx-auto px-6 md:px-8
```

---

## Notes for Implementation

1. **No CSS files to create** — all changes are inline Tailwind utility classes only
2. **Verify color palette** — use exact custom colors from tailwind.config.js (ink, navy, muted, paper, brand, cyan, line, lav, white)
3. **Font families** — font-display is Space Grotesk, font-sans is DM Sans (default for body)
4. **Responsive breakpoints** — use standard md: and lg: prefixes
5. **Image path fix** — Remember to change Vishwa's image path from `.jpeg` to `.png` in `content.js`
6. **Hover animations** — Use translate-y, shadow transitions, and color shifts consistently
7. **Accessibility** — Ensure focus states are visible (focus:ring-2) and maintain sufficient contrast
8. **Test thoroughly** — Check all pages at mobile, tablet, and desktop widths after changes
