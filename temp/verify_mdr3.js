const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const d = fs.readFileSync(BASE + 'guides/best-headphones.html', 'utf8');

const occ = d.indexOf('SNYMDR7506');
const ini = d.lastIndexOf('<a data-store="zzounds"', occ);
const fin = d.indexOf('</a>', occ);
const fila = d.slice(ini, fin + 4);
console.log('=== FILA zZounds del MDR-7506 ===');
console.log('texto: ' + fila.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
console.log('data-price: ' + (/data-price=/.test(fila) ? 'SI' : 'no'));

// comparar con una fila zZounds CON precio de otro producto
const otras = [...d.matchAll(/<a data-store="zzounds"[^>]*data-price='([^']*)'[^>]*>/g)];
console.log('\nfilas zZounds CON precio en esta pagina: ' + otras.length);
otras.slice(0, 3).forEach(m => console.log('  ' + m[1]));

// y otra sin precio, para ver la etiqueta
const sinP = [...d.matchAll(/<a data-store="zzounds"[^>]*>([\s\S]*?)<\/a>/g)]
  .filter(m => !/data-price=/.test(m[0]) && !/SNYMDR7506/.test(m[0]));
console.log('\nfilas zZounds SIN precio: ' + sinP.length);
sinP.slice(0, 3).forEach(m =>
  console.log('  "' + m[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 60) + '"'));
