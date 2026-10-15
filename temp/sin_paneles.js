// Que pasa si se quitan los paneles acusticos de la guia
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const arr = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const list = Array.isArray(arr) ? arr : arr.products;
const byId = {}; list.forEach(p => byId[p.id] = p);
const g = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
const guia = g.find(x => x.id === 'starter-studio');

const CON_PANELES = {
  'Nivel 1': [[15, 1], [297, 1], [609, 1], [58, 1], [170, 1], [633, 2]],
  'Nivel 2': [[18, 1], [297, 1], [25, 1], [58, 1], [116, 2], [170, 1]],
  'Nivel 3': [[18, 1], [3, 1], [26, 1], [58, 1], [20, 2], [170, 1]]
};
const SIN_PANELES = {};
Object.entries(CON_PANELES).forEach(([k, v]) => {
  SIN_PANELES[k] = v.filter(([id]) => id !== 170);
});

function total(items) {
  return items.reduce((s, [id, m]) => s + byId[id].price * m, 0);
}

console.log('=== LOS TRES NIVELES: con paneles vs sin paneles ===\n');
console.log('  Nivel        con paneles    sin paneles    la tabla dice');
const DICHO = { 'Nivel 1': 690, 'Nivel 2': 850, 'Nivel 3': 1290 };
Object.keys(CON_PANELES).forEach(k => {
  const c = total(CON_PANELES[k]);
  const s = total(SIN_PANELES[k]);
  const d = DICHO[k];
  console.log('  ' + k.padEnd(13) + ('$' + c.toFixed(0)).padStart(10) + ('$' + s.toFixed(0)).padStart(14) + ('$' + d).padStart(14) +
    (s <= d ? '   <- llega' : '   <- sigue ' + (s - d > 0 ? '+' : '') + '$' + (s - d) + ' por encima'));
});

console.log('\n\n=== QUE MAS HABRIA QUE QUITAR DEL NIVEL 1 para llegar a $690 ===\n');
const base = [[15, 'Scarlett 2i2'], [297, 'NT1 Signature'], [609, 'ATH-M20x'], [58, 'K&M 210/2'], [633, 'KRK Rokit 5 x2']];
let s = base.reduce((a, [id]) => a + byId[id].price, 0);
base.forEach(([id, n]) => console.log('  ' + n.padEnd(16) + '$' + byId[id].price));
console.log('  ' + '-'.repeat(24));
console.log('  ' + 'SIN NADA MAS'.padEnd(18) + '$' + s + '   <- el suelo, y aun falta la mitad de $690');

console.log('\n  El par de Rokit 5 solo son $' + byId[633].price * 2 +
  '. Una Scarlett 2i2 son $' + byId[15].price +
  '. Un NT1 Signature $' + byId[297].price +
  '. Con eso ya son $' + (byId[633].price * 2 + byId[15].price + byId[297].price) + '.');
console.log('  Para llegar a $690 habria que cambiar la interfaz o el microfono por otros mas baratos.');

// ── que se pierde ──
console.log('\n\n=== QUE SE PIERDE QUITANDO LOS PANELES (id 170) ===\n');
console.log('  producto: ' + byId[170].title + '  ($' + byId[170].price + ')');
console.log('\n  Contenido que desaparece de la guia:');
console.log('    - la tarjeta de producto y su reseña');
console.log('    - el veredicto (4 pros + 4 contras, EN y ES)');
console.log('    - 2 secciones: "Trata la sala antes de mejorar nada" y');
console.log('      "Cuatro paneles y la sala deja de mentirte"');
console.log('    - el veredicto global y el cierre apuntan a los paneles');
guia.sections.forEach((s2, i) => {
  if ((s2.products || []).includes(170)) console.log('      · seccion[' + i + '] "' + (s2.heading_es || s2.heading) + '"');
});

const txt = JSON.stringify(guia);
const menciones = (txt.match(/panel|Panel/gi) || []).length;
console.log('\n  Menciones de "panel" en el texto de la guia: ' + menciones);
console.log('  (la tesis de la guia es literalmente "trata la sala antes de mejorar nada")');
