const P = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');
const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
function norm(s) {
  return (s || '').toLowerCase()
    .replace(/generation/g, 'gen').replace(/microphone/g, 'mic').replace(/series/g, '')
    .replace(/[^a-z0-9]/g, '');
}
const byNorm = {};
P.forEach(p => { byNorm[norm(p.title)] = p.id; });
function mapId(t) {
  const n = norm(t);
  if (byNorm[n]) return byNorm[n];
  let c = P.filter(p => norm(p.title).startsWith(n) || n.startsWith(norm(p.title)));
  if (c.length === 1) return c[0].id;
  if (n.length >= 4) {
    c = P.filter(p => norm(p.title).includes(n) || n.includes(norm(p.title)));
    if (c.length === 1) return c[0].id;
  }
  return null;
}
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
  if (mapId(t)) hit++; else miss.push(t);
});
console.log('match:', hit, 'miss:', miss.length);
miss.forEach(m => console.log('MISS:', m));