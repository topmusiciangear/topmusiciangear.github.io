// ¿De donde sale el salto de $905 a $1.284?
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const arr = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const list = Array.isArray(arr) ? arr : arr.products;
const byId = {}; list.forEach(p => byId[p.id] = p);

const src = fs.readFileSync(BASE + 'build-guides.js', 'utf8');
const ini = src.indexOf('const TEST_SHOP_BTN = {');
const bloque = src.slice(ini, src.indexOf('\n};', ini));
function emp(t, i) { let d = 0; for (let j = i; j < t.length; j++) { if (t[j] === '{') d++; else if (t[j] === '}') { d--; if (!d) return j; } } return -1; }
function botones(id) {
  const m = new RegExp('(?:^|\\n)(\\s*)' + id + ':\\s*\\{').exec(bloque);
  if (!m) return {};
  const i0 = m.index + m[1].length;
  const f = emp(bloque, i0 + (m[0].length - m[1].length) - 1);
  const ent = bloque.slice(i0, f + 1);
  const pm = /prices:\s*\{([\s\S]*?)\}/.exec(ent);
  const o = {};
  if (pm) [...pm[1].matchAll(/(\w+):\s*"([^"]+)"/g)].forEach(x => o[x[1]] = x[2]);
  return o;
}

console.log('=== 1) EL INCREMENTO, DESGLOSADO ===\n');
console.log('  El $905 viejo-era:');
console.log('    SSL 2+ MKII      $' + byId[18].price);
console.log('    NT1 Signature    $' + byId[297].price);
console.log('    MDR-7506         $' + byId[26].price);
console.log('    panels            $' + byId[170].price);
console.log('    Rokit 7 G5 x1    $' + byId[20].price + '   <-- SOLO UNO (la fila dice "par")');
console.log('                        ----');
console.log('                        $' + (byId[18].price + byId[297].price + byId[26].price + byId[170].price + byId[20].price));
console.log('\n  Motivos del salto a $1.284:');
const dMicro = byId[3].price - byId[297].price;
const dMonit = byId[20].price;   // de 1 a 2 unidades
console.log('    + Rokit x2 en vez de x1 ...... +$' + dMonit + '   <-- el error de calculo');
console.log('    + NT1 5th Gen en vez del Sig. +$' + dMicro);
console.log('                                  ----');
console.log('                                  +$' + (dMonit + dMicro));
console.log('    $905 + $' + (dMonit + dMicro) + ' = $' + (905 + dMonit + dMicro));

console.log('\n\n=== 2) ¿LA DIFERENCIA ENTRE LOS DOS MICROS ES $60-70? ===\n');
console.log('  Catalogo (el que usa la guia):');
console.log('    NT1 Signature      $' + byId[297].price);
console.log('    NT1 5th Generation $' + byId[3].price + '   diferencia $' + dMicro);
[297, 3].forEach(id => {
  const b = botones(id);
  console.log('\n  id ' + id + ' ' + byId[id].title + ' — botones: ' + JSON.stringify(b));
});
const s1 = botones(297).amazon, s2 = botones(3).amazon;
if (s1 && s2) {
  const n = v => Number(v.replace(/[^0-9.]/g, ''));
  console.log('\n  En Amazon: Signature $' + n(s1) + ' vs 5th Gen $' + n(s2) +
    '  -> diferencia $' + (n(s2) - n(s1)));
}

console.log('\n\n=== 3) ¿LOS TOTALES CUADRAN CON LO QUE VE EL USUARIO AL COMPRAR? ===\n');
const IDS = [[15, 'Scarlett 2i2'], [18, 'SSL 2+ MKII'], [3, 'NT1 5th Gen'], [297, 'NT1 Signature'],
  [609, 'ATH-M20x'], [25, 'ATH-M50x'], [26, 'MDR-7506'], [20, 'Rokit 7 G5'], [58, 'K&M 210/2'], [170, 'Paneles G4M']];
console.log('  producto'.padEnd(24) + 'catalogo   Amazon');
IDS.forEach(([id, n]) => {
  const b = botones(id);
  const cat = '$' + byId[id].price;
  const amz = b.amazon ? '$' + Number(b.amazon.replace(/[^0-9.]/g, '')) : '-';
  console.log('  ' + n.padEnd(24) + cat.padEnd(10) + amz);
});
