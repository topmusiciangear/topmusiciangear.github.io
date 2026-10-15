const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const d = fs.readFileSync(BASE+'guides/budget-mics.html','utf8');
const lista = d.match(/<div class="shop-more-list"[\s\S]*?<\/div>/);
const filas = [...lista[0].matchAll(/<a[^>]*data-store="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)];
console.log('filas totales: ' + filas.length + '\n');
filas.forEach((m,i)=>{
  console.log('--- fila ' + (i+1) + ': store=' + m[1] + ' ---');
  console.log('  len HTML: ' + m[0].length);
  console.log('  texto   : ' + m[0].replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim().slice(0,90));
  console.log('  data-price: ' + (/data-price=/.test(m[0]) ? 'SI' : 'no'));
  console.log('');
});