const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'best-headphones-for-mixing');

console.log('Secciones actuales (' + g.sections.length + '):');
g.sections.forEach((s, i) => console.log('  [' + i + '] ' + s.heading + (s.products ? '  (products: ' + s.products.join(',') + ')' : '')));

// Los duplicados son las 4 ultimas (estilo antiguo con "Buy at Amazon"):
// DT 770 Pro, DT 990 Pro, ATH-M50x, HD 490 Pro Plus.
// Cada uno ya tiene su seccion nueva (1-4). Eliminar las ultimas 4.
const aBorrar = g.sections.slice(-4);
console.log('\nSecciones a eliminar:');
aBorrar.forEach(s => console.log('  - ' + s.heading));

// Confirmar que cada una duplica un producto que ya tiene seccion propia
const productosConSeccion = new Set();
g.sections.slice(0, -4).forEach(s => (s.products || []).forEach(p => productosConSeccion.add(p)));
let ok = true;
aBorrar.forEach(s => (s.products || []).forEach(p => {
  if (!productosConSeccion.has(p)) { ok = false; console.log('  AVISO: producto sin seccion propia: ' + p); }
}));
console.log('\nTodas duplican productos ya cubiertos: ' + ok);

g.sections = g.sections.slice(0, -4);
console.log('\nSecciones finales (' + g.sections.length + '):');
g.sections.forEach((s, i) => console.log('  [' + i + '] ' + s.heading));

fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('\nEscrito.');
