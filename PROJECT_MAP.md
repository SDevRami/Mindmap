# PROJECT_MAP.md

## [TECH_STACK]

- **Languages:** HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Frontend:** Single-page application with SVG-based canvas (no framework)
- **Rendering:** SVG (`<svg>` element) for nodes, connections, labels, comments
- **External Libraries (CDN):**
  - `html2canvas` 0.4.1 -- rasterizes SVG to canvas for PNG export
  - `jsPDF` 1.3.2 + 2.5.1 (umd) -- PDF export (only 2.5.1 is actually used via `window.jspdf`)
  - Google Fonts API (`webfonts/v1`) -- loads font list for the description editor
- **Storage:** `localStorage` (mindmap index, history, theme preference, custom keyboard shortcuts)
- **File I/O:** Native file API (`<input type="file">`, `Blob`, `URL.createObjectURL`) for save/load `.mndmp` files
- **Export formats:** `.mndmp` (JSON), `.svg`, `.png`, `.pdf`
- **No package manager, no build tool, no CI/CD detected**

## [UI_FLOW]

1. **Landing Page** (`index.html` + `main_script.js` + `main_styles.css`)
   - User sees a left sidebar with "Empty Mindmap" button, theme toggle, and "Clear My Mindmap".
   - Main area shows 3 template cards (Single Line, Tree, SnowFlake) and a grid of previously saved mindmaps.
   - Clicking a template/card navigates to `app.html?mindmap=<path>`.
   - Saved mindmaps are rendered from SVG thumbnails stored in `localStorage` under key `mindMapIndex`.

2. **Editor Page** (`app.html` + `app_script.js` + `app_styles_dark.css` / `app_styles_light.css`)
   - Reads `?mindmap=` query param; loads template `.mndmp` if present, else starts empty.
   - `init()` (line ~3461) restores theme, initializes history, loads fonts, populates shortcuts, and binds all event listeners.
   - **Header:** theme toggle, back button, menu, presentation mode, zoom, snap-to-grid, fixed-axis X/Y, undo/redo, search, minimize presentation.
   - **Footer toolbar:** node type selector, title input, connection type/label/color, auto-styling toggle, node size/font/color/position inputs, add-node button, add-comment button.
   - **Main SVG canvas:** pan (middle mouse), zoom (mouse wheel or buttons), select/move nodes (left mouse).
   - **Sidebars (toggle via menu):** history list, task list (drag-reorderable with checkboxes), presentation sidebar, comment window, description editor (rich text using `document.execCommand`).

3. **User Interactions:**
   - **Add Node:** fill title, optionally set parent by selecting a node, click "Add Node" or press `Shift+A`. A connection line auto-draws to the parent.
   - **Select/Move:** left-click on node; drag to move; `Shift+click` for multi-select.
   - **Connect:** select 2+ nodes, use "Double Connection" or "Parent-Child Connection" buttons/shortcuts.
   - **Edit:** select node/line, modify fields in footer, click "Save Changes" (`Ctrl+S`).
   - **Collapse/Expand:** select a node, click collapse button (`Shift+C`); children hidden and count badge shown.
   - **Description:** select node, open description window (`Shift+D`), rich-text editor with font/color/size/alignment.
   - **Comment:** click add-comment button, an SVG icon placed on canvas, click to edit.
   - **History:** every mutation pushes state to `history[]` (max 50). Undo/redo via buttons or `Ctrl+Z`/`Ctrl+Y`.
   - **Save/Load:** `.mndmp` JSON files via menu sidebar. Also registers mindmap in `localStorage` index for landing page gallery.
   - **Export:** SVG, PNG (via html2canvas path in canvas), PDF (via jsPDF).

## [ARCHITECTURE]

### Layer 1 -- Entry Points
| File | Role |
|---|---|
| `index.html` | Landing page / mindmap gallery |
| `app.html` | Main editor page |
| `main_script.js` | Landing page logic (theme toggle, template cards, load saved mindmaps) |
| `app_script.js` | Editor logic (~3506 lines, all-in-one) |

