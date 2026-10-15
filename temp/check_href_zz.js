const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

const d = fs.readFileSync(BASE + 'guides/best-headphones.html', 'utf8');
const i = d.indexOf('AUTATHM20X');

const ini = d.lastIndexOf('<a data-store="zzounds"', i);
const fin = d.indexOf('</a>', i);
const fila = ini > -1 ? d.slice(ini, fin + 4) : '(no encontrado)';

console.log('=== FILA zZounds del ATH-M20x (HTML estatico) ===');
const href = (fila.match(/href="([^"]+)"/) || [])[1];
console.log('href completo:\n  ' + href);
console.log('\n  ¿envuelto con anrdoezrs? ' + (/anrdoezrs/.test(href) ? 'SI' : 'NO'));
console.log('  ¿lleva a--925521?         ' + (/a--925521/.test(decodeURIComponent(href)) ? 'SI' : 'NO'));
console.log('  destino final:            ' + decodeURIComponent(href).replace('https://www.', ''));

// cuantos href de zzounds hay en la pagina y de que tipo
const todos = [...d.matchAll(/href="(https?:\/\/[^"]*zzounds[^"]*)"/g)].map(m => m[1]);
const tipos = {};
todos.forEach(h => {
  let t;
  if (/anrdoezrs/.test(h)) t = 'wrapper (anrdoezrs)';
  else if (/\/lp\//.test(h)) t = 'landing /lp/ (menu, no producto)';
  else t = 'directo zzounds.com';
  tipos[t] = (tipos[t] || 0) + 1;
});
console.log('\n=== tipos de href con "zzounds" en best-headphones.html ===');
Object.entries(tipos).forEach(([k, v]) => console.log('  ' + String(v).padStart(3) + 'x  ' + k));

// ¿los productos con a--925521 salen envueltos o directos?
const conA = todos.filter(h => /a--925521/.test(decodeURIComponent(h)));
console.log('\n  hrefs cuyo destino lleva a--925521: ' + conA.length);
conA.slice(0, 3).forEach(h => console.log('    ' + h.slice(0, 120)));
