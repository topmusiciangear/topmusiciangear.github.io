// Extraer TODOS los href de zZounds RENDERIZADOS en las 314 paginas
// (usa cfg.urls cuando existe, que es lo que el usuarioreally hace clic)
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

const urls = new Map();
const guias = fs.readdirSync(BASE + 'guides').filter(f => f.endsWith('.html'));

guias.forEach(f => {
  const d = fs.readFileSync(BASE + 'guides/' + f, 'utf8');
  [...d.matchAll(/<a [^>]*data-store="zzounds"[^>]*href="([^"]+)"/g)].forEach(m => {
    const u = m[1].replace(/&amp;/g, '&');
    if (!urls.has(u)) urls.set(u, []);
    if (urls.get(u).length < 3) urls.get(u).push(f.replace('.html', ''));
  });
});

// tambien los href de los botones primarios de zZounds (data-store puede no estar)
const solo = new Set();
guias.forEach(f => {
  const d = fs.readFileSync(BASE + 'guides/' + f, 'utf8');
  [...d.matchAll(/data-aff="(https:\/\/www\.anrdoezrs\.net\/[^"]+)"/g)].forEach(m => {
    const dest = decodeURIComponent((m[1].match(/[?&]url=([^&]+)/) || [])[1] || '');
    if (/zzounds\.com/.test(dest)) solo.add(dest);
  });
});

console.log('hrefs de zZounds renderizados (en <a>): ' + urls.size);
console.log('destinos distintos en data-aff:        ' + solo.size);

fs.writeFileSync(BASE + 'temp/zz_urls_render.json',
  JSON.stringify([...urls.keys()], null, 1), 'utf8');
fs.writeFileSync(BASE + 'temp/zz_aff_render.json',
  JSON.stringify([...solo], null, 1), 'utf8');

console.log('\nprimeros 8 <a>:');
[...urls.keys()].slice(0, 8).forEach(u => console.log('  ' + u.replace('https://www.zzounds.com', '')));