### Layer 2 -- Styles
| File | Role |
|---|---|
| `main_styles.css` | Landing page styles |
| `app_styles_dark.css` | Dark theme for editor (default) |
| `app_styles_light.css` | Light theme for editor |

### Layer 3 -- Core Modules (all inside `app_script.js`)

**A. State & Globals** (lines 1-150)
- `circles[]`, `lines[]`, `history[]`, `selectedCircle`, `selectedLine`, `viewBox`, `theme`, `auto`, `snaptogrid`, `fixedAxisX/Y`, `presentation`, `comments[]`, `tasklistitems[]`

**B. Theme Management**
- `toggleTheme()` -- swaps CSS stylesheet, updates SVG fill colors

**C. Shortcut System** (lines 186-517)
- `populateShortcutsLists()` -- builds 51 dropdown selectors for modifier+key combos
- `resetShortcuts()`, `saveShortcutsValues()`, `loadShortcutsValues()`, `checkShorcuts()` -- persist/validate custom bindings via `localStorage`

**D. Sidebar Managers**
- `toggleMenu()`, `toggleSidebar()`, `togglePresentationSidebar()`, `toggleMiniPresentationSidebar()`, `toggleTasksSidebar()` -- show/hide overlay panels
- History sidebar renders clickable entries; clicking loads that historical state.

**E. Node (Circle) System** (lines 1381-1594)
- `createCircle(type, x, y, text, parentGroup, id)` -- creates an SVG `<g>` containing one visible shape (circle/rect/triangle), text, collapse circle, collapse text
- Selection via `selectCircle()` / `deselectCircle()` -- highlights stroke, populates footer inputs, enables subtool sidebar
- Drag via `startDrag()` / `drag()` / `endDrag()` -- moves all selected nodes, snap-to-grid, fixed-axis constraints, calls `updateLines()`
- `addCircle()` -- creates node + auto-draws parent connection line
- `updateCircle()` -- applies footer input values (text, size, color, font, position, type) to selected node/line
- `deleteCircle()` -- removes node and all connected lines

**F. Connection (Line) System** (lines 2039-2165)
- `drawLine(circle1, circle2, labelText, lineStyle, lineColor, connectionType)` -- creates SVG `<line>`, transparent hit-target `<line>`, and `<text>` label
- `connectionType='connection'` draws a double-offset line (two parallel lines)
- Labels are clickable to select the line
- `updateLines()` -- recalculates all line endpoints + label midpoints (called during drag)
- `deleteConnection()` -- removes selected line
- `connectCircle()` -- draws line between first two selected nodes

**G. Collapse System** (lines 2167-2235)
- `toggleChildVisibility()` -- recursively hides/shows child nodes + their lines; shows count badge on parent

**H. Description / Comment System** (lines 1596-1800)
- `loadDescriptionFonts()` -- fetches Google Fonts API, populates font-family dropdown
- Rich-text toolbar using `document.execCommand` (bold, italic, underline, strikethrough, color, alignment, font)
- Comments are SVG `<g>` with rect + image icon, draggable, with nickname and text

**I. History / Undo-Redo** (lines 2721-2915)
- `saveHistory()` -- snapshots `circles[]` and `lines[]` into `history[]` array (cap 50)
- `loadMindMapFromHistory(index)` -- clears canvas and rebuilds from a historical snapshot
- `undoActionsFromHistory()` / `redoActionsFromHistory()` -- increment/decrement `currentIndex`

**J. Persistence / Export** (lines 3173-3458)
- `saveAsJson()` -- serializes mindmap (circles + connections + history + tasks) to `.mndmp` file + registers in `localStorage` index
- `saveAsSvg()` -- clones SVG DOM, serializes as XML, triggers download
- `saveAsPng()` -- renders SVG to canvas via `Image`, exports as PNG
- `saveAsPdf()` -- renders SVG to canvas, then embeds in jsPDF
- `loadFromJson()` / `LoadTemplate()` -- parses `.mndmp` JSON and rebuilds full graph; identical code duplication across 3 functions
- `saveDataInIndex()` -- updates `localStorage` `mindMapIndex` with name, path, thumbnail SVG

