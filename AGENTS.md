# AGENTS.md

Instructions for AI agents working on this codebase.

---

## Project Overview

React + Vite page listing platform coverage: which data sources we can read from and which are
coming. Data is mock, in `src/hooks/useDatasources.js`.

---

## Tech Stack

- **Framework**: React 19 with Vite 7
- **Styling**: plain CSS with custom properties, one `.css` next to each `.jsx`
- **Icons**: simple-icons, imported one icon at a time
- **Tests**: `node:test`, no framework, with postcss and esbuild as the only helpers
- **Linting**: ESLint 9

---

## Commands

```bash
npm run dev      # dev server
npm run build    # build to dist/
npm run preview  # serve the build
npm run lint     # eslint
npm test         # node --test tests/
```

---

## The design system comes first

Read [DESIGN.md](DESIGN.md) before touching any styling. The rules that matter:

- **Never write a literal colour, radius or shadow in a component.** Everything comes from
  `src/styles/tokens.css`. There is a test that fails on the first literal.
- **`--primary` is the only colour that paints an action.** Links, the active category pill, the
  focus ring. Not backgrounds, not decoration.
- **The sticker palette decorates.** Its one structural job is the status chips, and that is
  inherited from the source system, not an invention.
- **One dark band.** `--secondary` belongs to the hero and nowhere else.
- **Radii carry meaning**: fields 4px, utility controls 8px, cards 12px, pills full. A
  pill-shaped input is wrong here.
- **No emojis.** Anywhere: UI, source, commit messages. Use an inline SVG.
- **Motion has rules too.** Easing comes from `--ease-out` / `--ease-in-out`, never a bare
  `cubic-bezier` and never `ease-in`. Nothing over 300ms. Every `:hover` goes behind
  `@media (hover: hover) and (pointer: fine)`. Pressable controls scale to `0.97` on `:active`.
  The motion section of DESIGN.md explains why each one is what it is, and `tests/motion.test.mjs`
  enforces it.

---

## Code Conventions

- Functional components with hooks, default export per component
- A component folder holds `Component.jsx` and `Component.css`; the JSX imports its own CSS
- Comments explain why a rule exists, not what the line does
- Keep `domain` on every data record, the logo cascade depends on it

---

## Working with this Codebase

1. Run `npm run lint` and `npm test` before committing. Both are fast.
2. Adding a colour means adding a token and justifying it against DESIGN.md, not hardcoding it.
3. Adding a table column means adding it to `COLUMNS` in `DataTable.jsx` with its `data-label`,
   or the mobile card layout loses its label. There is a test for this.
4. The tests read source files, not a rendered page. They catch regressions in contracts, not in
   appearance. Visual changes still need a human looking at the screen.
