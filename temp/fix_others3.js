const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));

let fixes = 0;

// Fix 1: "monitor-configuración" link in best-monitors -> correct URL
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

// Fix 2: "headphones" in ES text -> "auriculares"
['best-headphones', 'open-headphones'].forEach(id => {
  const g = guides.find(x => x.id === id);
  if (!g) return;
  const check = (text) => {
    if (!text) return text;
    if (text.includes('headphones')) {
      return text.replace(/\bheadphones\b/g, 'auriculares');
    }
    return text;
  };
  if (g.sections) g.sections.forEach(s => {
    if (!s) return;
    if (s.content_es) s.content_es = check(s.content_es);
    if (s.heading_es) s.heading_es = check(s.heading_es);
  });
  if (g.intro_es) g.intro_es = check(g.intro_es);
  if (g.verdict_es) g.verdict_es = check(g.verdict_es);
  if (g.conclusion_es) g.conclusion_es = check(g.conclusion_es);
  if (g.verdictProsCons) g.verdictProsCons.forEach(v => {
    v.pros_es = v.pros_es.map(check);
    v.cons_es = v.cons_es.map(check);
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