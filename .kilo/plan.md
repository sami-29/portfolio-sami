# Portfolio Redesign Plan

## Overview

Transform the portfolio from a generic developer template (9/20 audit score) into a distinctive, technically ambitious showcase that matches the .impeccable.md vision: **Japanese minimalism meets bold modernism**, with warm amber accents, custom typography, cinematic motion, and three layered overdrive effects.

**Skills combined**: /typeset + /colorize + /animate + /delight + /overdrive

---

## Phase 1: Foundation — Typography & Color

These are the lowest-level changes that everything else builds on. Must be done first because animations and effects will reference these tokens.

### 1.1 Typography (/typeset)

**Goal**: Replace system defaults with a distinctive type system that communicates "this person cares about craft."

**Font stack** (per .impeccable.md):

- **Headings**: Space Grotesk (geometric, technical-yet-distinctive character)
- **Body**: Inter (clean readability)
- **Code**: JetBrains Mono (technical identity in blog posts)

**Implementation**:

- Load all three via `next/font/google` in `app/layout.tsx` with `display: 'swap'`
- Define CSS variables: `--font-heading`, `--font-body`, `--font-mono`
- Pass to Chakra theme via `theme.tokens.fonts`

**Type scale** (fluid for headings, fixed for body):

```
Display:  clamp(3rem, 5vw + 1rem, 5rem)     — hero name
H1:       clamp(2.25rem, 3.5vw + 1rem, 3.5rem) — page titles
H2:       clamp(1.5rem, 2vw + 0.75rem, 2rem)   — section headings
H3:       1.25rem                                — subsection
Body:     1rem (16px)                            — paragraphs
Small:    0.875rem                               — captions, labels
XS:       0.75rem                                — tags, metadata
```

**Weight strategy**:

- Regular (400): body text
- Medium (500): secondary labels, metadata
- SemiBold (600): nav links, button text, subheads
- Bold (700): headings only

**Letter-spacing**:

- Uppercase labels: `0.1em` (already used, keep)
- Large display text: `-0.02em` (tighten for impact)
- Body: default

**Files to modify**:

- `app/layout.tsx` — font imports
- `components/theme.ts` — font tokens in Chakra config
- `app/HomeContent.tsx` — hero heading sizes
- `app/about/AboutContent.tsx` — heading sizes
- `app/projects/ProjectsContent.tsx` — heading sizes
- `components/BlogPost.tsx` — article typography
- `components/BlogUI.tsx` — list typography
- All components using `fontSize` props — align to scale

### 1.2 Color System (/colorize)

**Goal**: Replace generic teal with warm amber accent on properly layered dark surfaces.

**Accent palette — Warm Amber**:

```
amber.50:  #FFF8E1
amber.100: #FFECB3
amber.200: #FFD54F
amber.300: #FFCA28
amber.400: #FFC107
amber.500: #FFB300   ← primary accent
amber.600: #FF8F00
amber.700: #FF6F00
amber.800: #E65100
amber.900: #BF360C
amber.950: #8C2700
```

On dark backgrounds, primary usage will be `amber.400` (bright enough for contrast) and `amber.300` for hover states. On rare light surfaces: `amber.700`/`amber.800`.

**Dark surface layers** (per .impeccable.md):

```
gray.950: #0a0a0b   — deepest background (body)
gray.900: #111113   — primary surface
gray.850: #18181b   — elevated surface (new custom token)
gray.800: #1e1e22   — cards, navbar on scroll
gray.750: #27272c   — hover states, active surfaces (new custom token)
gray.700: #3a3a42   — borders, dividers
gray.600: #52525c   — muted text, secondary
gray.500: #71717c   — placeholder text
gray.400: #a1a1ac   — secondary text (ensure 4.5:1 on gray.950)
gray.300: #d4d4dc   — primary body text
gray.200: #e5e5ec   — emphasized text
gray.100: #f5f5f8   — headings on dark
```

**Tint direction**: All grays get a very subtle cool-violet undertone (not pure neutral, not warm). This creates subconscious cohesion with the warm amber accent through contrast.

**Implementation**:

