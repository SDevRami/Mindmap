const shortcutsMap = document.getElementById('shortcuts-map');

let mode = (() => { try { return localStorage.getItem('mindMapMode') === 'true'; } catch (e) { return false; } })();

// Apply stored theme on load
(function applyTheme() {
  if (mode) {
    document.getElementById('dark-light-toggleImg').src = "MindmapData/MindmapNightMode.svg";
    document.getElementById('dark-light-toggle-text').innerText = "Dark";
    document.querySelector('body').style.backgroundColor = '#ffffff';
    document.querySelector('body').style.color = '#000';
    document.querySelector('aside').style.backgroundColor = '#f5f5ff';
    document.querySelector('aside h1').style.color = '#000';
    document.querySelectorAll('button').forEach(b => b.style.backgroundColor = '#6bff7c');
    document.querySelectorAll('.template-card').forEach(c => c.style.backgroundColor = '#f5f5ff');
    document.querySelectorAll('.template-label').forEach(l => { l.style.backgroundColor = '#f5f5ff'; l.style.color = '#000'; });
  }
  setTimeout(applyThemeToElements, 0);
})();

function safeGetItem(key, fallback) { try { return localStorage.getItem(key); } catch (e) { return fallback; } }
function safeSetItem(key, val) { try { localStorage.setItem(key, val); return true; } catch (e) { return false; } }
function safeRemoveItem(key) { try { localStorage.removeItem(key); return true; } catch (e) { return false; } }

function applyThemeToElements() {
  const isLight = mode;
  document.querySelectorAll('.mindmap-svg-wrapper').forEach(m => {
    m.style.backgroundColor = isLight ? 'white' : 'black';
    m.style.border = isLight ? "1px solid #f5f5ff" : "1px solid #222436";
  });
  document.querySelectorAll('.mindmap-label').forEach(l => {
    l.style.backgroundColor = isLight ? '#f5f5ff' : '#222436';
    l.style.color = isLight ? '#000' : '#fff';
  });
  document.querySelectorAll('.card-actions button').forEach(b => {
    const isDelete = b.textContent === 'Delete';
    b.style.cssText = `font-size:11px;padding:3px 8px;margin:0;border:none;border-radius:3px;cursor:pointer;${isDelete ? 'background:#ff4d4d;color:#fff;' : (isLight ? 'background:#6bff7c;color:#000;' : 'background:#00ff88;color:#1a1a2e;')}`;
  });
}

function toggleThemeMode() {
  mode = !mode;
  safeSetItem('mindMapMode', mode);
  safeSetItem('mindMapTheme', mode ? 'light' : 'dark');
  const isLight = mode;
  document.getElementById('dark-light-toggleImg').src = isLight ? "MindmapData/MindmapNightMode.svg" : "MindmapData/MindmapLightMode.svg";
  document.getElementById('dark-light-toggle-text').innerText = isLight ? "Dark" : "Light";
  document.querySelector('body').style.backgroundColor = isLight ? '#ffffff' : '#0f0f1a';
  document.querySelector('body').style.color = isLight ? '#000' : '#fff';
  document.querySelector('aside').style.backgroundColor = isLight ? '#f5f5ff' : '#222436';
  document.querySelector('aside h1').style.color = isLight ? '#000' : '#fff';
  document.querySelectorAll('button').forEach(b => b.style.backgroundColor = isLight ? '#6bff7c' : '#00ff88');
  document.querySelectorAll('.template-card').forEach(c => c.style.backgroundColor = isLight ? '#f5f5ff' : 'black');
  document.querySelectorAll('.template-label').forEach(l => { l.style.backgroundColor = isLight ? '#f5f5ff' : '#222436'; l.style.color = isLight ? '#000' : '#fff'; });
  applyThemeToElements();
};

function clearProjects() {
    safeRemoveItem('mindMapIndex');
    loadMindMaps();
};

