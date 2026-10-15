const fs = require('fs');
const path = require('path');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
// buscar referencias al id 12 FUERA de products.json (que es donde esta el producto)
const ficheros = [];
(function w(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name === '.git' || e.name === 'temp') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) w(p);
    else if (/\.(json|js|html|md)$/.test(e.name)) ficheros.push(p);
  }
})(BASE);
console.log('ficheros revisados: ' + ficheros.length);
const aviso = [];
for (const f of ficheros) {
  if (f.endsWith('data/products.json')) continue;
  if (f.endsWith('guides/' + path.basename(f))) continue;
  let s;
  try { s = fs.readFileSync(f, 'utf8'); } catch (e) { continue; }
  // buscar "id":12 o id 12 como numero en arrays de productos
  const patrones = [/"id"\s*:\s*12[,}\s]/, /\b12\s*:\s*\{/, /openReviewModal\(12\)/, /\b639\b/g];
  const hits = [];
  if (/["']?id["']?\s*[:=]\s*["']?12\b/.test(s)) hits.push('id:12');
  if (/\b12\s*:\s*\{\s*\n?\s*prices/.test(s)) hits.push('12:{prices');
  if (/openReviewModal\(12\)/.test(s)) hits.push('openReviewModal(12)');
  if (/\["id"\s*==\s*12\]/.test(s)) hits.push('id==12');
  if (hits.length) aviso.push(path.relative(BASE, f) + '  ->  ' + hits.join(', '));
}
console.log('\nreferencias al id 12 fuera de products.json: ' + aviso.length);
aviso.forEach(a => console.log('  ' + a));

// y en los JSON de datos
['data/deals.json','data/price-history.json','data/manual-deals.json'].forEach(rel => {
  const p = BASE + rel;
  if (!fs.existsSync(p)) return;
  let j; try { j = JSON.parse(fs.readFileSync(p, 'utf8')); } catch (e) { console.log('  ' + rel + ': no parsea'); return; }
  const txt = JSON.stringify(j);
  const m = (txt.match(/"id"\s*:\s*12[,}]/g) || []).length;
  const m639 = (txt.match(/"id"\s*:\s*639[,}]/g) || []).length;
  console.log('  ' + rel + ': id 12 -> ' + m + ' | id 639 -> ' + m639);
});