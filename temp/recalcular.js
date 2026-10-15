// Recalcular los totales con mapeo EXPLICITO por fila y columna
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const F = BASE + 'data/guides.json';
const arr = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const list = Array.isArray(arr) ? arr : arr.products;
const byId = {}; list.forEach(p => byId[p.id] = p);

const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const guia = g.find(x => x.id === 'starter-studio');
const t = guia.productTable;

// celda -> [id, multiplicador]
const MAPA = [
  ['Interfaz', [
    ['Focusrite Scarlett 2i2 4th Gen', 15, 1],
    ['SSL 2+ MKII', 18, 1]
  ]],
  ['Micrófono', [
    ['Rode NT1 Signature (condensador)', 297, 1],
    ['Rode NT1 5th Generation (condensador)', 3, 1]
  ]],
  ['Auriculares', [
    ['Audio-Technica ATH-M20x', 609, 1],
    ['Audio-Technica ATH-M50x', 25, 1],
    ['Sony MDR-7506', 26, 1]
  ]],
  ['Monitores', [
    ['KRK Rokit 7 G5 (par)', 20, 2]
  ]],
  ['Accesorios', [
    ['Soporte K&M 210/2', 58, 1]
    // "Filtro antipop recomendado" = recomendacion, no compra: 0
  ]],
  ['Tratamiento acústico', [
    ['Paneles G4M Squarewave (4-pack)', 170, 1]
  ]]
];

console.log('=== RECALCULO (EN/ES a la vez) ===\n');
const filaT = t.rows.find(r => r.label === 'Total');
const nuevos = [];

for (let c = 0; c < t.columns.length; c++) {
  let suma = 0; const detalle = []; const sinP = [];
  MAPA.forEach(([label, opciones]) => {
    const fila = t.rows.find(r => (r.label_es || r.label) === label);
    if (!fila) return;
    const txtES = fila.values[c].value_es || '';
    const txtEN = fila.values[c].value || '';
    const hit = opciones.find(([nombre]) => txtES === nombre || txtEN === nombre);
    if (hit) {
      const v = byId[hit[1]].price * hit[2];
      suma += v;
      detalle.push(label + ': $' + v);
    } else if (!/^Solo auriculares/i.test(txtES) && !/recomendado/i.test(txtES) && !/What This Build/i.test(fila.label)) {
      sinP.push(label + ' = "' + txtES + '"');
    }
  });
  const antes = filaT.values[c].value;
  nuevos.push(suma);
  console.log('■ ' + t.columns[c].title_es);
  detalle.forEach(d => console.log('    ' + d));
  console.log('    ' + '-'.repeat(30));
  console.log('    suma        $' + suma + '    |  la tabla decia ' + antes +
    (String(antes).replace(/[^0-9]/g, '') === String(suma) ? '  (ok)' : '  <<<'));
  if (sinP.length) console.log('    SIN CONTAR: ' + sinP.join(' | '));
  console.log('');
}

filaT.rows = null;
nuevos.forEach((v, c) => {
  filaT.values[c].value = '~$' + v;
  filaT.values[c].value_es = '~$' + v;
});

fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('=== CONTROL ===');
console.log('  Basico     esperado $545  -> $' + nuevos[0] + (nuevos[0] === 545 ? '  OK' : '  DESVIA'));
console.log('  Profesional esperado $816 -> $' + nuevos[1] + (nuevos[1] === 816 ? '  OK' : '  DESVIA'));
console.log('  Definitivo -> $' + nuevos[2]);
console.log('  por debajo de $1.000: ' + nuevos.filter(v => v < 1000).length + ' de 3');