function loadMindMaps() {
  const container = document.getElementById("mindmaps-container");
  try {
    const raw = safeGetItem('mindMapIndex');
    const mindmaps = raw ? JSON.parse(raw) : null;
    container.innerHTML = "";
    if (!mindmaps || mindmaps.length === 0) {
      container.innerHTML = '<p style="color:#888; font-size:0.85rem;">No saved mindmaps yet.</p>';
      return;
    }
    mindmaps.forEach((map) => {
      const card = document.createElement("div");
      card.className = "mindmap-card";

      card.addEventListener("click", (e) => {
        if (e.target.closest('.card-actions')) return;
        window.location.href = `app.html?mindmap=${encodeURIComponent(map.path)}`;
      });
      card.addEventListener("keydown", (e) => {
        if ((e.key === "Enter" || e.key === " ") && !e.target.closest('.card-actions')) {
          e.preventDefault();
          window.location.href = `app.html?mindmap=${encodeURIComponent(map.path)}`;
        }
      });

      const svgWrapper = document.createElement("div");
      svgWrapper.className = "mindmap-svg-wrapper";
      const svgString = map.thumbnail;
      if (svgString) {
          const parser = new DOMParser();
          const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');
          const svgElement = svgDoc.documentElement;
          if (svgDoc.getElementsByTagName('parsererror').length) {
              console.error('Error parsing SVG:', svgDoc.getElementsByTagName('parsererror')[0].textContent);
          } else {
              svgElement.style.borderRadius = '5px';
              svgWrapper.appendChild(svgElement);
          }
      }

      const label = document.createElement("div");
      label.className = "mindmap-label";
      label.textContent = map.name;

      const actions = document.createElement("div");
      actions.className = "card-actions";
      actions.style.cssText = 'display:flex;gap:4px;margin-top:6px;';

      const delBtn = document.createElement("button");
      delBtn.textContent = 'Delete';
      delBtn.style.cssText = 'font-size:11px;padding:3px 8px;margin:0;background:#ff4d4d;color:#fff;border:none;border-radius:3px;cursor:pointer;';
      delBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm('Delete "' + map.name + '"?')) {
          safeRemoveItem('mindmap_' + map.name);
          const updated = mindmaps.filter(m => m.name !== map.name);
          safeSetItem('mindMapIndex', JSON.stringify(updated));
          loadMindMaps();
        }
      });

      const dlBtn = document.createElement("button");
      dlBtn.textContent = 'Download';
      dlBtn.style.cssText = 'font-size:11px;padding:3px 8px;margin:0;background:#00ff88;color:#1a1a2e;border:none;border-radius:3px;cursor:pointer;';
      dlBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const lsData = safeGetItem('mindmap_' + map.name);
        if (lsData) {
          const blob = new Blob([lsData], { type: 'application/mndmp' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = map.name + '.mndmp';
          link.click();
          URL.revokeObjectURL(link.href);
        }
      });

      actions.appendChild(dlBtn);
      actions.appendChild(delBtn);
      card.appendChild(svgWrapper);
      card.appendChild(label);
      card.appendChild(actions);
      container.appendChild(card);
    });
    applyThemeToElements();
  } catch (error) {
    container.innerHTML = '<p style="color:#f87171; font-size:0.75rem;">Failed to load mindmaps.</p>';
    console.error(error);
  }
}

function loadLocalMindmap(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (!data.circles) { alert('Invalid .mndmp file.'); return; }
      const name = file.name.endsWith('.mndmp') ? file.name.slice(0, -6) : file.name;
      safeSetItem('mindmap_' + name, e.target.result);
      const raw = safeGetItem('mindMapIndex');
      const mindmaps = raw ? JSON.parse(raw) : [];
      if (!mindmaps.find(m => m.name === name)) {
        const thumbSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="160" height="100"><rect width="160" height="100" fill="#0f0f1a"/><text x="80" y="55" text-anchor="middle" fill="#00ff88" font-size="14">' + name + '</text></svg>';
        mindmaps.push({ name: name, path: 'export/' + name + '.mndmp', thumbnail: thumbSvg });
        safeSetItem('mindMapIndex', JSON.stringify(mindmaps));
      }
      alert('Loaded "' + name + '" into My MindMaps.');
      loadMindMaps();
    } catch (err) { alert('Error loading file: ' + err.message); }
  };
  reader.readAsText(file);
}

function setupTemplateCards() {
  const templateContainer = document.getElementById("template-container");
  templateContainer.querySelectorAll(".template-card").forEach((card) => {
    const path = card.getAttribute("data-path");
    if (!path) return;
    card.addEventListener("click", () => {
      window.location.href = `app.html?mindmap=${encodeURIComponent(path)}`;
    });
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        window.location.href = `app.html?mindmap=${encodeURIComponent(path)}`;
      }
    });
  });
}

function exportAllProjects() {
    const raw = safeGetItem('mindMapIndex');
    const projects = raw ? JSON.parse(raw) : [];
    const data = { version: 1, exportedAt: new Date().toISOString(), mindMapIndex: projects, projects: {} };
    projects.forEach(p => {
        const content = safeGetItem('mindmap_' + p.name);
        if (content) data.projects['mindmap_' + p.name] = content;
    });
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'mindmap-backup.mndmpindex';
    link.click();
    URL.revokeObjectURL(link.href);
}

function importAllProjects(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            if (!data.mindMapIndex || !data.projects) { alert('Invalid backup file format.'); return; }
            const raw = safeGetItem('mindMapIndex');
            const existingIndex = raw ? JSON.parse(raw) : [];
            const existingNames = new Set(existingIndex.map(p => p.name));
            let imported = 0;
            data.mindMapIndex.forEach(p => {
                const key = 'mindmap_' + p.name;
                if (data.projects[key] && !existingNames.has(p.name)) {
                    existingIndex.push(p);
                    safeSetItem(key, data.projects[key]);
                    imported++;
                }
            });
            safeSetItem('mindMapIndex', JSON.stringify(existingIndex));
            alert('Imported ' + imported + ' new project(s). ' + (data.mindMapIndex.length - imported) + ' skipped (already exist).');
            loadMindMaps();
        } catch (err) { alert('Failed to import: ' + err.message); }
    };
    reader.readAsText(file);
}

document.getElementById('load-local-btn').addEventListener('click', () => document.getElementById('load-local-input').click());
document.getElementById('load-local-input').addEventListener('change', function() { if (this.files[0]) loadLocalMindmap(this.files[0]); this.value = ''; });
document.getElementById('export-all-btn').addEventListener('click', exportAllProjects);
document.getElementById('import-all-btn').addEventListener('click', () => document.getElementById('import-all-input').click());
document.getElementById('import-all-input').addEventListener('change', function() { if (this.files[0]) importAllProjects(this.files[0]); this.value = ''; });

loadMindMaps();
setupTemplateCards();