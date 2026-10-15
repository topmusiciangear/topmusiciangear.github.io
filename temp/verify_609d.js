const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const d = fs.readFileSync(BASE + 'guides/best-headphones.html', 'utf8');

const occ = [...d.matchAll(/AUTATHM20X/gi)];
console.log('ocurrencias: ' + occ.length);

// la 3ra (indice 2) es la del desplegable
const m = occ[2];
const ini = Math.max(0, m.index - 6000);
const fin = Math.min(d.length, m.index + 4000);
const frag = d.slice(ini, fin);

// quitar estilos para leerlo
const limpio = frag
  .replace(/style="[^"]*"/g, '')
  .replace(/<style[\s\S]*?<\/style>/g, '')
  .replace(/\s+/g, ' ');

console.log('\n=== REGION (recortada) ===');
console.log(limpio.slice(limpio.length / 2 - 2000));
