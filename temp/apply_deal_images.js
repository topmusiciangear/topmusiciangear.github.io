// Sustituye las URLs de foto en deals.json y manual-deals.json por la copia local,
// y deja el mapa en data/deals-images.json (lo usa auto-deals.js para nuevas ofertas).
const fs = require('fs');

const map = JSON.parse(fs.readFileSync('temp/deal_img_map.json', 'utf8'));
let total = 0;

for (const file of ['data/deals.json', 'data/manual-deals.json']) {
  let s = fs.readFileSync(file, 'utf8');
  let n = 0;
  for (const [url, rel] of Object.entries(map)) {
    const needle = '"' + url + '"';
    const count = s.split(needle).length - 1;
    if (count) {
      s = s.split(needle).join('"' + rel + '"');
      n += count;
    }
  }
  fs.writeFileSync(file, s, 'utf8');
  console.log(file + ': ' + n + ' sustituciones');
  total += n;
}

fs.writeFileSync('data/deals-images.json', JSON.stringify(map, null, 2) + '\n', 'utf8');
console.log('total: ' + total + ' | mapa guardado en data/deals-images.json (' + Object.keys(map).length + ' URLs)');

// comprobacion final
for (const file of ['data/deals.json', 'data/manual-deals.json']) {
  const list = JSON.parse(fs.readFileSync(file, 'utf8'));
  const items = Array.isArray(list) ? list : list.deals;
  const ext = items.filter(d => /^https?:/.test(d.img || ''));
  const loc = items.filter(d => /^img\/products\//.test(d.img || ''));
  console.log(file + ': locales ' + loc.length + ' | externas ' + ext.length);
  ext.forEach(d => console.log('   pendiente: ' + d.img));
}
