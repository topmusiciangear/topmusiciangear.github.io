const P = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');
const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
function norm(s) {
  return (s || '').toLowerCase()
    .replace(/generation/g, 'gen').replace(/microphone/g, 'mic').replace(/series/g, '')
    .replace(/[^a-z0-9]/g, '');
}
const byNorm = {};
P.forEach(p => { byNorm[norm(p.title)] = p.id; });
const cols = new Set();
G.forEach(g => {
  if (g.productTable) g.productTable.columns.forEach(c => cols.add(c.title));
  if (g.comparison && g.featuredSnippet) {
    if (g.featuredSnippet.name1_en) cols.add(g.featuredSnippet.name1_en);
    if (g.featuredSnippet.name2_en) cols.add(g.featuredSnippet.name2_en);
  }
});
let hit = 0; const miss = [];
cols.forEach(t => {
  if (/^(Price|Connectivity|Key Specs|Type|Best For)$/i.test(t)) return;
  const n = norm(t);
  if (byNorm[n]) { hit++; return; }
  // prefix fallback, unique, small diff
  const cands = P.filter(p => {
    const cn = norm(p.title);
    return (cn.startsWith(n) || n.startsWith(cn)) && Math.abs(cn.length - n.length) <= 10;
  });
  if (cands.length === 1) hit++;
  else miss.push(t + (cands.length > 1 ? ' [AMBIG:' + cands.map(p => p.title).join('/') + ']' : ''));
});
console.log('match:', hit, 'miss:', miss.length);
miss.forEach(m => console.log('MISS:', m));