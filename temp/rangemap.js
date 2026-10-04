const fs = require('fs');
const src = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
const bs = src.indexOf('{', src.indexOf('TEST_SHOP_BTN'));
let d = 0, q = null, i = bs;
for (; i < src.length; i++) {
  const c = src[i];
  if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') d++;
  else if (c === '}') { d--; if (d === 0) break; }
}
const BTN = eval('(' + src.slice(bs, i + 1) + ')');
const P = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');
const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
function norm(s) { return (s || '').toLowerCase().replace(/[^a-z0-9]/g, ''); }
const byNorm = {};
P.forEach(p => { byNorm[norm(p.title)] = p.id; });
// collect all table column titles
const cols = new Set();
G.forEach(g => {
  if (g.productTable) g.productTable.columns.forEach(c => cols.add(c.title));
  if (g.comparison && g.featuredSnippet) {
    if (g.featuredSnippet.name1_en) cols.add(g.featuredSnippet.name1_en);
    if (g.featuredSnippet.name2_en) cols.add(g.featuredSnippet.name2_en);
  }
});
let hit = 0, miss = [];
cols.forEach(t => {
  // skip spec pseudo-columns
  if (/^(Price|Connectivity|Key Specs|Type|Best For)$/i.test(t)) return;
  if (byNorm[norm(t)]) hit++;
  else miss.push(t);
});
console.log('columnas producto:', cols.size, 'match:', hit, 'miss:', miss.length);
console.log('MISS:', miss.slice(0, 30).join(' | '));