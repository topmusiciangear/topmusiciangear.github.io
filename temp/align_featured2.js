const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const P = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const byId = {}; arr.forEach(p => byId[p.id] = p);

const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]/g, '');
const findId = (title) => {
  const n = norm(title);
  let best = null, bestLen = 0;
  arr.forEach(p => {
    const pn = norm(p.title);
    if (pn === n) { if (pn.length > bestLen) { best = p.id; bestLen = pn.length; } return; }
    if (pn.length > 6 && n.includes(pn)) { if (pn.length > bestLen) { best = p.id; bestLen = pn.length; } return; }
    if (n.length > 6 && pn.includes(n) && n.length > bestLen) { best = p.id; bestLen = n.length; }
  });
  return best;
};

let changed = [], noTabla = [];
guides.forEach(g => {
  const feat = [].concat(g.featuredProducts || []);
  if (!feat.length) return;
  if (!g.productTable) { noTabla.push(g.id + ' (' + feat.length + ')'); return; }
  const solo = (g.sections || []).filter(s => Array.isArray(s.products) && s.products.length === 1).map(s => s.products[0]);
  const vp = (g.verdictProsCons || []).map(v => v.name);
  const fromCols = [];
  const unresolved = [];
  g.productTable.columns.forEach(c => {
    const t = c.title || '';
    let id = byId[t] ? t : null;
    if (!id) {
      // buscar por coincidencia con un id ya destacado
      const m = feat.find(f => byId[f] && norm(byId[f].title) === norm(t));
      id = m || null;
    }
    if (!id) {
      // buscar por nombre de veredicto
      const hit = vp.find(n => norm(n) === norm(t) || norm(n).indexOf(norm(t)) === 0);
      if (hit) { const pid = arr.find(p => p.title === hit); if (pid) id = pid.id; }
    }
    if (!id) { const guessed = findId(t); if (guessed) id = guessed; }
    if (id) fromCols.push(id); else unresolved.push(t);
  });
  if (unresolved.length) console.log('  [?' + g.id + '] sin resolver: ' + unresolved.join(' / '));
  // conservar destacados que no estan en la tabla pero si tienen review
  solo.forEach(id => { if (fromCols.indexOf(id) === -1) fromCols.push(id); });
  const uniq = fromCols.filter((v, i) => fromCols.indexOf(v) === i);
  if (JSON.stringify(uniq) === JSON.stringify(feat)) return;
  g.featuredProducts = uniq;
  changed.push(g.id + ': ' + feat.length + ' -> ' + uniq.length);
});
fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('\najustadas: ' + changed.length);
changed.forEach(c => console.log('  ' + c));
console.log('\nsin productTable (featured intacto): ' + noTabla.length);