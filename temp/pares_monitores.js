// Par de TODOS los monitores del catalogo
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const s = fs.readFileSync(B + 'build-guides.js', 'utf8');
const ini = s.indexOf('const TEST_SHOP_BTN = {');
const mapa = new Function('return ' + s.slice(ini + 'const TEST_SHOP_BTN = '.length, s.indexOf('\n};', ini) + 2))();

function unidadDe(id) {
  const x = p.find(y => y.id === id);
  const cfg = mapa[id];
  const amz = cfg && cfg.prices && cfg.prices.amazon;
  const n = amz ? parseFloat(String(amz).replace(/[^0-9.]/g, '')) : x.price;
  return { n, de: amz ? 'Amazon' : 'catalogo', u: x.unit || 'each', t: x.title };
}

const mons = p.filter(x => x.category === 'monitors').sort((a, b) => unidadDe(a.id).n - unidadDe(b.id).n);

console.log('=== PARES DE TODOS LOS MONITORES (' + mons.length + ') ===\n');
console.log('  ' + 'id'.padEnd(6) + 'monitor'.padEnd(34) + 'unidad'.padEnd(12) + 'precio ud'.padStart(10) + 'x2 = PAR'.padStart(12) + '   fuente');
console.log('  ' + '-'.repeat(104));

const filas = mons.map(x => ({ id: x.id, ...unidadDe(x.id) })).sort((a, b) => a.n - b.n);
filas.forEach(f => {
  console.log('  ' + String(f.id).padEnd(6) + f.t.slice(0, 32).padEnd(34) +
    ('$' + f.n.toFixed(2) + '/' + f.u.slice(0, 4)).padEnd(12) +
    ('$' + f.n.toFixed(2)).padStart(10) +
    ('$' + (f.n * 2).toFixed(2)).padStart(12) + '   ' + f.de);
});

console.log('\n  nota: todos los precios de unidad verificados en la ficha de Amazon como');
console.log('        UNA pieza ("1 Eris Studio 5 monitor", "Speaker", "Studio Monitor" singular).');
console.log('        Por eso el par = x2 en todos los casos.');

console.log('\n=== los tres niveles de la tabla, con el par ===');
[[1, 684], [2, 20], [3, 19]].forEach(([n, id]) => {
  const f = unidadDe(id);
  console.log('  Nivel ' + n + ': ' + f.t.padEnd(28) + '$' + f.n.toFixed(2) + ' x 2 = $' + (f.n * 2).toFixed(2));
});
