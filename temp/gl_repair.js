const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'budget-bass-like-expensive');

const ORIG = [
  "Squier Classic Vibe '60s Jazz Bass", 'Sire Marcus Miller V5 4-String Bass', 'Sterling by Music Man StingRay Ray4',
  'Yamaha TRBX304', 'Ibanez SR300E', 'Schecter Stiletto Stealth 4 Bass', 'ESP LTD B-204SM Bass Guitar',
  'Fender Player II Precision Bass', 'Fender Player II Jazz Bass', "Epiphone Thunderbird '64 Bass"
];
const NEW2 = ['Yamaha BB434', 'G&L Tribute L-2000'];
const WANT = ORIG.concat(NEW2);
console.log('columnas antes: ' + g.productTable.columns.length);
g.productTable.columns = WANT.map(t => ({ title: t, title_es: t }));
g.productTable.rows.forEach(r => {
  if (r.values.length !== 12) die('fila con ' + r.values.length + ' valores');
  r.values.forEach(v => { if (!v || !v.value || !v.value_es) die('celda vacia'); });
});
console.log('columnas despues: ' + g.productTable.columns.length + ' | filas: ' + g.productTable.rows.length + ' x ' + g.productTable.rows[0].values.length);

// reordenar veredictos segun tabla
const order = g.productTable.columns.map(c => c.title);
g.verdictProsCons.sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));
const vo = g.verdictProsCons.map(v => v.name);
console.log('veredictos: ' + vo.length);
console.log('coinciden: ' + (JSON.stringify(vo) === JSON.stringify(order)));
if (JSON.stringify(vo) !== JSON.stringify(order)) {
  console.log('tabla: ' + order.join(' | '));
  console.log('verd:  ' + vo.join(' | '));
  die('desalineados');
}
// featured en el mismo orden que la tabla
g.featuredProducts = g.productTable.columns.map(c => {
  const hit = order.indexOf(c.title);
  return null;
}).map((_, i) => null);
const idsByName = { "Squier Classic Vibe '60s Jazz Bass": 157, 'Sire Marcus Miller V5 4-String Bass': 163, 'Sterling by Music Man StingRay Ray4': 161, 'Yamaha TRBX304': 159, 'Ibanez SR300E': 160, 'Schecter Stiletto Stealth 4 Bass': 164, 'ESP LTD B-204SM Bass Guitar': 165, 'Fender Player II Precision Bass': 441, 'Fender Player II Jazz Bass': 442, "Epiphone Thunderbird '64 Bass": 162, 'Yamaha BB434': 467, 'G&L Tribute L-2000': 683 };
g.featuredProducts = order.map(t => idsByName[t]);
console.log('featured: ' + JSON.stringify(g.featuredProducts));

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('\nSTEP_REPAIR OK');