- Replace `brand` token palette in `components/theme.ts` with `amber` values
- Add custom `gray` overrides with tinted values
- Search and replace all `brand.*` references → `amber.*`
- Search and replace all `blue.300`/`blue.600` accent usage → `amber` equivalents
- Fix all `color="white"` hard-codes → use `gray.100` token
- Fix `bg="rgba(0, 0, 0, 0.82)"` → use token-based overlay

**Contrast audit fixes**:

- About page labels: `gray.500` on dark → change to `gray.400` (meets 4.5:1)
- Navbar: add scroll-based backdrop so white text always has contrast
- Blog post subtitle: `gray.400` → ensure contrast

**Files to modify**:

- `components/theme.ts` — full palette replacement
- `app/HomeContent.tsx` — all `blue.*` and `brand.*` refs
- `app/about/AboutContent.tsx` — label colors, card borders
- `components/Navbar.tsx` — link colors, active states
- `components/Project.tsx` — overlay, tag colors
- `components/PostPreview.tsx` — accent underline color
- `components/AboutCard.tsx` — hover border color
- `components/TableOfContents.tsx` — hover color
- `app/projects/[slug]/ProjectPageClient.tsx` — back link, tags, accent arrows
- `components/BlogPost.tsx` — heading colors, speeedyUrl banner

---

## Phase 2: Motion System — Animate & Delight

Build the animation infrastructure, then layer in micro-interactions and delight moments.

### 2.1 Motion Infrastructure (/animate)

**Goal**: Activate the `motion` library and establish reusable animation patterns.

**Create `utils/motion.ts`** — shared animation config:

```typescript
// Easing curves
export const easing = {
  outQuart: [0.25, 1, 0.5, 1],
  outQuint: [0.22, 1, 0.36, 1],
  outExpo: [0.16, 1, 0.3, 1],
};

// Stagger presets
export const stagger = {
  fast: 0.08, // 80ms between children
  normal: 0.12, // 120ms
  slow: 0.18, // 180ms
};

// Standard entrance preset
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: easing.outQuart },
};

// Section reveal (scroll-triggered)
export const revealOnScroll = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: easing.outQuart },
};
```

**Create `components/MotionWrapper.tsx`** — reduced-motion–aware wrapper:

- Wraps `motion` components
- Reads `prefers-reduced-motion` via a media query hook
- If reduced motion: renders children without animation (instant)
- If normal: applies motion props

**Global reduced-motion CSS** in `globals.css`:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### 2.2 Page Load Choreography (/animate)

**Hero entrance** (HomeContent.tsx):

1. Subtitle label ("Full-Stack Engineer") — fade in + slide up (0ms delay)
2. Name heading ("Sami Bentaleb") — fade in + slide up (100ms delay)
3. Description paragraph — fade in + slide up (200ms delay)
4. Social links — stagger fade in (300ms start, 80ms each)

**Other pages** — same stagger pattern but lighter:

- Page title fades in (0ms)
- Content fades in (150ms)
- Grid items stagger (300ms start)

### 2.3 Scroll Reveals (/animate)

**Intersection Observer-based reveals**:

- Featured Projects heading + subtitle — reveal on scroll
- Project cards — stagger reveal as grid enters viewport
- About page sections — stagger reveal
- Blog post list items — stagger reveal

**Implementation**: Use `motion.div` with `whileInView` and `viewport: { once: true }`.

### 2.4 Micro-interactions (/animate + /delight)

**Buttons**:

- Hover: `translateY(-2px)` + subtle shadow increase (CSS transition, 200ms ease-out-quart)
- Active: `translateY(1px)` (100ms)
- Already using `transition: "all 0.3s"` → replace with targeted `transition: "transform 0.2s cubic-bezier(0.25,1,0.5,1), box-shadow 0.2s cubic-bezier(0.25,1,0.5,1)"`

**Project cards** (Project.tsx):

- Currently: `transform: scale(1.02)` + overlay opacity
- Improve: add subtle shadow depth on hover, smoother overlay reveal with slight slide-up of text content

**Navbar**:

