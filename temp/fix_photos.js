const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = require(DIR + 'data/guides.json');
const P = require(DIR + 'data/products.json');
function normHead(s) { return (s || '').toLowerCase(); }
function prodTokens(pr) {
  const t = ((pr.title || '') + ' ' + (pr.title_es || '')).toLowerCase().split(/[^a-z0-9+]+/).filter(x => x.length > 1 && !/^(the|and|with|para|los|las|del|una|con|for|pro|series)$/.test(x));
  return [...new Set(t)];
}
function topicScore(head, toks) { let s = 0; toks.forEach(t => { if (head.includes(t)) s += t.length > 4 ? 2 : 1; }); return s; }
let changed = 0;
G.forEach(g => {
  // dedicated owner per product (single-product sections)
  const byPid = {};
  g.sections.forEach((s, si) => {
    if (s.skipMedia) return;
    const prods = s.products || [];
    if (prods.length !== 1) return;
    const head = normHead((s.heading_es || '') + ' ' + (s.heading || ''));
    const pr = P.find(x => x.id === prods[0]);
    const score = pr ? topicScore(head, prodTokens(pr)) : 0;
    (byPid[prods[0]] = byPid[prods[0]] || []).push({ si, score });
  });
  const dedicated = {};
  Object.keys(byPid).forEach(pid => {
    const c = byPid[pid].sort((a, b) => (b.score - a.score) || (a.si - b.si));
    if (c[0].score > 0) dedicated[pid] = c[0].si;
  });
  // multi-product non-split sections whose topic has a dedicated section elsewhere -> skipMedia
  g.sections.forEach((s, si) => {
    if (s.skipMedia || s.splitProducts) return;
    const sps = (s.products || []).map(pid => P.find(pr => pr.id === pid)).filter(Boolean);
    if (sps.length < 2) return;
    const head = normHead((s.heading_es || '') + ' ' + (s.heading || ''));
    let best = null, bs = -1;
    sps.forEach(p => { const sc = topicScore(head, prodTokens(p)); if (sc > bs) { bs = sc; best = p; } });
    if (best && dedicated[best.id] !== undefined && dedicated[best.id] !== si) {
      s.skipMedia = true; changed++;
      console.log('skipMedia: ' + g.id + ' S' + si + ' "' + s.heading + '" (topic ' + best.title + ' owned by S' + dedicated[best.id] + ')');
    }
  });
});
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2));
console.log('TOTAL skipMedia added: ' + changed);