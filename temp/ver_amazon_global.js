const fs = require('fs'), path = require('path');
const B = 'C:/Users/Daniel/projects/topmusiciangear/guides/';
const files = fs.readdirSync(B).filter(f => f.endsWith('.html'));

let pagConAmz = 0, primAmz = 0, primAmzPrecio = 0, primAmzCheck = 0;
let filasAmz = 0, filasAmzPrecio = 0, filasAmzCheck = 0;
const conPrecio = [];

files.forEach(f => {
  const d = fs.readFileSync(path.join(B, f), 'utf8');
  const prims = [...d.matchAll(/<a[^>]*class="shop-btn-primary"[^>]*>([\s\S]*?)<\/a>/g)]
    .filter(m => /data-store="amazon"/.test(m[0]));
  if (prims.length) pagConAmz++;
  prims.forEach(m => {
    primAmz++;
    const txt = m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
    if (/\$[0-9]|£[0-9]|€[0-9]|Aprox\.|Approx\./.test(txt)) { primAmzPrecio++; conPrecio.push(f); }
    if (/Check price|Verificar precio/.test(txt)) primAmzCheck++;
  });
  const filas = [...d.matchAll(/<a [^>]*data-store="amazon"[^>]*>([\s\S]*?)<\/a>/g)]
    .filter(m => !/shop-btn-primary/.test(m[0]));
  filas.forEach(m => {
    filasAmz++;
    const txt = m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
    if (/\$[0-9]|£[0-9]|€[0-9]|Aprox\.|Approx\./.test(txt)) { filasAmzPrecio++; conPrecio.push(f + ' (fila)'); }
    if (/Check price|Verificar precio/.test(txt)) filasAmzCheck++;
  });
});

console.log('=== TODAS LAS GUIAS (' + files.length + ' paginas) ===');
console.log('  paginas con primario Amazon : ' + pagConAmz);
console.log('  primarios Amazon            : ' + primAmz);
console.log('    con precio                : ' + primAmzPrecio + ' (debe ser 0)');
console.log('    con Check/Verificar       : ' + primAmzCheck);
console.log('  filas Amazon en desplegable : ' + filasAmz);
console.log('    con precio                : ' + filasAmzPrecio + ' (debe ser 0)');
console.log('    con Check/Verificar       : ' + filasAmzCheck);
if (conPrecio.length) {
  console.log('\n  PAGINAS CON PRECIO EN AMAZON:');
  [...new Set(conPrecio)].slice(0, 20).forEach(x => console.log('    - ' + x));
} else console.log('\n  Ninguna pagina muestra precio en Amazon. Cambio aplicado en todo el sitio.');
