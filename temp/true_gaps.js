const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = require(DIR + 'data/guides.json');
const P = require(DIR + 'data/products.json');
function normHead(s) { return (s || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim(); }
const STOP = new Set(['audio', 'pro', 'live', 'series', 'edition', 'studio', 'best', 'microphone', 'monitor', 'guitar', 'bass', 'drums', 'piano', 'synth', 'pedal', 'interface', 'mixer', 'headphones', 'keyboard', 'amp', 'speaker', 'dynamic', 'condenser', 'wireless', 'digital', 'system', 'acoustic', 'electric']);
function distinctive(title, brand) {
  const toks = normHead((title || '') + ' ' + (brand || '')).split(' ').filter(w => w.length > 1);
  return {
    model: toks.filter(t => /[0-9]/.test(t) && t.length > 1),
    names: toks.filter(t => t.length >= 3 && !STOP.has(t))
  };
}
// TRUE gaps: product in guide with NO section naming it (model token OR >=2 name tokens)
const gaps = [];
G.forEach(g => {
  const ids = new Set();
  (g.sections || []).forEach(s => (s.products || []).forEach(id => ids.add(id)));
  (g.featuredProducts || []).forEach(id => ids.add(id));
  [...ids].forEach(pid => {
    const pr = P.find(x => x.id === pid);
    if (!pr) { gaps.push([g.id, pid, 'UNKNOWN PRODUCT']); return; }
    const d = distinctive(pr.title, pr.brand);
    const hit = (g.sections || []).some(s => {
      const head = normHead((s.heading_es || '') + ' ' + (s.heading || ''));
      if (d.model.some(t => head.includes(t))) return true;
      const nm = d.names.filter(t => head.includes(t));
      if (nm.length >= 2) return true;
      if (nm.length === 1 && ((s.products || []).length === 1 || (s.products || [])[0] === pid)) return true;
      return false;
    });
    if (!hit) gaps.push([g.id, pid, pr.title]);
  });
});
console.log('TRUE gaps: ' + gaps.length);
const byG = {};
gaps.forEach(([gid, pid, t]) => { (byG[gid] = byG[gid] || []).push(pid + ':' + t); });
Object.entries(byG).forEach(([gid, arr]) => console.log(gid + ' (' + arr.length + '): ' + arr.join(' / ')));
fs.writeFileSync(DIR + 'temp/true_gaps.json', JSON.stringify(gaps));