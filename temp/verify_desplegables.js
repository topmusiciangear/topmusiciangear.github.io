const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const d = fs.readFileSync(BASE+'guides/best-monitors.html','utf8');

// tomar TODOS los shop-more-list de la pagina y ver si el de HS8/Rokit tiene filas
const listas = [...d.matchAll(/<div class="shop-more-list"[\s\S]*?<\/div>/g)];
console.log('desplegables en best-monitors.html: ' + listas.length);

let idx = -1, total = 0;
listas.forEach((l,i)=>{
  const filas = [...l[0].matchAll(/data-store="([^"]+)"/g)].map(m=>m[1]);
  total += filas.length;
  // detectar si es el del HS8 o Rokit mirando el boton mas cercano antes
  const previo = d.slice(Math.max(0,l.index-9000), l.index);
  const ultimo = (previo.match(/guide-product-card-title[^>]*>([^<]+)/g)||[]).pop();
  const nom = ultimo ? ultimo.replace(/guide-product-card-title[^>]*>/,'').trim() : '?';
  if (/HS8|Rokit/.test(nom)) {
    console.log('\n  desplegable ' + i + ' de: ' + nom);
    console.log('    filas: ' + filas.join(', '));
    idx = i;
  }
});
console.log('\ntotal filas en la pagina: ' + total);

// volcar las filas del desplegable del HS8
if (idx > -1) {
  console.log('\n=== FILAS DETALLADAS ===');
  [...listas[idx][0].matchAll(/<a[^>]*data-store="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].forEach(m=>{
    const txt = m[0].replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
    console.log('  ' + m[1].padEnd(12) + (/data-price=|data-pb-/.test(m[0])?'[precio]':'[      ]') + '  ' + txt.slice(0,80));
  });
}