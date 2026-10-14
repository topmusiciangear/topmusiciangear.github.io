const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));

let fixes = 0;

function safeCheck(text) {
  if (!text || typeof text !== 'string') return text;
  if (text.includes('headphones')) {
    return text.replace(/\bheadphones\b/g, 'auriculares');
  }
  return text;
}

// Fix 1: "monitor-configuración" link in best-monitors
const bm = guides.find(x => x.id === 'best-monitors');
if (bm && bm.sections) {
  bm.sections.forEach(s => {
    if (!s) return;
    if (s.content_es && s.content_es.includes('/guides/monitor-configuración.html')) {
      s.content_es = s.content_es.replace(/\/guides\/monitor-configuración\.html/g, '/guides/monitor-setup_es.html');
      fixes++;
    }
    if (s.content_es && s.content_es.includes('Monitor configuración guide')) {
      s.content_es = s.content_es.replace(/Monitor configuración guide/g, 'Guía de configuración de monitores');
      fixes++;
    }
  });
}

// Fix 2: "headphones" in ES text
['best-headphones', 'open-headphones'].forEach(id => {
  const g = guides.find(x => x.id === id);
  if (!g) return;
  if (g.sections) g.sections.forEach(s => {
    if (!s) return;
    if (s.content_es) s.content_es = safeCheck(s.content_es);
    if (s.heading_es) s.heading_es = safeCheck(s.heading_es);
  });
  if (g.intro_es) g.intro_es = safeCheck(g.intro_es);
  if (g.verdict_es) g.verdict_es = safeCheck(g.verdict_es);
  if (g.conclusion_es) g.conclusion_es = safeCheck(g.conclusion_es);
  if (g.verdictProsCons) g.verdictProsCons.forEach(v => {
    if (!v) return;
    if (v.pros_es) v.pros_es = v.pros_es.map(safeCheck);
    if (v.cons_es) v.cons_es = v.cons_es.map(safeCheck);
  });
});

// Fix 3: "es el mejor para" in usb-mics ES
const um = guides.find(x => x.id === 'usb-mics');
if (um && um.sections) {
  um.sections.forEach(s => {
    if (!s) return;
    if (s.content_es && s.content_es.includes('es el mejor para ')) {
      s.content_es = s.content_es.replace(/es el mejor para /g, 'es ideal para ');
      fixes++;
    }
  });
}

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('Otros fixes:', fixes);