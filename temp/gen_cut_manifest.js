// Genera la lista de imagenes a recortar (productos + portadas de guias).
// Salida: temp/cut_manifest.json  ->  [{ url, out }]
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const root = path.join(__dirname, '..');
const products = require(path.join(root, 'data/products.json'));
const rawGuides = require(path.join(root, 'data/guides.json'));
const guides = Array.isArray(rawGuides) ? rawGuides : (rawGuides.guides || Object.values(rawGuides));

const urls = new Set();
products.forEach(p => { if (p && p.img && String(p.img).trim()) urls.add(String(p.img).trim()); });
guides.forEach(g => { if (g && g.image && String(g.image).trim()) urls.add(String(g.image).trim()); });

const list = [...urls].map(url => {
  const key = crypto.createHash('md5').update(url).digest('hex').slice(0, 10);
  return { url, out: 'img/cut/' + key + '.webp' };
});

fs.mkdirSync(path.join(root, 'img/cut'), { recursive: true });
fs.writeFileSync(path.join(root, 'temp/cut_manifest.json'), JSON.stringify(list, null, 1));
console.log('Manifest: ' + list.length + ' imagenes unicas -> temp/cut_manifest.json');
