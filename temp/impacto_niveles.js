// Impacto de la nueva estructura de 3 niveles
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const arr = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const list = Array.isArray(arr) ? arr : arr.products;
const byId = {}; list.forEach(p => byId[p.id] = p);

const NIVELES = {
  'Nivel 1 · Esencial': [['Interfaz', 15], ['Micro', 297], ['Auri', 609], ['Soporte', 58], ['Paneles', 170]],
  'Nivel 2 · Productor Pro': [['Interfaz', 18], ['Micro', 297], ['Auri', 25], ['Monitores', [633, 2]], ['Soporte', 58], ['Paneles', 170]],
  'Nivel 3 · Definitivo': [['Interfaz', 18], ['Micro', 3], ['Auri', 26], ['Monitores', [20, 2]], ['Soporte', 58], ['Paneles', 170]]
};

console.log('=== LOS TRES NIVELES CON LA ESTRUCTURA NUEVA ===\n');
const totales = {};
Object.entries(NIVELES).forEach(([n, items]) => {
  let s = 0;
  console.log('■ ' + n);
  items.forEach(([k, v]) => {
    const id = Array.isArray(v) ? v[0] : v;
    const mult = Array.isArray(v) ? v[1] : 1;
    const coste = byId[id].price * mult;
    s += coste;
    console.log('   ' + k.padEnd(12) + (byId[id].title.slice(0, 30).padEnd(32)) + (mult > 1 ? 'x' + mult + '  ' : '    ') + '$' + coste);
  });
  console.log('   ' + '-'.repeat(56));
  console.log('   TOTAL'.padEnd(12) + ' '.repeat(34) + '$' + s);
  totales[n] = s;
  console.log('');
});

console.log('=== COMPARACION CON LA ESTRUCTURE ACTUAL ===\n');
const actual = { 'Nivel 1': 605, 'Nivel 2': 925, 'Nivel 3': 1393 };
const nuevo = [604.99, 1212.99, 1392.99];
console.log('              actual    nuevo    diferencia');
['Nivel 1', 'Nivel 2', 'Nivel 3'].forEach((n, i) => {
  const d = Math.round(nuevo[i] - actual[n]);
  console.log('  ' + n.padEnd(12) + ('$' + actual[n]).padStart(8) + ('$' + nuevo[i]).padStart(9) +
    ((d > 0 ? '  +$' + d : d < 0 ? '  -$' + Math.abs(d) : '   =') ).padStart(12));
});

const saltoAntes = actual['Nivel 2'] - actual['Nivel 1'];
const saltoAhora = nuevo[1] - nuevo[0];
console.log('\n  salto del Nivel 1 al 2:');
console.log('    antes : +$' + saltoAntes + '  (' + Math.round(saltoAntes / actual['Nivel 1'] * 100) + '% sobre el nivel 1)');
console.log('    ahora : +$' + Math.round(saltoAhora) + '  (' + Math.round(saltoAhora / nuevo[0] * 100) + '% sobre el nivel 1)');

console.log('\n=== el par de Rokit 5 G5 ===');
console.log('  precio unitario catalogo: $' + byId[633].price + '   x2 = $' + byId[633].price * 2);
console.log('  precio del par en Gear4Music: £279.99 (pagina de producto)');
console.log('  precio unitario Amazon: $199.00 | zZounds $199.00 | Music Store €195.00 | G4M £141.00');
