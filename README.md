# MindMap Editor

> An SVG-based mind mapping tool with a rich interactive editor, multi-format export, and full undo/redo support.

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

---

## Features

- **Node Editor** — Create, move, resize, and style nodes (circle, rectangle, triangle)
- **Connections** — Draw directed or undirected connections with labels, colors, and line styles
- **Theme Toggle** — Switch between light and dark themes
- **Zoom & Pan** — Mouse-wheel zoom, middle-button pan, and viewport controls
- **Export** — Save mind maps as `.mndmp` (JSON), SVG, PNG, PDF, or **Markdown** (`.md`)
- **Import** — Load `.mndmp` files or bulk-import all projects from a `.mndmpindex` backup
- **Undo / Redo** — Full history stack (up to 50 states), includes comments and tasks
- **Collapse / Expand** — Collapse subtrees with a single click
- **Rich Text Nodes** — Toggle bold/italic on selected node text with green-highlighted toolbar buttons
- **Rich Descriptions** — Inline WYSIWYG editor with font, color, and alignment controls (powered by Google Fonts)
- **Comments** — Draggable SVG comment cards with nickname, text preview, and double-click popup; save/delete support
- **Task List** — Draggable, checkable todo list per mind map
- **Mindmap Statistics** — Modal showing node count, connection count, tree depth, comment count, and task count
- **Search** — Find nodes by title across the active mind map
- **Presentation Mode** — Full-screen node-by-node slideshow
- **Custom Shortcuts** — Rebind any of the 50+ keyboard shortcuts
- **Persistent Storage** — All mind maps saved to `localStorage` with automatic gallery on the landing page
- **Gallery Management** — Rename, duplicate, search, and delete saved mindmaps from the landing page

---

## Getting Started

### Online

Try the hosted version:  
[**https://sdevrami.github.io/Mindmap/**](https://sdevrami.github.io/Mindmap/)

### Local Setup

```bash
git clone https://github.com/SDevRami/Mindmap.git
cd Mindmap
npx serve . -l 3000 --cors
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> Requires **Node.js >= 18**. Alternatively, use any static file server:
> ```bash
> python -m http.server 8000
> ```

---

## Usage

| Action | How |
|---|---|
| **New Mind Map** | Click "Empty Mindmap" on the landing page or select a template (Single Line, Tree, SnowFlake) |
| **Add Node** | Select a parent node on the canvas, fill in the title in the footer, and click "Add Node" or press `Shift+A` |
| **Connect Nodes** | Select two or more nodes and click "Double Connection" or "Parent-Child Connection" |
| **Edit Node / Line** | Select an element and modify its properties (size, color, font, style) in the footer, then click "Save Changes" (`Ctrl+S`) |
| **Delete** | Select a node or line and press `Delete` / `Backspace` |
| **Undo / Redo** | `Ctrl+Z` / `Ctrl+Y` or the toolbar buttons |
| **Export** | Use the menu sidebar to export as `.mndmp`, SVG, PNG, PDF, or Markdown |
| **Search** | `Ctrl+F` to search nodes by title |

> **Note:** This application requires a mouse. Touch support and mobile UI are planned for a future release.

---

## File Structure

```
mindmap/
├── index.html              # Landing page / mind map gallery
├── app.html                # Mind map editor page
├── main_script.js          # Landing page logic
├── app_script.js           # Editor logic (~3570 lines)
├── main_styles.css         # Landing page styles
├── app_styles_dark.css     # Dark theme styles
├── app_styles_light.css    # Light theme styles
├── PROJECT_MAP.md          # Architecture documentation
├── MindmapData/            # SVG icons, templates (.mndmp), and images
├── export/                 # Default export directory
├── favicon.ico             # Site favicon
├── package.json            # Project metadata and start script
└── README.md               # This file
```

---

## Tech Stack

- **Languages:** HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Rendering:** SVG (`<svg>` element)
- **Storage:** `localStorage`
- **Libraries (CDN):**
  - [html2canvas](https://html2canvas.hertzen.com/) — SVG-to-canvas rasterization for PNG export
  - [jsPDF](https://github.com/parallax/jsPDF) — PDF generation
  - [Google Fonts API](https://fonts.google.com/) — Font loading for the description editor
- **No framework, no build step** — open `index.html` and go.

---

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request. For major changes, open an issue first to discuss what you'd like to change.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.
