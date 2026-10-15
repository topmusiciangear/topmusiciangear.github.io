const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'starter-studio');
const p = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

console.log('=== LOS 16 VEREDICTOS · EN y ES ===\n');
s.verdictProsCons.forEach((v, i) => {
  console.log('-'.repeat(96));
  console.log('[' + i + '] ' + v.name + '   |   ' + v.name_es +
    '   (' + v.pros.length + ' pros / ' + v.cons.length + ' cons / ' + v.pros_es.length + '+' + v.cons_es.length + ' ES)');
  console.log('-'.repeat(96));
  v.pros.forEach((x, j) => console.log('  P' + (j + 1) + ' EN: ' + x));
  console.log('');
  v.pros_es.forEach((x, j) => console.log('  P' + (j + 1) + ' ES: ' + x));
  console.log('');
  v.cons.forEach((x, j) => console.log('  C' + (j + 1) + ' EN: ' + x));
  console.log('');
  v.cons_es.forEach((x, j) => console.log('  C' + (j + 1) + ' ES: ' + x));
  console.log('');
});

console.log('\n\n=== CHEQUEOS MECANICOS ===');
let problemas = 0;
s.verdictProsCons.forEach((v, i) => {
  const errs = [];
  if (v.pros.length !== v.cons.length) errs.push('pros != cons EN');
  if (v.pros.length < 4 || v.cons.length < 4) errs.push('menos de 4');
  if (v.pros_es.length !== v.pros.length) errs.push('pros EN != pros ES');
  if (v.cons_es.length !== v.cons.length) errs.push('cons EN != cons ES');
  if (v.name !== v.name_es) errs.push('name != name_es');
  // el producto sigue en la guia?
  const prod = p.find(y => y.title === v.name);
  if (prod && !s.featuredProducts.includes(prod.id)) errs.push('producto (' + prod.id + ') NO esta en featuredProducts');
  if (!prod) errs.push('no encuentro el producto en el catalogo por nombre');
  // el producto tiene seccion?
  if (prod && !s.sections.some(sec => (sec.products || []).includes(prod.id))) errs.push('producto sin seccion');
  if (errs.length) { problemas++; console.log('  [' + i + '] ' + v.name + '  -> ' + errs.join(' | ')); }
});
console.log('\n  veredictos con problemas mecanicos: ' + problemas);
console.log('  featuredProducts: ' + s.featuredProducts.length + '   veredictos: ' + s.verdictProsCons.length +
  '   ids en featured sin veredicto: ' +
  s.featuredProducts.filter(id => !s.verdictProsCons.some(v => (p.find(y => y.id === id) || {}).title === v.name)).map(id => id).join(', '));
