// ¿Los precios de las tiendas (fuera de Amazon/Reverb) se ven en las paginas de guia?
const fs = require('fs');
const path = require('path');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/guides/';
const files = fs.readdirSync(BASE).filter(f => f.endsWith('.html') && !f.includes('_es'));

let conPrecio = 0, soloCheckPrice = 0, sinFila = 0;
const ejemplos = [];
const RE_PRECIO = /(- |&euro;|&#8364;|€)([0-9][0-9,]*\.?[0-9]{0,2})/;

for (const f of files) {
  const d = fs.readFileSync(BASE + f, 'utf8');
  // bloques de botones de tienda
  const bloques = [...d.matchAll(/<div class="guide-product-card-stores">([\s\S]*?)<\/div>\s*<\/div>/g)].map(m => m[1]);
  if (!bloques.length) { sinFila++; continue; }
  let alguna = false;
  for (const b of bloques) {
    // separador " - $X" o " - £X" tras el nombre de la tienda
    const conImporte = [...b.matchAll(/data-store="([^"]+)"[\s\S]{0,1500}?<span[^>]*>\s*-\s*([^<]{2,14})<\/span>/g)]
      .filter(m => RE_PRECIO.test(m[2]) || /[$£€]/.test(m[2]));
    if (conImporte.length) { alguna = true; break; }
  }
  if (alguna) { conPrecio++; if (ejemplos.length < 6) ejemplos.push(f); }
  else soloCheckPrice++;
}

console.log('paginas de guia EN: ' + files.length);
console.log('  con algun importe de tienda visible: ' + conPrecio);
console.log('  solo "Check price":                  ' + soloCheckPrice);
console.log('  sin bloque de tiendas:               ' + sinFila);
console.log('\nejemplos con importe: ' + ejemplos.join(', '));

// ver uno concreto
if (ejemplos.length) {
  const d = fs.readFileSync(BASE + ejemplos[0], 'utf8');
  const m = [...d.matchAll(/data-store="([^"]+)"[\s\S]{0,1500}?<span[^>]*>\s*-\s*([^<]{2,16})<\/span>/g)].slice(0, 8);
  console.log('\n--- ' + ejemplos[0] + ' ---');
  m.forEach(x => console.log('   ' + x[1].padEnd(12) + ' -> "' + x[2].trim() + '"'));
  const check = (d.match(/Check price/g) || []).length;
  console.log('   ocurrencias de "Check price": ' + check);
}