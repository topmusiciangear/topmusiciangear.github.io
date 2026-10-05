const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = require(DIR + 'data/guides.json');
function normHead(s) { return (s || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim(); }
// distinctive tokens: model-number tokens OR long name tokens (>=5 chars, no stopwords)
const STOP = new Set(['audio', 'pro', 'live', 'series', 'edition', 'studio', 'best', 'microphone', 'monitor', 'guitar', 'bass', 'drums', 'piano', 'synth', 'pedal', 'interface', 'mixer', 'headphones', 'keyboard', 'amp', 'speaker', 'dynamic', 'condenser', 'wireless', 'digital', 'system', 'acoustic', 'electric']);
function distinctive(title, brand) {
  const toks = normHead((title || '') + ' ' + (brand || '')).split(' ').filter(w => w.length > 1);
  const model = toks.filter(t => /[0-9]/.test(t) && t.length > 2);
  const names = toks.filter(t => t.length >= 5 && !STOP.has(t));
  return { model, names };
}
const P = require(DIR + 'data/products.json');
let dupRemoved = 0;
G.forEach(g => {
  // map product -> sections naming it
  const P2 = require(DIR + 'data/products.json');
  const byProd = {};
  (g.sections || []).forEach((s, si) => {
    const head = normHead((s.heading_es || '') + ' ' + (s.heading || ''));
    P2.forEach(p => {
      const d = distinctive(p.title, p.brand);
      const hit = d.model.some(t => head.includes(t)) || d.names.filter(t => head.includes(t)).length >= 2 || (d.names.length === 1 && head.includes(d.names[0]) && (s.products || []).includes(p.id));
      if (hit) { (byProd[p.id] = byProd[p.id] || []).push(si); }
    });
  });
  Object.entries(byProd).forEach(([pid, sis]) => {
    if (sis.length > 1) {
      // keep FIRST, remove LAST appended duplicates (mine are at the end)
      const last = Math.max(...sis);
      const s = g.sections[last];
      console.log('DUP-REMOVE ' + g.id + ' S' + last + ' "' + s.heading + '" pid ' + pid);
      g.sections.splice(last, 1);
      dupRemoved++;
    }
  });
});
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2));
console.log('dupRemoved=' + dupRemoved);