const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const d = fs.readFileSync(BASE + 'guides/best-monitors-for-small-rooms_es.html', 'utf8');
const m = d.indexOf('openReviewModal(684)');
const seg = d.slice(m, m + 20000);

const ini = seg.indexOf('data-store="zzounds"');
const iniTag = seg.lastIndexOf('<a ', ini);
const fin = seg.indexOf('</a>', ini);
const fila = seg.slice(iniTag, fin + 4);

console.log('=== FILA zZounds CRUDA ===\n');
console.log(fila.replace(/style="[^"]*"/g, 'style=".."').replace(/<svg[\s\S]*?<\/svg>/g, '[svg]'));
console.log('\n--- texto ---');
console.log(fila.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());

console.log('\n\n=== COMPARACION con una fila que SI es na en otra guia ===');
const d2 = fs.readFileSync(BASE + 'guides/starter-studio_es.html', 'utf8');
const ej = [...d2.matchAll(/<a [^>]*data-store="zzounds"[^>]*>([\s\S]{0,900}?)<\/a>/g)]
  .map(x => x[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())
  .filter(t => /Agotado|No disponible/i.test(t));
console.log('  ejemplos en starter-studio: ' + (ej.length ? ej.slice(0, 3).join(' | ') : '(ninguno)'));
