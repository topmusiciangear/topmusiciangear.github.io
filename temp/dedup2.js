const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = require(DIR + 'data/guides.json');
const P = require(DIR + 'data/products.json');
function normHead(s) { return (s || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim(); }
const STOP = new Set(['audio', 'pro', 'live', 'series', 'edition', 'studio', 'best', 'microphone', 'monitor', 'guitar', 'bass', 'drums', 'piano', 'synth', 'pedal', 'interface', 'mixer', 'headphones', 'keyboard', 'amp', 'speaker', 'dynamic', 'condenser', 'wireless', 'digital', 'system', 'acoustic', 'electric']);
function namesOf(title, brand) {
  return normHead((title || '') + ' ' + (brand || '')).split(' ').filter(w => w.length > 1)
    .filter(t => /[0-9]/.test(t) ? t.length > 2 : (t.length >= 4 && !STOP.has(t)));
}
let removed = 0;
G.forEach(g => {
  // product -> section indices whose heading mentions it (any single distinctive token)
  const hits = {};
  (g.sections || []).forEach((s, si) => {
    const head = normHead((s.heading_es || '') + ' ' + (s.heading || ''));
    P.forEach(p => {
      const toks = namesOf(p.title, p.brand);
      if (toks.some(t => head.includes(t))) { (hits[p.id] = hits[p.id] || []).push(si); }
    });
  });
  const toRemove = new Set();
  Object.entries(hits).forEach(([pid, sis]) => {
    if (sis.length > 1) {
      // keep FIRST, remove later ones that look like appended reviews ("A Closer Look"/"análisis detallado" or same-product single sections)
      sis.slice(1).forEach(si => {
        const s = g.sections[si];
        if (/Closer Look|análisis detallado/i.test(s.heading)) toRemove.add(si);
      });
    }
  });
  [...toRemove].sort((a, b) => b - a).forEach(si => {
    console.log('REMOVE ' + g.id + ' S' + si + ' "' + g.sections[si].heading + '"');
    g.sections.splice(si, 1);
    removed++;
  });
});
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2));
console.log('removed=' + removed);