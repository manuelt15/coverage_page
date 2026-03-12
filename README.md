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

- [React](https://reactjs.org/) with Vite
- CSS Modules for component styling

---

## Project Structure

```
src/
├── components/
│   ├── SearchBar/
│   ├── DataTable/
│   ├── StatusChips/
│   └── Tabs/
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

### Linting

```bash
npm run lint
```

---

## API

Data is fetched from: `https://api.getrollee.com/api/dashboard/v0.1/documentation/datasources`
