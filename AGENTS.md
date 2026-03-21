# AGENTS.md

Instructions for AI agents working on this codebase.

---

## Project Overview

This is a React + Vite application that displays platform coverage information. It fetches data from an external API and presents it in a filterable, sortable data table.

---

## Tech Stack

- **Framework**: React 19 with Vite 7
- **Styling**: CSS Modules
- **Linting**: ESLint 9 with React Hooks and React Refresh plugins
- **Language**: JavaScript (ES6+)

---

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## Code Conventions

### Component Structure

- Use functional components with hooks
- CSS Modules for component styling (`.jsx` + `.css` in same folder)
- Prop types should be documented in comments when non-obvious

### File Organization

```
src/
├── components/     # Reusable UI components
│   └── ComponentName/
│       ├── ComponentName.jsx
│       └── ComponentName.css
├── hooks/          # Custom React hooks
├── utils/          # Utility functions
├── pages/          # Page-level components
└── App.jsx         # Main app component
```

### Styling

- CSS Modules are used for component-scoped styles
- Global styles are in `index.css`
- Follow existing naming conventions in CSS files

---

## Data Source

The application uses mock data defined in `src/hooks/useDatasources.js`. To use an API instead, replace the `MOCK_DATA` array with a fetch call inside a `useEffect` hook.

---

## Working with this Codebase

1. **Linting**: Always run `npm run lint` before committing changes
2. **Component development**: Create components in `src/components/` with CSS Modules
3. **Custom hooks**: Place in `src/hooks/` for shared logic
4. **Utilities**: Place pure functions in `src/utils/`

---

## Testing

There are no automated tests configured for this project. Manual testing should be performed by running `npm run dev` and verifying functionality in the browser.

---

## Build for Deployment

```bash
npm run build
```

The production build output is in the `dist/` directory.
