const fs = require('fs');
function normHead(s) {
  return (s || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}
const STOP = new Set(['audio','pro','live','series','edition','mk','the','and','vs','for','your','studio','best','what','which','with','from','how','why','es','el','la','los','las','para','una','un','mejor','del','de','y','o','a','en','que','como','cuando','donde','cual','son','se','su','this','that','are','is','do','does','should','buy','get','use']);
function prodTokens(p) {
  const t = normHead((p.title || '') + ' ' + (p.brand || ''));
  return t.split(' ').filter(w => w.length > 2 && !STOP.has(w));
}
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const G = require(F);
const P = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');
let unskipped = 0;
G.forEach(g => {
  (g.sections || []).forEach(s => {
    if (!s.skipMedia) return;
    const prods = (s.products || []).map(pid => P.find(pr => pr.id === pid)).filter(Boolean);
    if (!prods.length) return;
    // (b) single-product dedicated: always unskip
    if (prods.length === 1) { delete s.skipMedia; unskipped++; return; }
    // (a) heading names the topic product
    const head = normHead((s.heading_es || '') + ' ' + (s.heading || ''));
    let best = null, bestCount = 0;
    prods.forEach(p => {
      const c = prodTokens(p).filter(t => head.indexOf(t) > -1).length;
      if (c > bestCount) { best = p; bestCount = c; }
    });
    if (bestCount > 0) { delete s.skipMedia; unskipped++; }
  });
});
fs.writeFileSync(F, JSON.stringify(G, null, 2));
console.log('skipMedia eliminados:', unskipped);