**K. Pan / Zoom** (lines 2654-2719)
- `startPan()` / `pan()` / `endPan()` -- middle-mouse drag pans viewBox
- `zoom()` -- mouse wheel or buttons scales viewBox, keeping selected node as focal point

**L. Task List** (lines 1183-1260)
- Draggable todo list with checkbox completion, stored in `tasklistitems[]`

### Layer 4 -- Static Assets
| Directory/File | Content |
|---|---|
| `MindmapData/*.svg` | 40+ SVG icons for UI buttons (menu, zoom, delete, theme, etc.) |
| `MindmapData/*.mndmp` | 3 template mindmap files (SingleLine, Tree, SnowFlake) |
| `MindmapData/MindmapShortcutsMap.png` | Shortcuts reference image |
| `MindmapData/MindmapLogo.png` | Logo (unused in code) |
| `MindmapData/MindmapLogo.ico` | Favicon (unused in code) |
| `MindmapData/fonts.txt` | Accumulated Google Fonts `<link>` tags from previous runs |
| `favicon.ico` | Site favicon |
| `export/` | Empty directory; default save path for mindmaps |

## [ORPHANS & PENDING]

1. ~~Massive code duplication~~ **FIXED** -- Extracted shared logic into `buildMindMapFromData()`, `clearSVG()`, `applyCircleStyle()`, and `restoreCollapsedStates()`. All three load functions now delegate to these helpers (~95% code reduction in duplicated paths).

2. ~~Duplicate jsPDF CDN includes~~ **FIXED** -- Removed `jspdf/1.3.2`; only `jspdf/2.5.1` is loaded.

3. ~~Hardcoded Google Fonts API key~~ **FIXED** -- Removed API key and the `fetchGoogleFonts()` call. Font list now uses only the static local fallback list.

4. **Unused assets** -- `MindmapData/MindmapLogo.png` and `MindmapData/MindmapLogo.ico` are present but not referenced in any HTML or JS. Low priority.

5. **`export/` directory** is empty; no automated export file management.

6. ~~No build tool / package.json~~ **FIXED** -- Added `package.json` with a `serve` start script for Render deployment.

7. ~~Comment system incomplete~~ **FIXED** -- Added a global click handler (`window.addEventListener('click', ...)`) that deselects the comment when clicking outside the comment window, add-comment button, or existing comment SVG elements.

8. ~~Minor typo~~ **FIXED** -- `app.html:108` corrected from "Templat: Snowflake" to "Template: Snowflake".

9. ~~Inverted fixedAxisX/fixedAxisY logic~~ **FIXED** -- Drag function now correctly locks X when `fixedAxisX` is on, and locks Y when `fixedAxisY` is on.

10. **No responsive breakpoints for editor** -- `app_styles_dark.css` and `app_styles_light.css` only have a footer-responsive `@media (max-width: 600px)` query at line ~125.

11. **Memory/performance** -- `history[]` stores full deep copies of the entire graph; each mutation copies all circle and line objects. With 50-item cap and large graphs this may cause memory pressure. Consider reducing cap or storing deltas.

12. ~~Missing `sanitizeFontName` usage~~ **FIXED** -- Google Fonts API was removed; all font names now come from the static local list and are run through `sanitizeFontName()` before use.

13. **New: localStorage wrappers** -- `safeGetItem()`, `safeSetItem()`, `safeRemoveItem()`, `safeParseJSON()` added with try/catch error handling and `handleQuotaExceeded()` recovery that auto-removes the oldest saved project when storage is full.

14. **New: Bulk export/import** -- Menu now has "Export All Projects" and "Import All Projects" buttons using `.mndmpindex` backup files, enabling migration between browsers/devices.
