// Par de TODOS los monitores, RESPETANDO el campo unit (each = x2, pair = ya es el par)
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const s = fs.readFileSync(B + 'build-guides.js', 'utf8');
const ini = s.indexOf('const TEST_SHOP_BTN = {');
const mapa = new Function('return ' + s.slice(ini + 'const TEST_SHOP_BTN = '.length, s.indexOf('\n};', ini) + 2))();

function dato(id) {
  const x = p.find(y => y.id === id);
  const cfg = mapa[id];
  const amz = cfg && cfg.prices && cfg.prices.amazon;
  return {
    t: x.title, u: x.unit || 'each', de: amz ? 'Amazon' : 'catalogo',
    n: amz ? parseFloat(String(amz).replace(/[^0-9.]/g, '')) : x.price
  };
}
const parDe = d => d.u === 'pair' ? d.n : d.n * 2;

const mons = p.filter(x => x.category === 'monitors')
  .map(x => ({ id: x.id, ...dato(x.id) }))
  .sort((a, b) => parDe(a) - parDe(b));

console.log('=== PARES DE TODOS LOS MONITORES (' + mons.length + ') ===\n');
console.log('  ' + 'id'.padEnd(6) + 'monitor'.padEnd(33) + 'se vende'.padEnd(11) + 'unidad'.padStart(10) + '   PAR');
console.log('  ' + '-'.repeat(92));

mons.forEach(f => {
  const marca = f.u === 'pair' ? '  (ya es par)' : '';
  console.log('  ' + String(f.id).padEnd(6) + f.t.slice(0, 31).padEnd(33) + f.u.padEnd(11) +
    ('$' + f.n.toFixed(2)).padStart(10) + '   $' + parDe(f).toFixed(2).padStart(8) + '  ' + f.de + marca);
});

const pares = mons.filter(f => f.u === 'pair');
console.log('\n  ' + pares.length + ' productos se venden YA en par (no se multiplican):');
pares.forEach(f => console.log('     ' + String(f.id).padStart(4) + '  ' + f.t + '  -> $' + parDe(f).toFixed(2)));

console.log('\n=== los tres niveles de starter-studio ===');
[[1, 684], [2, 20], [3, 19]].forEach(([n, id]) => {
  const d = dato(id);
  console.log('  Nivel ' + n + ': ' + d.t.padEnd(26) + '$' + d.n.toFixed(2) + ' (' + d.u + ') -> PAR $' + parDe(d).toFixed(2));
});

const orden = [parDe(dato(684)), parDe(dato(20)), parDe(dato(19))];
console.log('\n  escalera: ' + orden.map(v => '$' + v.toFixed(2)).join('  <  '));
console.log('  monotona creciente: ' + (orden[0] < orden[1] && orden[1] < orden[2] ? 'SI' : 'NO'));
console.log('\n  el mas barato de TODO el catalogo: ' + mons[0].t + ' ($' + parDe(mons[0]).toFixed(2) + ')');
const posEris = mons.findIndex(m => m.id === 684);
console.log('  el Eris Studio 5 ocupa el puesto ' + (posEris + 1) + ' de ' + mons.length + ' por precio de par');
