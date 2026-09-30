const fs = require('fs');
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const b = fs.readFileSync('build-guides.js', 'utf8');
function getMap(src, name) {
  const h = src.indexOf('const ' + name + ' = ');
  let d = 0, q = null, i = h + ('const ' + name + ' = ').length;
  for (; i < src.length; i++) {
    const c = src[i];
    if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === '{') d++; else if (c === '}') { d--; if (d === 0) break; }
  }
  return eval('(' + src.slice(h + ('const ' + name + ' = ').length, i + 1) + ')');
}
const M = getMap(b, 'TEST_SHOP_BTN');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

console.log('== PSM300 / in-ear en catalogo ==');
const PATS = [/PSM\s*300/i, /SE\s*846/i];
const seen = new Set();
for (const re of PATS) {
  console.log('\n##### ' + re + ' #####');
  const hits = P.filter(p => re.test(p.title) && !seen.has(p.id));
  if (!hits.length) console.log('  NO ENCONTRADO');
  hits.forEach(p => {
    seen.add(p.id);
    console.log('id ' + p.id + ' | ' + p.title + ' | canonico ' + p.price + ' | cat ' + p.category);
    Object.entries(p.stores).forEach(([k, v]) => console.log('    ' + k.padEnd(11) + ': ' + (v || '(vacio)')));
    if (p.excludeStores && p.excludeStores.length) console.log('    exclude     : ' + JSON.stringify(p.excludeStores));
    console.log('    BTN         : ' + JSON.stringify(M[p.id] || null));
    const cards = G.filter(g => (g.featuredProducts || []).map(x => typeof x === 'object' ? (x.id || x.productId) : x).includes(p.id)).map(g => g.id);
    const txt = G.filter(g => re.test(JSON.stringify(g))).map(g => g.id);
    console.log('    cards       : ' + (cards.join(', ') || '(ninguna)') + '  | texto: ' + txt.join(', '));
    console.log('    desc        : ' + String(p.description || '').slice(0, 260).replace(/\s+/g, ' '));
  });
}

// otra entrada de in-ear?
console.log('\n== otros in-ear / monitor de estudio en catalogo ==');
P.filter(p => /in-ear|earpiece|iem/i.test((p.title || '') + ' ' + (p.description || ''))).forEach(p => console.log('  id ' + p.id + ': ' + p.title));
