// Reproducir los totales actuales y calcular los nuevos
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const s = fs.readFileSync(B + 'build-guides.js', 'utf8');
const ini = s.indexOf('const TEST_SHOP_BTN = {');
const mapa = new Function('return ' + s.slice(ini + 'const TEST_SHOP_BTN = '.length, s.indexOf('\n};', ini) + 2))();

function precio(id) {
  const x = p.find(y => y.id === id);
  const cfg = mapa[id];
  const amz = cfg && cfg.prices && cfg.prices.amazon;
  return { n: (amz ? parseFloat(amz.replace(/[^0-9.]/g, '')) : x.price), de: amz ? 'Amazon' : 'catalogo', t: x.title };
}
const par = id => { const q = precio(id); return { n: q.n * 2, de: q.de, t: q.t + ' (par)' }; };
const uno = id => { const q = precio(id); return { n: q.n, de: q.de, t: q.t }; };

const PANELES = 170, POP = 39, MOGAMI = 167;

const TIERS = {
  1: { base: [15, 297, 609], monitor: 633 },
  2: { base: [18, 3, 25], monitor: 116 },
  3: { base: [16, 674, 26], monitor: 20 }
};
const PANEL_ID = 170;

function total(tier, monitorId) {
  const t = TIERS[tier];
  const partes = t.base.map(id => uno(id)).concat([par(monitorId), uno(PANEL_ID)]);
  return { partes, suma: partes.reduce((a, x) => a + x.n, 0) };
}

console.log('=== TOTALES ACTUALES (deben dar 998 / 1077 / 2537) ===');
[1, 2, 3].forEach(t => {
  const r = total(t, TIERS[t].monitor);
  console.log('  Nivel ' + t + ': $' + r.suma.toFixed(2));
  r.partes.forEach(x => console.log('      ' + ('$' + x.n.toFixed(2)).padStart(10) + '  ' + x.de.padEnd(9) + x.t));
});

console.log('\n=== PROPUESTA: Eris 684 / Rokit 7 (20) / Yamaha HS8 (19) ===');
const PROPUESTA = { 1: 684, 2: 20, 3: 19 };
[1, 2, 3].forEach(t => {
  const r = total(t, PROPUESTA[t]);
  console.log('  Nivel ' + t + ': $' + r.suma.toFixed(2));
  r.partes.forEach(x => console.log('      ' + ('$' + x.n.toFixed(2)).padStart(10) + '  ' + x.de.padEnd(9) + x.t));
});

console.log('\n=== PRECIO DE LOS MONITORES POR PAR ===');
console.log('  ' + 'id'.padEnd(6) + 'monitor'.padEnd(22) + 'unidad   par');
[116, 633, 684, 20, 19, 192, 632].forEach(id => {
  const x = p.find(y => y.id === id);
  const cfg = mapa[id];
  const u = (cfg && cfg.prices && cfg.prices.amazon ? cfg.prices.amazon : '$' + x.price);
  const n = parseFloat(String(u).replace(/[^0-9.]/g, ''));
  console.log('  ' + String(id).padEnd(6) + (x.title || '').padEnd(22) + ('$' + n.toFixed(2)).padEnd(9) + '$' + (n * 2).toFixed(2));
});
