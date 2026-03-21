# Coverage Page

A React + Vite application for displaying platform coverage information with filtering and sorting capabilities.

---

## Features

- **Platform Listing**: View all available platforms in a data table
- **Category Filtering**: Filter by categories (All Platforms, Gig Economy, Payments, Payroll & HRIS, Tax Portals, Utilities)
- **Status Filtering**: Toggle between Working and Coming soon statuses
- **Search**: Search platforms by name
- **Sorting**: Sort table by platform name, type, or status

---

## Technologies

- [React](https://reactjs.org/) 19 with Vite 7
- CSS Modules for component styling
- ESLint for code linting

---

## Project Structure

```
src/
├── components/
│   ├── SearchBar/
│   │   ├── SearchBar.jsx
│   │   └── SearchBar.css
│   ├── DataTable/
│   │   ├── DataTable.jsx
│   │   └── DataTable.css
│   ├── StatusChips/
│   │   ├── StatusChips.jsx
│   │   └── StatusChips.css
│   └── Tabs/
│       ├── Tabs.jsx
│       └── Tabs.css
├── hooks/
│   └── useDatasources.js
├── utils/
│   └── sort.js
├── pages/
│   └── Coverage.jsx
├── App.jsx
├── App.css
├── main.jsx
└── index.css
```

---

## Getting Started

### Prerequisites

- Node.js 18+

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

---

## Data Source

The application uses mock data defined in `src/hooks/useDatasources.js`. This can be replaced with API calls when needed.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## License

Private - All rights reserved
