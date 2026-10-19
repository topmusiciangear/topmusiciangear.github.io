const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const html = fs.readFileSync(B + 'guides/best-headphones-for-mixing_es.html', 'utf8');
const i = html.indexOf('Audeze MM-500');
const seg = html.substring(i - 200, i + 2500);

// Extraer todos los href de las tiendas del card
const hrefs = (seg.match(/href="([^"]+)"/g) || []).map(h => h.replace(/"/g, ''));
hrefs.forEach(h => console.log('  ' + h));
