// Radio de impacto de corregir el precio del K&M 210/2 (id 58)
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

const arr = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const list = Array.isArray(arr) ? arr : arr.products;
const p = list.find(x => x.id === 58);
console.log('=== products.json id 58 ===');
console.log('  ' + p.title);
console.log('  price actual: $' + p.price);

// donde se cita el K&M con un precio
console.log('\n=== CITAS DEL K&M CON PRECIO EN guides.json ===');
const g = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
let n = 0;
g.forEach(x => {
  const json = JSON.stringify(x);
  if (!/K&M|210\/2/i.test(json)) return;
  const citas = [...json.matchAll(/.{90}K&M.{0,140}/g)]
    .map(m => m[0])
    .filter(c => /\$|£|€/.test(c));
  if (!citas.length) return;
  console.log('\n  --- ' + x.id + ' ---');
  citas.slice(0, 4).forEach(c => { n++; console.log('      ...' + c.replace(/\s+/g, ' ') + '...'); });
});
console.log('\n  total de citas con precio: ' + n);

// otras guias que lo tienen en tabla/veredicto
console.log('\n=== EN QUE GUIAS APARECE ===');
const enGuias = [];
g.forEach(x => {
  const tiene = (x.sections || []).some(s => (s.products || []).includes(58)) ||
    (x.verdictProsCons || []).some(v => v.productId === 58);
  if (tiene) enGuias.push(x.id);
});
console.log('  ' + enGuias.length + ' guias: ' + enGuias.join(', '));
