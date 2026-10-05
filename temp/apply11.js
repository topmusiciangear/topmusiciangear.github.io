const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = require(DIR + 'data/guides.json');
const P = require(DIR + 'data/products.json');
const batch = require(DIR + 'temp/rw_last38.js');
const want = new Set(['monitor-setup|59', 'live-sound-pa|493', 'beginner-guitar|295', 'best-electric-guitar|295', 'best-guitar-home-office|296', 'best-beginner-electric-guitar|465', 'best-beginner-electric-guitar|466', 'best-pa-speakers|495', 'best-pa-speakers|496', 'budget-pa-systems|493', 'active-vs-passive-pa|497']);
let ok = 0;
for (const e of batch) {
  const pid = e.sec.products[0];
  const key = e.g + '|' + pid;
  if (!want.has(key)) continue;
  const g = G.find(x => x.id === e.g);
  // skip if a dedicated review already exists
  const exists = g.sections.some(s => {
    if (!(s.products || []).includes(pid)) return false;
    const h = ((s.heading_es || '') + ' ' + (s.heading || '')).toLowerCase();
    const pr = P.find(p => p.id === pid);
    const toks = ((pr.title || '') + ' ' + (pr.brand || '')).toLowerCase().split(/[^a-z0-9]+/).filter(w => w.length > 1);
    const GEN = new Set(['powered','passive','speakers','speaker','electric','guitars','guitar','smart','best','budget','pa','para','las','los','una','con','para']);
    const model = toks.filter(t => /[0-9]/.test(t) && t.length > 2);
    if (model.some(t => h.includes(t))) return true;
    const names = toks.filter(t => t.length >= 5 && !GEN.has(t));
    return names.filter(t => h.includes(t)).length >= 2;
  });
  if (exists) { console.log('SKIP (exists) ' + key); continue; }
  const s = e.sec;
  g.sections.push({ heading: s.heading, heading_es: s.heading_es, content: s.content, content_es: s.content_es, products: s.products });
  console.log('ADD ' + key);
  ok++;
}
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2));
console.log('added=' + ok);