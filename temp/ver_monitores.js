const fs = require('fs');
const p = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));

// precios de boton (Amazon) desde TEST_SHOP_BTN
const s = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
const ini = s.indexOf('const TEST_SHOP_BTN = {');
const mapa = new Function('return ' + s.slice(ini + 'const TEST_SHOP_BTN = '.length, s.indexOf('\n};', ini) + 2))();

const objetivo = /Rokit|Eris|JBL 305|Yamaha HS/i;
console.log('=== MONITORES EN EL CATALOGO ===');
p.filter(x => objetivo.test(x.title || '') && x.category === 'monitors').forEach(x => {
  const cfg = mapa[x.id];
  const amazon = cfg && cfg.prices && cfg.prices.amazon ? cfg.prices.amazon : '(sin Amazon)';
  console.log('  ' + String(x.id).padStart(4) + '  ' + x.title);
  console.log('        catalogo: $' + x.price + '   Amazon boton: ' + amazon + '   unidad: ' + (x.unit || '—'));
  console.log('        tiendas: ' + Object.keys(x.stores || {}).join(', '));
});
