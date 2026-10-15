// ¿Que esta y que NO esta dentro de cada nivel?
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const arr = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const list = Array.isArray(arr) ? arr : arr.products;
const byId = {}; list.forEach(p => byId[p.id] = p);

const NIV = {
  'Nivel 1': [['Interfaz', 15, 1], ['Micrófono', 297, 1], ['Auriculares', 609, 1], ['Soporte', 58, 1], ['Tratamiento', 170, 1], ['Monitores', 633, 2]],
  'Nivel 2': [['Interfaz', 18, 1], ['Micrófono', 3, 1], ['Auriculares', 25, 1], ['Soporte', 58, 1], ['Tratamiento', 170, 1], ['Monitores', 116, 2]],
  'Nivel 3': [['Interfaz', 16, 1], ['Micrófono', 674, 1], ['Auriculares', 26, 1], ['Soporte', 58, 1], ['Tratamiento', 170, 1], ['Monitores', 20, 2]]
};

const OPCIONALES = [
  [39, 'Filtro Antipop Aston Shield GN'],
  [167, 'Cable Mogami Gold XLR']
];

console.log('=== LO QUE SUMA CADA NIVEL ===\n');
const idsUsados = new Set();
Object.entries(NIV).forEach(([n, items]) => {
  let s = 0;
  console.log('■ ' + n);
  items.forEach(([k, id, m]) => { idsUsados.add(id); const c = byId[id].price * m; s += c; console.log('   ' + k.padEnd(12) + byId[id].title.slice(0, 36).padEnd(38) + '$' + c); });
  console.log('   ' + '-'.repeat(58));
  console.log('   ' + 'TOTAL'.padEnd(12) + ' '.repeat(38) + '$' + Math.round(s));
  console.log('');
});

console.log('=== LO QUE NO SUMA (opcionales) ===\n');
OPCIONALES.forEach(([id, n]) => {
  const dentro = idsUsados.has(id);
  console.log('  ' + (dentro ? 'SUMADO   ' : 'NO SUMADO') + '  ' + n.padEnd(36) + '$' + byId[id].price +
    '   ->  ' + (dentro ? 'cuenta en el total' : 'NO esta en ningun nivel, es una mejora opcional'));
});

console.log('\n=== COMPROBACION: el pop filter aparece en algun total? ===\n');
let aparece = 0;
Object.entries(NIV).forEach(([n, items]) => {
  const hay = items.some(([, id]) => id === 39);
  if (hay) aparece++;
  console.log('  ' + n.padEnd(10) + ' id 39 (pop filter) en la lista: ' + (hay ? 'SI' : 'NO'));
});
console.log('\n  niveles con el pop filter summationado: ' + aparece + ' de 3');

// donde aparece el pop filter en la guia
const g = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const guia = g.find(x => x.id === 'starter-studio');
console.log('\n=== DONDE VIVE EL POP FILTER EN LA GUIA ===\n');
guia.sections.forEach((s, i) => {
  if ((s.products || []).includes(39)) {
    console.log('  seccion[' + i + '] "' + (s.heading_es || s.heading) + '"');
    const txt = (s.content_es || '');
    const i2 = txt.indexOf('filtro antipop');
    if (i2 > -1) console.log('     ...' + txt.slice(Math.max(0, i2 - 90), i2 + 90) + '...');
  }
});
console.log('\n  -> esta en la seccion "Donde gastar tus ultimos $X", que es la de mejoras opcionales.');
