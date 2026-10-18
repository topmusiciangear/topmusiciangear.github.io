const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const nuevos = products.filter(p => p.id >= 1042 && p.id <= 1048);

console.log('=== REVISION DE ENLACES DE LOS 7 PRODUCTOS NUEVOS ===\n');
let problemas = 0;

for (const p of nuevos) {
  console.log(p.id + ' | ' + p.title);
  const claves = Object.keys(p.stores || {});
  if (!claves.length) { console.log('   SIN TIENDAS'); problemas++; }
  for (const k of claves) {
    const url = p.stores[k];
    const fallos = [];
    if (k === 'amazon') {
      if (!/tag=topmusicg-20/.test(url)) fallos.push('FALTA tag=topmusicg-20');
      const asin = (url.match(/\/dp\/([A-Z0-9]{10})/) || [])[1];
      if (!asin) fallos.push('sin ASIN');
      else if (!/^B0[A-Z0-9]{8}$/.test(asin)) fallos.push('ASIN con formato raro: ' + asin);
      if (/[?&](siid|sr|rdr|search_query|psc|th)=/i.test(url)) fallos.push('parametro de sesion');
    }
    if (/[?&](siid|sr|rdr|search_query|psc|th|fbclid|gclid)=/i.test(url)) fallos.push('parametro de rastreo');
    if (!/^https:\/\//.test(url)) fallos.push('no es https');
    console.log('   [' + k + '] ' + (fallos.length ? 'FALLA -> ' + fallos.join(' | ') : 'OK'));
    if (fallos.length) problemas++;
    console.log('        ' + url);
  }
  console.log('');
}

// ASINs usados y si estan duplicados en el catalogo
console.log('=== ASIN REPETIDOS EN TODO EL CATALOGO ===');
const asines = {};
products.forEach(p => {
  const a = (p.stores || {}).amazon;
  if (!a) return;
  const m = a.match(/\/dp\/([A-Z0-9]{10})/);
  if (!m) return;
  (asines[m[1]] = asines[m[1]] || []).push(p.id + ' ' + p.title);
});
let repes = 0;
Object.entries(asines).forEach(([a, lista]) => {
  if (lista.length > 1) { repes++; console.log('  ' + a + ' -> ' + lista.join('  ||  ')); }
});
if (!repes) console.log('  ninguno');

//atalogo completo sin tag en amazon
const sinTag = products.filter(p => p.stores && p.stores.amazon && !/tag=topmusicg-20/.test(p.stores.amazon));
console.log('\n=== PRODUCTOS DEL CATALOGO SIN tag=topmusicg-20 ===');
console.log('  total: ' + sinTag.length);
sinTag.slice(0, 10).forEach(p => console.log('  ' + p.id + ' ' + p.title + ' -> ' + p.stores.amazon.slice(0, 70)));

console.log('\n=== RESUMEN ===');
console.log(problemas === 0 ? 'Los 7 productos nuevos: enlaces correctos' : 'problemas: ' + problemas);
