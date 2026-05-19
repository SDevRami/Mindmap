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
  const searchInput = document.getElementById('search-mindmaps');
  if (searchInput) searchInput.style.cssText = `width:100%;max-width:300px;padding:8px;border-radius:5px;border:none;background:${isLight ? '#f5f5ff' : '#222436'};color:${isLight ? '#000' : '#fff'};`;
  document.querySelectorAll('.mindmap-svg-wrapper').forEach(m => {
    m.style.backgroundColor = isLight ? 'white' : 'black';
    m.style.border = isLight ? "1px solid #f5f5ff" : "1px solid #222436";
  });
  document.querySelectorAll('.mindmap-label').forEach(l => {
    l.style.backgroundColor = isLight ? '#f5f5ff' : '#222436';
    l.style.color = isLight ? '#000' : '#fff';
  });
  document.querySelectorAll('.card-actions button').forEach(b => {
    const action = b.getAttribute('data-action');
    if (action === 'delete') { b.style.cssText = 'display:flex;align-items:center;justify-content:center;width:28px;height:28px;padding:0;margin:0;border:none;border-radius:4px;cursor:pointer;background:#ff4d4d;'; }
    else if (action === 'download') { b.style.cssText = `display:flex;align-items:center;justify-content:center;width:28px;height:28px;padding:0;margin:0;border:none;border-radius:4px;cursor:pointer;${isLight ? 'background:#6bff7c;' : 'background:#00ff88;'}`; }
    else if (action === 'rename') { b.style.cssText = 'display:flex;align-items:center;justify-content:center;width:28px;height:28px;padding:0;margin:0;border:none;border-radius:4px;cursor:pointer;background:#ffaa00;'; }
    else if (action === 'duplicate') { b.style.cssText = 'display:flex;align-items:center;justify-content:center;width:28px;height:28px;padding:0;margin:0;border:none;border-radius:4px;cursor:pointer;background:#00aaff;'; }
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

function loadMindMaps(filter) {
  const container = document.getElementById("mindmaps-container");
  try {
    const raw = safeGetItem('mindMapIndex');
    let mindmaps = raw ? JSON.parse(raw) : null;
    container.innerHTML = "";
    if (!mindmaps || mindmaps.length === 0) {
      container.innerHTML = '<p style="color:#888; font-size:0.85rem;">No saved mindmaps yet.</p>';
      return;
    }
    if (filter) {
      const q = filter.toLowerCase();
      mindmaps = mindmaps.filter(m => m.name.toLowerCase().includes(q));
    }
    mindmaps.forEach((map) => {
      const card = document.createElement("div");
      card.className = "mindmap-card";

      card.addEventListener("click", (e) => {
        if (e.target.closest('.card-actions') || e.target.closest('.mindmap-label')) return;
        window.location.href = `app.html?mindmap=${encodeURIComponent(map.path)}`;
      });
      card.addEventListener("keydown", (e) => {
        if ((e.key === "Enter" || e.key === " ") && !e.target.closest('.card-actions') && !e.target.closest('.mindmap-label')) {
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
      label.style.cursor = 'pointer';
      label.title = 'Click to rename';
      label.addEventListener('dblclick', function() {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = map.name;
        input.style.cssText = 'font-size:0.75rem;padding:2px 4px;width:140px;border-radius:3px;border:1px solid #00ff88;background:#1a1a2e;color:#fff;';
        label.textContent = '';
        label.appendChild(input);
        input.focus();
        input.select();
        const finishRename = () => {
          const newName = input.value.trim();
          if (newName && newName !== map.name) {
            const oldData = safeGetItem('mindmap_' + map.name);
            if (oldData) {
              safeSetItem('mindmap_' + newName, oldData);
              safeRemoveItem('mindmap_' + map.name);
            }
            map.name = newName;
            map.path = 'export/' + newName + '.mndmp';
            const rawIdx = safeGetItem('mindMapIndex');
            const idx = rawIdx ? JSON.parse(rawIdx) : [];
            const entry = idx.find(m => m.name === map.name);
            if (entry) { entry.name = newName; entry.path = map.path; }
            safeSetItem('mindMapIndex', JSON.stringify(idx));
          }
          loadMindMaps(document.getElementById('search-mindmaps').value);
        };
        input.addEventListener('blur', finishRename);
        input.addEventListener('keydown', (ev) => { if (ev.key === 'Enter') { ev.preventDefault(); input.blur(); } });
      });

      const actions = document.createElement("div");
      actions.className = "card-actions";
      actions.style.cssText = 'display:flex;gap:4px;margin-top:6px;';

      const renameBtn = document.createElement("button");
      renameBtn.setAttribute('data-action', 'rename');
      renameBtn.title = 'Rename';
      renameBtn.style.cssText = 'display:flex;align-items:center;justify-content:center;width:28px;height:28px;padding:0;margin:0;background:#ffaa00;border:none;border-radius:4px;cursor:pointer;';
      const renameImg = document.createElement('img');
      renameImg.src = 'MindmapData/MindmapPen.svg';
      renameImg.alt = 'Rename';
      renameImg.style.cssText = 'width:16px;height:16px;';
      renameBtn.appendChild(renameImg);
      renameBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        label.dispatchEvent(new Event('dblclick'));
      });

      const dupBtn = document.createElement("button");
      dupBtn.setAttribute('data-action', 'duplicate');
      dupBtn.title = 'Duplicate';
      dupBtn.style.cssText = 'display:flex;align-items:center;justify-content:center;width:28px;height:28px;padding:0;margin:0;background:#00aaff;border:none;border-radius:4px;cursor:pointer;';
      const dupImg = document.createElement('img');
      dupImg.src = 'MindmapData/MindmapCopy.svg';
      dupImg.alt = 'Duplicate';
      dupImg.style.cssText = 'width:16px;height:16px;';
      dupBtn.appendChild(dupImg);
      dupBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const copyName = 'Copy of ' + map.name;
        const lsData = safeGetItem('mindmap_' + map.name);
        if (lsData) {
          safeSetItem('mindmap_' + copyName, lsData);
          const rawIdx = safeGetItem('mindMapIndex');
          const idx = rawIdx ? JSON.parse(rawIdx) : [];
          if (!idx.find(m => m.name === copyName)) {
            idx.push({ name: copyName, path: 'export/' + copyName + '.mndmp', thumbnail: map.thumbnail });
            safeSetItem('mindMapIndex', JSON.stringify(idx));
          }
          loadMindMaps(document.getElementById('search-mindmaps').value);
        }
      });

      const dlBtn = document.createElement("button");
      dlBtn.setAttribute('data-action', 'download');
      dlBtn.title = 'Download';
      dlBtn.style.cssText = 'display:flex;align-items:center;justify-content:center;width:28px;height:28px;padding:0;margin:0;background:#00ff88;border:none;border-radius:4px;cursor:pointer;';
      const dlImg = document.createElement('img');
      dlImg.src = 'MindmapData/MindmapMenuSaveAsJson.svg';
      dlImg.alt = 'Download';
      dlImg.style.cssText = 'width:16px;height:16px;';
      dlBtn.appendChild(dlImg);
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

      const delBtn = document.createElement("button");
      delBtn.setAttribute('data-action', 'delete');
      delBtn.title = 'Delete';
      delBtn.style.cssText = 'display:flex;align-items:center;justify-content:center;width:28px;height:28px;padding:0;margin:0;background:#ff4d4d;border:none;border-radius:4px;cursor:pointer;';
      const delImg = document.createElement('img');
      delImg.src = 'MindmapData/MindmapDelete.svg';
      delImg.alt = 'Delete';
      delImg.style.cssText = 'width:16px;height:16px;';
      delBtn.appendChild(delImg);
      delBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm('Delete "' + map.name + '"?')) {
          safeRemoveItem('mindmap_' + map.name);
          const updated = mindmaps.filter(m => m.name !== map.name);
          const rawIdx = safeGetItem('mindMapIndex');
          const idx = rawIdx ? JSON.parse(rawIdx) : [];
          const finalIdx = idx.filter(m => m.name !== map.name);
          safeSetItem('mindMapIndex', JSON.stringify(finalIdx));
          loadMindMaps(document.getElementById('search-mindmaps').value);
        }
      });

      actions.appendChild(renameBtn);
      actions.appendChild(dupBtn);
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

document.getElementById('search-mindmaps').addEventListener('input', function() {
  loadMindMaps(this.value);
});

loadMindMaps();
setupTemplateCards();