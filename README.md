# Coverage Page

A React + Vite page listing which data-source platforms we can read from today and which are on
the way, with search, category and status filters, and sortable columns.

Visual language adapted from Notion's marketing system. The full token reference is in
[DESIGN.md](DESIGN.md).

---

## Features

- **Platform table**: platform, type, category and status, sortable by any column
- **Category filter**: pills with live counts across Gig Economy, Payments, Payroll & HRIS, Tax Portals and Utilities
- **Status filter**: toggle Working and Coming soon
- **Search**: filter by platform name
- **Brand logos**: a three-step cascade, described below
- **Responsive**: below 600px every row reflows into a stacked card, so the table never scrolls sideways

---

## Tech Stack

- [React](https://react.dev/) 19 with [Vite](https://vite.dev/) 7
- Plain CSS with custom properties, one stylesheet per component
- [simple-icons](https://simpleicons.org/) for brand marks
- [Inter](https://rsms.me/inter/) from Google Fonts
- `node:test` for the test suite, no framework
- ESLint 9

---

## Brand logos

`BrandLogo` resolves a platform mark in three steps:

1. **simple-icons**, imported one icon at a time so the bundle only carries what is used. The
   catalogue covers 16 of the 30 platforms, in their official brand colour.
2. **Domain favicon** for the rest, from the `domain` field on each record. This is the only
   third-party request the page makes at runtime.
3. **Monogram** on a sticker-palette tile, picked deterministically from the name, if the
   favicon fails to load.

Salesforce, Workday, Comcast, T-Mobile, Grubhub, TaskRabbit, TurboTax, H&R Block, Rippling,
Zenefits, IRS and PG&E are not in the simple-icons catalogue and resolve at step 2.

---

## Project Structure

```
src/
├── components/
│   ├── BrandLogo/       # icon / favicon / monogram cascade
│   ├── DataTable/       # the table card and its mobile reflow
│   ├── SearchBar/
│   ├── StatusChips/
│   └── Tabs/            # category pills
├── hooks/
│   └── useDatasources.js
├── pages/
│   └── Coverage.jsx
├── styles/
│   └── tokens.css       # the design system: every colour, size, radius and shadow
├── utils/
│   └── sort.js
├── App.jsx              # top bar and hero band
├── App.css
├── index.css            # reset and base, imports the tokens
└── main.jsx
tests/                   # node:test, no framework
```

---

## Getting Started

Node 18+.

```bash
npm install
npm run dev
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the dev server |
| `npm run build` | Build to `dist/` |
| `npm run preview` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run the test suite |

---

## Tests

`npm test` runs `node --test tests/` with no test framework. The suite reads the source rather
than a browser, so it locks contracts that are easy to break by hand:

- no component writes a literal colour, radius or shadow; everything resolves to a token
- the structural blue never paints a decorative background
- no emojis anywhere in the source or the HTML
- the sort icon renders only on the column actually sorting, and `aria-sort` uses the values the
  spec accepts
- every table cell carries the `data-label` its mobile card layout depends on
- nothing is measured in artificial `vh` units or pinned with `position: fixed`

It is not a substitute for looking at the page.

---

## Data Source

Mock data lives in `src/hooks/useDatasources.js`: 30 records with `name`, `type`, `category`,
`status` and `domain`. Replace the array with a fetch inside the existing `useEffect` when there
is an API. Keep `domain`, the logo cascade depends on it.

---

## License

Private - All rights reserved
