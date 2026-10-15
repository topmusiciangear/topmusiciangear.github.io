const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const d = fs.readFileSync(BASE + 'guides/best-headphones.html', 'utf8');

console.log('=== TODOS los <a data-store="zzounds"> del HTML ===');
const filas = [...d.matchAll(/<a data-store="zzounds" href="([^"]+)"/g)];
console.log('filas zzounds: ' + filas.length);
const vistos = new Set();
filas.forEach(m => {
  if (vistos.has(m[1])) return;
  vistos.add(m[1]);
  const h = m[1];
  console.log('  ' + (/anrdoezrs/.test(h) ? 'WRAPPER ' : 'DIRECTO ') + h.slice(0, 110));
});

console.log('\n=== conteo global en guides/ por tipo de href zzounds en <a data-store> ===');
let wrap = 0, dir = 0;
const dirUrls = new Set();
fs.readdirSync(BASE + 'guides').filter(f => f.endsWith('.html')).forEach(f => {
  const c = fs.readFileSync(BASE + 'guides/' + f, 'utf8');
  [...c.matchAll(/<a data-store="zzounds" href="([^"]+)"/g)].forEach(m => {
    if (/anrdoezrs/.test(m[1])) wrap++; else { dir++; dirUrls.add(m[1]); }
  });
});
console.log('  <a> con wrapper:  ' + wrap);
console.log('  <a> directos:     ' + dir + '  (' + dirUrls.size + ' URLs distintas)');

console.log('\n=== ¿algún <a> zzounds con destino a--925521? ===');
let mala = 0;
fs.readdirSync(BASE + 'guides').filter(f => f.endsWith('.html')).forEach(f => {
  const c = fs.readFileSync(BASE + 'guides/' + f, 'utf8');
  [...c.matchAll(/<a data-store="zzounds" href="([^"]+)"/g)].forEach(m => {
    if (/a--925521/.test(decodeURIComponent(m[1]))) mala++;
  });
});
console.log('  ' + mala);
