// Auditar los wrappers de zZounds: cuantos van con /a--925521 (caen en la portada)
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

function auditar(archivos, etiqueta) {
  let ok = 0, conA = 0, otros = 0;
  const conAUrl = [];
  archivos.forEach(f => {
    const d = fs.readFileSync(BASE + f, 'utf8');
    [...d.matchAll(/href="(https:\/\/www\.anrdoezrs\.net\/click-[^"]+)"/g)].forEach(m => {
      const h = m[1];
      const dest = decodeURIComponent((h.match(/[?&]url=([^&]+)/) || [])[1] || '');
      if (/a--925521/.test(dest)) { conA++; conAUrl.push(dest); }
      else if (/zzounds\.com/.test(dest)) ok++;
      else otros++;
    });
  });
  const pct = (a, b) => b ? Math.round(a / b * 100) : 0;
  console.log('=== ' + etiqueta + ' ===');
  console.log('  wrappers bien (sin a--925521): ' + ok);
  console.log('  wrappers MAL (con a--925521):  ' + conA + (conA ? '  <-- caen en la PORTADA' : ''));
  console.log('  otros:                        ' + otros);
  return conAUrl;
}

const guias = fs.readdirSync(BASE + 'guides').filter(f => f.endsWith('.html')).map(f => 'guides/' + f);
const malos = auditar(guias, 'GUIAS (314 paginas)');
console.log('\n  ejemplos de destinos rotos:');
[...new Set(malos)].slice(0, 5).forEach(u => console.log('    ' + u));

console.log('');
auditar(['index.html', 'deals.html', 'deals_es.html', 'js/shop-buttons.js', 'js/app.js'], 'SPA / INDEX / DEALS');
