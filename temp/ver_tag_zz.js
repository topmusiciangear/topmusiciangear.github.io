const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const d = fs.readFileSync(BASE + 'guides/best-headphones.html', 'utf8');

const i = d.indexOf('data-store="zzounds"');
// retroceder hasta el '<' que abre la etiqueta
const ini = d.lastIndexOf('<', i);
const fin = d.indexOf('</a>', i);
const tag = d.slice(ini, fin + 4);

console.log('=== LA ETIQUETA COMPLETA (primeros 400 chars) ===');
console.log(tag.slice(0, 400).replace(/style="[^"]*"/g, 'style="..."'));

const href = (tag.match(/href="([^"]+)"/) || [])[1];
console.log('\nhref: ' + href);
console.log('¿wrapper? ' + (/anrdoezrs/.test(href || '') ? 'SI' : 'NO'));
