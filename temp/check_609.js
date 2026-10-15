// Estado actual del ATH-M20x (id 609) y de los otros sin entrada en el mapa
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

const arr = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const list = Array.isArray(arr) ? arr : arr.products;
const byId = {}; list.forEach(p => byId[p.id] = p);

[609].forEach(id => {
  const p = byId[id];
  if (!p) { console.log('id ' + id + ' no existe'); return; }
  console.log('=== id ' + id + ': ' + p.title + ' ===');
  console.log('title_es: ' + (p.title_es || '-'));
  console.log('price:    ' + (p.price || '-'));
  console.log('tiendas:');
  const st = p.stores || {};
  Object.keys(st).forEach(k => console.log('  ' + k.padEnd(12) + (st[k] || '(vacio)')));
  if (!Object.keys(st).length) console.log('  NINGUNA');
});

// en que guias sale
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
console.log('\n=== guias donde aparece el 609 ===');
guides.forEach(g => {
  const enSecc = (g.sections || []).some(s => (s.products || []).includes(609));
  const enFeat = (g.featuredProducts || []).includes(609);
  if (enSecc || enFeat) console.log('  ' + g.id + (enSecc ? ' [tarjeta]' : '') + (enFeat ? ' [featured]' : ''));
});

// entrada en el mapa
const lineas = fs.readFileSync(BASE + 'build-guides.js', 'utf8').split('\n');
const con609 = lineas.map((l, i) => [i, l]).filter(([i, l]) => /^\s*609:\s*\{/.test(l));
console.log('\n=== entrada 609 en TEST_SHOP_BTN ===');
if (!con609.length) console.log('  NO HAY ENTRADA (por eso no tiene precio)');
else con609.slice(0, 2).forEach(([i]) => console.log('  L' + (i + 1) + ': ' + lineas.slice(i, i + 5).join(' ').replace(/\s+/g, ' ').slice(0, 200)));
