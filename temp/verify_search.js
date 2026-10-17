const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-guitar-plugins.html', 'utf8');
// busca las URLs de buscador de GENOME (no tiene mas que PB)
const goals = ['Two%20Notes%20Audio%20Engineering%20GENOME'];
['gear4music', 'musicstore', 'andertons', 'zzounds', 'reverb', 'amazon', 'pluginboutique'].forEach(k => {
  const re = new RegExp('https?://[^"\\s]*' + k + '[^"\\s]*');
  const m = h.match(re);
  console.log(k.padEnd(14) + ': ' + (m ? decodeURIComponent(m[0]).slice(0, 110) : 'sin url'));
});
console.log('\nnombre completo presente en los buscadores: ' + goals.every(g => h.includes(g)));
// casos con sufijo de unidad
const guides = fs.readdirSync('C:/Users/Daniel/projects/topmusiciangear/guides').filter(f => f.endsWith('.html'));
let conPar = 0, total = 0;
guides.forEach(f => {
  const t = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/' + f, 'utf8');
  const ms = [...t.matchAll(/search\?q=([^"&]+)/g)].map(m => decodeURIComponent(m[1]));
  ms.forEach(q => { total++; if (/\((each|pair|set)\)/i.test(q)) { conPar++; console.log('  resto unidad en ' + f + ': ' + q); } });
});
console.log('busquedas totales: ' + total + ' | con sufijo de unidad: ' + conPar);