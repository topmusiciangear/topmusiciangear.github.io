const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));

let fixes = 0;

function safeReplace(text, from, to) {
  if (!text || typeof text !== 'string') return text;
  if (text.includes(from)) {
    return text.split(from).join(to);
  }
  return text;
}

// Fix 1: "monitor-configuración" link in best-monitors
const bm = guides.find(x => x.id === 'best-monitors');
if (bm && bm.sections) {
  bm.sections.forEach(s => {
    if (!s) return;
    s.content_es = safeReplace(s.content_es, '/guides/monitor-configuración.html', '/guides/monitor-setup_es.html');
    s.content_es = safeReplace(s.content_es, 'Monitor configuración guide', 'Guía de configuración de monitores');
  });
}

// Fix 2: "headphones" in ES text
['best-headphones', 'open-headphones'].forEach(id => {
  const g = guides.find(x => x.id === id);
  if (!g) return;
  if (g.sections) g.sections.forEach(s => {
    if (!s) return;
    s.content_es = safeReplace(s.content_es, 'headphones', 'auriculares');
    s.heading_es = safeReplace(s.heading_es, 'headphones', 'auriculares');
  });
  g.intro_es = safeReplace(g.intro_es, 'headphones', 'auriculares');
  g.verdict_es = safeReplace(g.verdict_es, 'headphones', 'auriculares');
  g.conclusion_es = safeReplace(g.conclusion_es, 'headphones', 'auriculares');
  if (g.verdictProsCons) g.verdictProsCons.forEach(v => {
    if (!v) return;
    if (v.pros_es) v.pros_es = v.pros_es.map(p => safeReplace(p, 'headphones', 'auriculares'));
    if (v.cons_es) v.cons_es = v.cons_es.map(c => safeReplace(c, 'headphones', 'auriculares'));
  });
});

// Fix 3: "es el mejor para" in usb-mics ES
const um = guides.find(x => x.id === 'usb-mics');
if (um && um.sections) {
  um.sections.forEach(s => {
    if (!s) return;
    s.content_es = safeReplace(s.content_es, 'es el mejor para ', 'es ideal para ');
  });
}

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('Fixes applied');