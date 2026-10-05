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
// 1. identical normalized headings: keep first
G.forEach(g => {
  const seenH = new Map();
  const rm = [];
  (g.sections || []).forEach((s, si) => {
    const h = normHead(s.heading || '');
    if (!h) return;
    if (seenH.has(h)) rm.push(si);
    else seenH.set(h, si);
  });
  rm.sort((a, b) => b - a).forEach(si => {
    console.log('REMOVE-DUPHEAD ' + g.id + ' S' + si + ' "' + (g.sections[si].heading || '').slice(0, 50) + '"');
    g.sections.splice(si, 1);
    removed++;
  });
});
// 2. later single-product "Closer Look" where an earlier dedicated review exists for same pid
G.forEach(g => {
  const rm = [];
  (g.sections || []).forEach((s, si) => {
    const prods = s.products || [];
    if (prods.length !== 1) return;
    if (!/Closer Look|análisis detallado/i.test(s.heading || '')) return;
    const pr = P.find(p => p.id === prods[0]);
    if (!pr) return;
    const toks = namesOf(pr.title, pr.brand);
    const earlier = g.sections.slice(0, si).some(o => {
      const head = normHead((o.heading_es || '') + ' ' + (o.heading || ''));
      return toks.some(t => head.includes(t));
    });
    if (earlier) rm.push(si);
  });
  rm.sort((a, b) => b - a).forEach(si => {
    console.log('REMOVE-REDUNDANT ' + g.id + ' S' + si + ' "' + g.sections[si].heading.slice(0, 50) + '"');
    g.sections.splice(si, 1);
    removed++;
  });
});
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2));
console.log('removed=' + removed);