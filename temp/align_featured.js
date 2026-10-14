const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const P = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const byId = {}; arr.forEach(p => byId[p.id] = p);

let changed = [], skipped = [];
guides.forEach(g => {
  const feat = [].concat(g.featuredProducts || []);
  if (!feat.length) return;
  const solo = (g.sections || []).filter(s => Array.isArray(s.products) && s.products.length === 1).map(s => s.products[0]);
  if (!solo.length) { skipped.push(g.id + ' (sin reviews individuales)'); return; }
  // featured = reviews, y ademas los destacados que ya tenian review
  const set = solo.slice();
  feat.forEach(id => { if (set.includes(id) && !set.includes(id)) set.push(id); });
  const missingCat = set.filter(id => !byId[id]);
  if (missingCat.length) die(g.id + ': ids sin catalogo ' + missingCat.join(','));
  if (set.length === feat.length && set.every((v, i) => v === feat[i])) return;
  // conservar el orden de la tabla si existe
  let order = null;
  if (g.productTable) {
    const names = g.productTable.columns.map(c => c.title);
    order = set.map(id => ({ id, name: byId[id].title }))
      .sort((a, b) => {
        const ia = names.findIndex(n => n === a.name || n.indexOf(a.name) > -1 || a.name.indexOf(n) > -1);
        const ib = names.findIndex(n => n === b.name || n.indexOf(b.name) > -1 || b.name.indexOf(n) > -1);
        return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
      }).map(x => x.id);
  }
  g.featuredProducts = order || set;
  changed.push(g.id + ': ' + feat.length + ' -> ' + g.featuredProducts.length);
});
fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('guias ajustadas: ' + changed.length);
changed.forEach(c => console.log('  ' + c));
console.log('\nskip (sin reviews individuales): ' + skipped.length);
skipped.forEach(c => console.log('  ' + c));