- Scroll state: transparent → frosted glass (backdrop-blur + slight bg) on scroll
- Use a scroll listener or CSS `animation-timeline: scroll()` where supported
- Mobile menu: slide down with stagger, not instant

**Blog post links** (PostPreview.tsx):

- Keep the underline scaleX animation (it's good)
- Add subtle `translateX(4px)` on hover for the whole link block

**Copy Discord username**:

- Current: just a toast
- Add: brief checkmark icon swap animation on the button itself (icon morphs from Copy → Check for 1.5s)

### 2.5 Delight Moments (/delight)

**Navbar logo**:

- "Sami" text gets a subtle amber glow/color-shift on hover

**Project card tags**:

- Slight stagger fade-in when overlay appears

**Scroll-to-top button** (ProjectsContent.tsx):

- Animate entry/exit (fade + slide up from bottom)

**Blog reading progress**:

- Add a thin amber progress bar at the top of blog posts that fills as user scrolls

**Empty blog state**:

- Current: "I'm working on some exciting blog posts."
- Add a subtle pulsing dot or animated ellipsis to feel alive

**Console easter egg**:

- `console.log` a styled message: "Looking under the hood? Let's talk → [email]"

---

## Phase 3: Overdrive Effects

The three layered extraordinary moments. Each must have a graceful fallback.

### 3.1 Scroll-Driven Parallax Hero

**Location**: Hero section in `HomeContent.tsx`

**Effect**: As user scrolls down past the hero:

- Hero name moves up at 0.5x scroll speed (parallax)
- Subtitle label moves at 0.3x speed
- Description fades to 0 opacity by 50vh scroll
- Creates a depth/cinema feel as content scrolls away

**Implementation**:

```css
@supports (animation-timeline: scroll()) {
  .hero-name {
    animation: parallax-up linear both;
    animation-timeline: scroll();
    animation-range: 0vh 80vh;
  }
  @keyframes parallax-up {
    to {
      transform: translateY(-30%);
      opacity: 0.3;
    }
  }
}
```

**Fallback**: Without `animation-timeline` support (Firefox), hero is just static — still looks fine. The entrance animations (/animate phase) carry the experience.

**Files**: `app/HomeContent.tsx`, `app/globals.css` (for the @supports block)

### 3.2 View Transitions API for Page Navigation

**Effect**: When navigating between pages:

- Project card → project detail: card image morphs/expands into the detail page header
- Blog list → blog post: title morphs between list and detail view
- General pages: crossfade transition

**Implementation**:

- Add `view-transition-name` CSS properties to shared elements:
  - Project card image: `view-transition-name: project-{slug}`
  - Project detail hero image: matching `view-transition-name`
  - Page titles: `view-transition-name: page-title`
- Use Next.js `unstable_ViewTransition` or manual `document.startViewTransition` wrapper
- Define `::view-transition-old` and `::view-transition-new` CSS for timing/easing

**Fallback**: Browsers without View Transitions API get instant navigation (current behavior). No degradation.

**Files**:

- `app/globals.css` — view transition CSS
- `components/Project.tsx` — add transition names to card elements
- `app/projects/[slug]/ProjectPageClient.tsx` — matching transition names
- `components/PostPreview.tsx` — blog title transition name
- `components/BlogPost.tsx` — matching title transition name
- May need a `ViewTransitionLink` wrapper component

### 3.3 Generative Shader Hero Background

**Effect**: A subtle, slowly-moving noise/fluid field behind the hero section. Responds very gently to mouse position (not a dramatic effect — a subtle living texture). Warm amber tones mixed with dark grays.

**Implementation**:

- Create `components/ShaderBackground.tsx`
- Use a `<canvas>` element with WebGL2
- Fragment shader: layered simplex noise at different scales, colored in amber/dark tones
- Mouse position passed as uniform, creates gentle distortion
- Canvas positioned `absolute` behind hero content, fades out at bottom via CSS gradient mask
- Lazy-initialize: only create WebGL context when hero is in viewport
- Pause when off-screen or tab inactive
- `prefers-reduced-motion`: show static gradient (no animation)

**Fallback hierarchy**:

1. WebGL2 available → animated shader
2. WebGL2 not available → CSS radial gradient with subtle amber glow (static but still warm)
3. Reduced motion → static gradient

**Performance constraints**:

- Render at half resolution (canvas CSS-scaled 2x)
- Target 30fps, not 60 (subtle enough that 30 looks smooth)
- Destroy context on component unmount
- No external libraries — custom minimal shader (~50 lines of GLSL)

**Files**:

- New: `components/ShaderBackground.tsx`
- New: `utils/shaders.ts` (vertex + fragment shader source)
- `app/HomeContent.tsx` — mount ShaderBackground behind hero

---

## Phase 4: Polish & Accessibility Fixes

### 4.1 Accessibility Fixes

- [ ] Add `prefers-reduced-motion` global CSS (Phase 2.1)
- [ ] Add skip-to-content link in `layout.tsx`
- [ ] Fix navbar: add scroll-based backdrop (Phase 2.4)
- [ ] Fix About labels contrast: `gray.500` → `gray.400`
- [ ] Fix all `transition: "all 0.3s"` → targeted properties only
- [ ] Ensure all amber accent text passes 4.5:1 contrast on dark surfaces
- [ ] Add `aria-current="page"` to active nav links
- [ ] Fix mobile nav icon sizes (X=12px vs Menu=20px → both 20px)

### 4.2 Performance Fixes

- [ ] Replace `transition: "all 0.3s"` with specific properties everywhere
- [ ] AboutCard: replace Chakra `<Image>` with Next.js `<Image>` for optimization
- [ ] Add `priority` to hero-area images (first project cards above fold)
- [ ] Lazy-load shader canvas (only when hero visible)
- [ ] Shader at half resolution

### 4.3 Remaining .impeccable.md Alignment

- [ ] Navbar becomes transparent with backdrop-blur on scroll (not just transparent always)
- [ ] Project images: consistent aspect ratios in detail pages
- [ ] ThemeToggle component exists but is never mounted in the UI — since the site is dark-mode only (per .impeccable.md), this is correct. Remove the unused ThemeToggle component.

---

## Implementation Order

| Step | Phase | Description                                                   | Est. scope                    |
| ---- | ----- | ------------------------------------------------------------- | ----------------------------- |
| 1    | 1.2   | Color system: replace teal → amber, tint grays, fix contrasts | ~12 files                     |
| 2    | 1.1   | Typography: load fonts, set scale, update all components      | ~10 files                     |
| 3    | 2.1   | Motion infrastructure: create utils, reduced-motion CSS       | 2 new files + globals.css     |
| 4    | 2.2   | Hero entrance choreography                                    | HomeContent.tsx               |
| 5    | 2.3   | Scroll reveals across all pages                               | ~5 files                      |
| 6    | 2.4   | Micro-interactions: buttons, cards, navbar scroll             | ~6 files                      |
| 7    | 2.5   | Delight moments: progress bar, copy anim, easter egg          | ~4 files                      |
| 8    | 3.1   | Scroll-driven parallax hero                                   | HomeContent.tsx + globals.css |
| 9    | 3.3   | Shader background                                             | 2 new files + HomeContent.tsx |
| 10   | 3.2   | View Transitions API                                          | ~6 files + new wrapper        |
| 11   | 4.x   | Polish & accessibility fixes                                  | ~8 files                      |

**Total new files**: ~4 (motion utils, motion wrapper, shader background, shader source)
**Total modified files**: ~15-18 unique files

---

## What This Achieves

**Before**: Generic developer portfolio with teal accent, system fonts, zero animation, template card layouts. Audit score: 9/20.

**After**: A portfolio that communicates mastery through craft:

- **Typography** that says "I chose this deliberately"
- **Warm amber** on dark tinted surfaces — sophisticated, not "AI startup"
- **Cinematic entrance** with staggered reveals
- **Living hero** with a subtle shader background
- **Seamless navigation** via View Transitions between pages
- **Parallax depth** as you scroll past the hero
- **Micro-interactions** that feel responsive and intentional
- **Full accessibility**: reduced motion, contrast, keyboard nav, skip links

Target audit score: **17-18/20** (Good to Excellent).
