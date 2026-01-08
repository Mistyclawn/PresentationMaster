# PresentationMaster - AI Agent Guidelines

## Project Overview
**PPTXManager** is a professional presentation lifecycle tool—from design through rehearsal—built with React 18 + TypeScript, Vite, and Electron for offline-first desktop use.

---

## Architecture Essentials

### Component Structure
The app follows a clear three-tier hierarchy:

1. **App.tsx** (root): Project state, view switching (InitialScreen ↔ Editor/Dashboard)
2. **EditorLayout.tsx** (editor) | **Dashboard.tsx** (presentation prep): Main feature containers
3. **Focused components**: Header, Sidebar, Workspace (editor) | SlideDesignModal (design control)

**Key pattern**: Props down, callbacks up. If cross-cutting state needed, lift to App.tsx.

### Data Model
Core entities live at App level:
- `slides[]`: Array of Slide objects with id, title, description, script, duration, elements[]
- `elements[]`: ShapeElement (rect/circle/text/image) with x, y, width, height, styling
- `designTemplate`: Theme colors, fonts, layout rules—referenced by all slides
- `project`: Metadata container (name, createdAt, totalDuration, theme)

When adding features touching multiple slides or global design, modify App state, not local component state.

---

## Development Workflow

### Build & Runtime
```bash
npm run dev:electron          # Vite + Electron dev mode (HMR enabled)
npm run build && npm run build:electron  # Production bundle
```

**Critical**: Dev mode runs Vite dev server on a local port; Electron's main.js loads it via IPC. Watch `Console` tab in DevTools for both process logs.

### IPC Bridge (Electron ↔ React)
File operations use `preload.js` → `main.js` channels:
- `window.ipc.send('save-pptx', { slides, metadata })` 
- `window.ipc.on('file-loaded', handler)` for async responses

Avoid direct `require('fs')` in React—route through IPC only.

---

## Styling & Theming

### CSS Variables
Global colors, spacing, fonts defined in `styles/variables.css`:
```css
:root {
  --primary-color: #1976d2;
  --spacing-unit: 8px;
  --font-family: 'Segoe UI', sans-serif;
}
```

Each component gets a `.css` file co-located in its folder. Use CSS Modules or class names with BEM-like prefix (`editor-header`, `dashboard-sidebar`).

**Don't**: Inline styles or hardcoded colors. Always reference `variables.css`.

---

## Component Conventions

### New Editor Features
1. Add UI to Header.tsx (tools) or Sidebar.tsx (panels)
2. Pass selected shape state via Workspace props
3. Update element in canvas via `onUpdateElement(id, newProps)`
4. Lift state change to App for persistence

**Example**: Adding a text color picker—add control to Header, dispatch color change to App's shape, re-render Workspace with updated style.

### New Dashboard Features  
1. Dashboard.tsx manages timeline, narrative, compact view—avoid adding logic to child modals
2. SlideDesignModal.tsx is read-only analysis + bulk apply (design consistency only)
3. Keep drag-drop, timeline math in Dashboard; keep Modal for display & action buttons only

---

## File Operations & PPTX

All PPTX read/write → Electron IPC (`main.js` handlers). React components never touch `fs` directly.

**Pattern for new export features**:
1. Gather data in Header.tsx or Dashboard.tsx
2. `window.ipc.send('export-variant', { slides, format })`
3. Main process writes file, replies `export-complete`
4. React receives reply, shows success toast

---

## Design Consistency Strategy

SlideDesignModal analyzes each slide's:
- Font family (must match `designTemplate.fontFamily`)
- Color palette (validates against `designTemplate.colors[]`)
- Layout grid (checks alignment consistency)

When users bulk-apply design rules via Modal → App updates all slides with matching template ref.

---

## Testing & Debugging

- **React DevTools**: Inspect component tree, props, state
- **Electron DevTools**: `Ctrl+Shift+I` in app—check IPC messages, file ops
- **Console.logs**: Log in both processes separately (Vite terminal vs. Electron window)
- **Hot reload**: Vite HMR works for React code; Electron restart needed for main.js changes

---

## Common Pitfalls

1. **Async state**: Use `useEffect` for file loads; store data in state, not local variables
2. **IPC timeouts**: Main.js slow operations can hang UI—add progress callbacks for long tasks
3. **Cross-slide updates**: Always batch in App; don't update slide objects independently
4. **Theme mismatches**: New colors must be added to `variables.css` + `designTemplate` type
5. **Component reuse**: Sidebar, Header, Workspace are Editor-specific; create Dashboard equivalents if needed

---

## Key Files Reference

| File | Purpose |
|------|---------|
| [Frontend/src/App.tsx](Frontend/src/App.tsx) | Root state, view routing |
| [Frontend/src/components/Editor/EditorLayout.tsx](Frontend/src/components/Editor/EditorLayout.tsx) | Editor container & layout |
| [Frontend/src/components/Dashboard/Dashboard.tsx](Frontend/src/components/Dashboard/Dashboard.tsx) | Timeline & narrative flow UI |
| [Frontend/src/components/Dashboard/SlideDesignModal.tsx](Frontend/src/components/Dashboard/SlideDesignModal.tsx) | Design analysis & bulk apply |
| [Frontend/electron/main.js](Frontend/electron/main.js) | File I/O, PPTX parsing, IPC handlers |
| [Frontend/src/styles/variables.css](Frontend/src/styles/variables.css) | Design tokens (colors, spacing, fonts) |
| [Frontend/vite.config.ts](Frontend/vite.config.ts) | Build & dev server config |

---

## When Adding Features

1. **Before coding**: Check if state should live in App or component—err on global side
2. **Build once**: Use `npm run build && npm run build:electron` to catch TS errors
3. **Test IPC**: If file work, mock/stub main.js handler or use dev-mode file ops
4. **Cross-check styles**: Ensure new colors are in `variables.css`, component CSS references them
5. **Props contract**: Define clear interface for component inputs; document non-obvious flow

**Icon library**: Project uses Google Material Symbols—reference by name in code, library handles rendering.

---

## Questions to Guide Implementation

- Does this feature touch multiple slides or global design? → Lift to App state
- Does this need file I/O? → Route through Electron IPC  
- Is this Editor-only or Dashboard-only? → Keep components separate; don't cross-pollinize
- Does this introduce new colors/fonts? → Add to `variables.css` and `designTemplate`
- Does this affect slide persistence? → Ensure App state updates trigger save in main.js

