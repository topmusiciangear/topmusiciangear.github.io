// Precios reales (botones) de los productos de los tres montajes
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const arr = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const list = Array.isArray(arr) ? arr : arr.products;
const byId = {}; list.forEach(p => byId[p.id] = p);

const src = fs.readFileSync(BASE + 'build-guides.js', 'utf8');
const ini = src.indexOf('const TEST_SHOP_BTN = {');
const bloque = src.slice(ini, src.indexOf('\n};', ini));
function emp(t, i) { let d = 0; for (let j = i; j < t.length; j++) { if (t[j] === '{') d++; else if (t[j] === '}') { d--; if (!d) return j; } } return -1; }
function cfg(id) {
  const m = new RegExp('(?:^|\\n)(\\s*)' + id + ':\\s*\\{').exec(bloque);
  if (!m) return null;
  const i0 = m.index + m[1].length;
  const f = emp(bloque, i0 + (m[0].length - m[1].length) - 1);
  return bloque.slice(i0, f + 1);
}
function precios(id) {
  const e = cfg(id); if (!e) return {};
  const pm = /prices:\s*\{([\s\S]*?)\}/.exec(e);
  const o = {};
  if (pm) [...pm[1].matchAll(/(\w+):\s*"([^"]+)"/g)].forEach(x => o[x[1]] = Number(x[2].replace(/[^0-9.]/g, '')));
  return o;
}
const MONEDAS = { amazon: '$', zzounds: '$', gear4music: '£', andertons: '£', musicstore: '€' };

const MONTAJES = {
  'Basico': [[15, 1, 'Scarlett 2i2'], [297, 1, 'NT1 Signature'], [609, 1, 'ATH-M20x'], [58, 1, 'K&M 210/2'], [170, 1, 'Paneles G4M']],
  'Profesional': [[18, 1, 'SSL 2+ MKII'], [3, 1, 'NT1 5th Gen'], [25, 1, 'ATH-M50x'], [58, 1, 'K&M 210/2'], [170, 1, 'Paneles G4M']],
  'Definitivo': [[18, 1, 'SSL 2+ MKII'], [3, 1, 'NT1 5th Gen'], [26, 1, 'MDR-7506'], [20, 2, 'Rokit 7 G5'], [58, 1, 'K&M 210/2'], [170, 1, 'Paneles G4M']]
};

Object.entries(MONTAJES).forEach(([nombre, items]) => {
  console.log('\n=== ' + nombre + ' ===');
  let cat = 0, usa = 0;
  items.forEach(([id, mult, etiqueta]) => {
    const p = precios(id);
    const c = byId[id].price;
    const cKeys = Object.keys(p);
    let base = null,tienda = '';
    if (p.amazon) { base = p.amazon; tienda = 'Amazon'; }
    else if (p.zzounds) { base = p.zzounds; tienda = 'zZounds'; }
    else if (p.musicstore) { base = p.musicstore; tienda = 'Music Store'; }
    else if (p.gear4music) { base = p.gear4music; tienda = 'Gear4Music'; }
    else if (p.andertons) { base = p.andertons; tienda = 'Andertons'; }
    cat += c * mult;
    if (base) usa += base * mult;
    console.log('  ' + etiqueta.padEnd(15) + 'x' + mult +
      '  catalogo $' + (c * mult) +
      '  |  ' + (tienda ? tienda + ' $' + (base * mult) : 'SIN BOTON CON PRECIO') +
      (p.amazon && p.zzounds ? '   (todas: ' + cKeys.map(k => (MONEDAS[k] || '') + p[k]).join(' / ') + ')' : ''));
  });
  console.log('  ' + '-'.repeat(52));
  console.log('  ' + 'SUMA catalogo:  $' + cat);
  console.log('  ' + 'SUMA botones:   $' + (usa ? usa.toFixed(2).replace(/\.00$/, '') : 'n/a'));
});
