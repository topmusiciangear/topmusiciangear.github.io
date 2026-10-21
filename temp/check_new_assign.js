const fs = require('fs');
const raw = fs.readFileSync('data/products.json', 'utf8');
const prods = JSON.parse(raw);

// verificacion de asignaciones
for (const id of [468, 648, 650]) {
  const p = prods.find(x => x.id === id);
  console.log('id ' + id + ' -> ' + p.img + '  existe:' + fs.existsSync(p.img));
}

// que ninguna ruta repetida se haya aplicado a varios productos
const imgs = {};
for (const p of prods) imgs[p.img] = (imgs[p.img] || 0) + 1;
const dup = Object.entries(imgs).filter(([k, n]) => n > 1);
console.log('fotos compartidas por varios productos: ' + dup.length);
dup.slice(0, 5).forEach(([k, n]) => console.log('   ' + k + ' x' + n));

// viejas rutas deben haber quedado sin uso (salvo guias/ofertas)
for (const k of ['59e1c43c7e.webp', '9cbc7cb3fe.webp', '603d3f77a9.webp']) {
  const n = (raw.match(new RegExp(k, 'g')) || []).length;
  console.log('products.json refs a ' + k + ': ' + n);
}
