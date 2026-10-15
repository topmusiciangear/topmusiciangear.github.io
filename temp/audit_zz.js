// Inventario de URLs de zZounds: patrones y duplicados
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

// 1. de products.json
const arr = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const list = Array.isArray(arr) ? arr : arr.products;

const filas = [];
list.forEach(p => {
  const u = (p.stores || {}).zzounds;
  if (u) filas.push({ id: p.id, titulo: p.title, url: u });
});

console.log('productos con zZounds en products.json: ' + filas.length);

// clasificar por patron
const patrones = {};
filas.forEach(f => {
  let pat;
  if (/\/a--\d+\/item--/.test(f.url)) pat = 'a--ID/item--SKU  (catalogo)';
  else if (/\/a--\d+\//.test(f.url)) pat = 'a--ID/...       (catalogo, sin item--)';
  else if (/\/item--/.test(f.url)) pat = 'item--SKU      (sin a--ID)';
  else pat = 'OTRO';
  (patrones[pat] = patrones[pat] || []).push(f);
});

console.log('\n=== PATRONES ===');
Object.entries(patrones).sort((a, b) => b[1].length - a[1].length).forEach(([k, v]) => {
  console.log('  ' + String(v.length).padStart(4) + 'x  ' + k);
  console.log('        ej: ' + v[0].url);
});

console.log('\n=== LOS "item--SIN a--ID" (sospechosos) ===');
(patrones['item--SKU      (sin a--ID)'] || []).slice(0, 30).forEach(f =>
  console.log('  ' + String(f.id).padStart(4) + '  ' + f.titulo.padEnd(44) + f.url));

// duplicados
const porUrl = {};
filas.forEach(f => { (porUrl[f.url] = porUrl[f.url] || []).push(f.id + ' ' + f.titulo); });
const dups = Object.entries(porUrl).filter(([k, v]) => v.length > 1);
console.log('\n=== URLS DUPLICADAS: ' + dups.length + ' ===');
dups.slice(0, 10).forEach(([k, v]) => console.log('  ' + v.join(' | ') + '\n     ' + k));

// el MDR-7506 concretamente
const mdr = filas.find(f => f.id === 26);
console.log('\n=== MDR-7506 (id 26) ===');
console.log('  ' + mdr.url);
console.log('  patron: ' + (/a--\d+\//.test(mdr.url) ? 'CON a--ID' : 'SIN a--ID  <-- sospechoso'));

// uno que SI funciona (SM57, id 5) para comparar
const sm = filas.find(f => f.id === 5);
console.log('\n=== SM57 (id 5), que si funciona ===');
console.log('  ' + sm.url);
