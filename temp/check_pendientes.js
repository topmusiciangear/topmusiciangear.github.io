const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

console.log('=== 1) PRODUCTOS CON price 0 o nulo ===');
products.forEach(p => {
  if (p.price === 0 || p.price === null || p.price === undefined) {
    console.log('  id=' + p.id + '  "' + p.title + '"  price=' + p.price + '  rating=' + p.rating);
  }
});

console.log('\n=== 2) GUIAS QUE CITAN PRODUCTOS INEXISTENTES ===');
const norm = s => (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
const resolve = (n) => {
  if (!n) return null;
  const e = products.find(p => p.title === n || p.title_es === n);
  if (e) return e;
  const k = norm(n);
  const c = products.filter(p => norm(p.title).includes(k) || norm(p.title_es || '').includes(k));
  if (c.length === 1) return c[0];
  return null;
};

['midi-controllers', 'best-guitar-home-office'].forEach(id => {
  const g = guides.find(x => x.id === id);
  console.log('\n  --- ' + id + ' ---');
  // nombres citados en veredicto/conclusion que no son tabla
  const tabla = new Set((g.productTable ? g.productTable.columns : []).map(c => c.title_es || c.title));
  const texto = (g.verdict || '') + ' ' + (g.conclusion || '');
  ['Behringer X-Touch', 'Avid S1', 'Mackie MCU Pro', 'Headless Experience NX',
   'ELX200-18SP', 'SUB 8004-AS', 'PRX918XLF', 'DXS18XLF'].forEach(n => {
    if (texto.includes(n)) {
      const r = resolve(n);
      console.log('     cita "' + n + '" -> ' + (r ? 'EN CATALOGO (id ' + r.id + ')' : 'NO EXISTE') +
        ' | en tabla: ' + (tabla.has(n) ? 'si' : 'no'));
    }
  });
});
