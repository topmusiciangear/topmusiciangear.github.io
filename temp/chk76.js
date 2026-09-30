const fs = require('fs');
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const b = fs.readFileSync('build-guides.js', 'utf8');
const h = b.indexOf('const TEST_SHOP_BTN = ');
let d = 0, q = null, i = h + ('const TEST_SHOP_BTN = ').length;
for (; i < b.length; i++) {
  const c = b[i];
  if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
  if (c === '"' || c === "'" || c === '`') { q = c; continue; }
  if (c === '{') d++; else if (c === '}') { d--; if (d === 0) break; }
}
const M = eval('(' + b.slice(h + ('const TEST_SHOP_BTN = ').length, i + 1) + ')');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

const p = P.find(x => x.id === 349);
if (!p) { console.log('id 349 NO EXISTE'); process.exit(0); }
console.log('id 349 | ' + p.title + ' | canonico ' + p.price + ' | cat ' + p.category);
Object.entries(p.stores).forEach(([k, v]) => console.log('    ' + k.padEnd(11) + ': ' + (v || '(vacio)')));
if (p.excludeStores && p.excludeStores.length) console.log('    exclude     : ' + JSON.stringify(p.excludeStores));
console.log('    BTN         : ' + JSON.stringify(M[349] || null));
const cards = G.filter(g => (g.featuredProducts || []).map(x => typeof x === 'object' ? (x.id || x.productId) : x).includes(349)).map(g => g.id);
const txt = G.filter(g => /EW IEM G4 Stereo|EW IEM G4 Stereo Wireless/i.test(JSON.stringify(g))).map(g => g.id);
console.log('    cards       : ' + (cards.join(', ') || '(ninguna)') + '  | texto: ' + txt.join(', '));
console.log('    desc        : ' + String(p.description || '').slice(0, 200).replace(/\s+/g, ' '));

//(vecinos para no duplicar producto)
console.log('\n== vecinos Sennheiser IEM ==');
P.filter(x => /IEM/i.test(x.title)).forEach(x => console.log('  id ' + x.id + ': ' + x.title + ' | canonico ' + x.price));
