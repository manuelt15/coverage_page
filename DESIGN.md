# Design System

The visual language is adapted from Notion's marketing system: a warm paper canvas, near-black
Inter set tight, exactly one structural accent, and a decorative palette that never paints
structure. Every value lives in [`src/styles/tokens.css`](src/styles/tokens.css); components
reference tokens and never write a literal. `npm test` enforces that.

---

## The one rule

Blue is the only colour that paints an action. `--primary` covers the primary call to action,
inline links, the active category pill and the focus ring. Nothing else. The sticker palette
decorates: monogram tiles, filter dots and the status chips. If a new element needs colour, it
is almost always ink, hairline or canvas.

---

## Colour

### Structural

| Token | Value | Use |
|---|---|---|
| `--primary` | `#0075de` | Actions, links, active tab, focus |
| `--primary-active` | `#005bab` | Pressed state |
| `--secondary` | `#213183` | The single dark hero band |
| `--on-primary` | `#ffffff` | Type on the indigo band |

### Surfaces

| Token | Value | Use |
|---|---|---|
| `--canvas-soft` | `#f6f5f4` | Page canvas and table header. The warmth is the point: never a clinical white page |
| `--surface` / `--canvas` | `#ffffff` | Cards, fields, top bar |
| `--hairline` | `#e6e6e6` | 1px borders and dividers |

### Text

`--ink` (95% black) for headings and names, `--ink-secondary` for table body, `--ink-muted` for
supporting copy, `--ink-faint` for captions, counts and placeholders.

### Sticker palette

`--accent-sky`, `--accent-purple`, `--accent-pink`, `--accent-teal`, `--accent-green`,
`--accent-orange`, plus the deep variants. Decoration only, with one sanctioned exception:
status. The source system carries status on this palette rather than a separate semantic ramp,
so the chips derive from it:

| Token | Derivation |
|---|---|
| `--status-working-fill` | `--accent-green` at 12% over the surface |
| `--status-working-ink` | `--accent-green` darkened 72% toward black |
| `--status-soon-fill` | `--accent-orange` at 12% over the surface |
| `--status-soon-ink` | `--accent-orange-deep` |

The text tones are darkened on purpose: `#1aae39` straight on white does not reach a readable
contrast ratio.

---

## Typography

One family, Inter, loaded from Google Fonts. Weight carries the hierarchy; there is no second
face. Tokens pack `weight size/line-height family` into a single `font` shorthand, with tracking
as a sibling token because it cannot ride in the shorthand.

| Token | Size / weight | Tracking |
|---|---|---|
| `--text-display-1` | 64px / 700 | `-2.125px` |
| `--text-display-2` | 54px / 700 | `-1.875px` |
| `--text-heading-1` | 40px / 700 | `-1px` |
| `--text-heading-2` | 26px / 700 | `-0.625px` |
| `--text-heading-3` | 22px / 700 | `-0.25px` |
| `--text-title` | 20px / 600 | `-0.125px` |
| `--text-body-md` | 16px / 400 | 0 |
| `--text-body-sm` | 15px / 400 | 0 |
| `--text-button` | 16px / 500 | 0 |
| `--text-caption` | 14px / 400 | 0 |
| `--text-eyebrow` | 12px / 600 | `+0.125px` |

Apply the negative tracking explicitly. The original system uses a tuned cut of Inter; plain
Inter at default tracking reads noticeably looser at display sizes.

---

## Space, shape and depth

Spacing runs on a base of 8: `--space-xxs` 4 through `--space-xxl` 32. Content centres in
`--container` (1080px).

Radii carry meaning. Fields stay tight at `--radius-xs` (4px), utility controls at
`--radius-md` (8px), cards at `--radius-lg` (12px), and `--radius-full` is for pills and chips.
A pill-shaped input is wrong in this system.

Elevation is two tokens, `--shadow-1` and `--shadow-2`, each a stack of four or five nearly
transparent layers. Most surfaces need only a hairline. There are no hard drop shadows.

---

## Components

| Component | Notes |
|---|---|
| `nav-bar` | White, sticky, hairline underneath. Wordmark and platform count |
| `hero-band` | The one inverted moment: full-bleed `--secondary` with `display-1` and the stats |
| `badge-pill` | White pill, `--primary` text, eyebrow type |
| `Tabs` | Category pills. Active is white with a hairline, a soft shadow and blue type |
| `SearchBar` | White field at `--radius-xs`, focus turns the border blue and adds `--shadow-1` |
| `StatusChips` | Neutral filter chrome with a coloured dot. The colour proper stays in the table |
| `DataTable` | White card, `--canvas-soft` header in uppercase eyebrow, hairline rows |
| `BrandLogo` | Brand icon, then domain favicon, then a monogram on a sticker tile |

---

## Motion

Two easing tokens, no bare curves in components: `--ease-out`
`cubic-bezier(0.23, 1, 0.32, 1)` for states that enter or respond, `--ease-in-out`
`cubic-bezier(0.77, 0, 0.175, 1)` for something moving on screen. The built-in CSS easings are
too weak to read as intentional. `ease-in` is never used: it starts slow, exactly where the eye
is looking.

| Element | Motion |
|---|---|
| Category pill, filter chip | Colour at 150ms `ease`, `scale(0.97)` on press at 160ms `--ease-out` |
| Search field | Border and shadow at 150ms `--ease-out`, since focus is a state arriving |
| Column header | Colour at 150ms `ease`. No press scale: it fills the cell and shrinking it would shift the whole header |
| Sort icon | 180 degree rotation at 150ms `--ease-in-out`, which is movement, not a state change |
| Table row hover | No transition. It fires dozens of times a session and a delay there reads as lag |

Nothing runs over 300ms, nothing animates anything but `transform`, `opacity` and colour, and
every `:hover` rule sits behind `@media (hover: hover) and (pointer: fine)` so a tap on a touch
screen does not trigger a hover state.

Reduced motion is not zero motion: movement and press transforms go, colour transitions stay,
because those are what explain the state change.

---

## Responsive

| Breakpoint | Behaviour |
|---|---|
| ≥ 840px | Full container, table in four columns |
| ≤ 840px | Hero drops to `display-2`, padding tightens |
| ≤ 600px | Hero drops to `heading-1`, category pills scroll sideways, and every table row becomes a stacked card built from the `data-label` on each cell |

The table never scrolls horizontally. Below 600px the header row is hidden and each cell prints
its own label, which is why `data-label` is a tested contract and not a decoration.
