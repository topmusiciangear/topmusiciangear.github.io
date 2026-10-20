// Sustituye en data/products.json y data/guides.json las URLs externas de foto
// por la copia local img/products/<hash>.webp (temp/img_map.json).
// Solo hace reemplazo de texto exacto: no reformatea los JSON.
const fs = require('fs');

const map = JSON.parse(fs.readFileSync('temp/img_map.json', 'utf8'));
const files = ['data/products.json', 'data/guides.json'];

let totalRepl = 0;
const missing = new Set();

for (const file of files) {
  let s = fs.readFileSync(file, 'utf8');
  let repl = 0;
  for (const [url, rel] of Object.entries(map)) {
    const needle = '"' + url + '"';
    const count = s.split(needle).length - 1;
    if (count) {
      s = s.split(needle).join('"' + rel + '"');
      repl += count;
    }
  }
  fs.writeFileSync(file, s, 'utf8');
  console.log(file + ': ' + repl + ' sustituciones');
  totalRepl += repl;

  // que ha quedado sin mapear
  const re = /"(https?:\/\/[^"]+\.(?:jpe?g|png|webp)[^"]*)"/gi;
  let m;
  while ((m = re.exec(s))) missing.add(m[1]);
}

console.log('total: ' + totalRepl);
if (missing.size) {
  console.log('\nSIN MAPEAR (' + missing.size + '):');
  [...missing].forEach(u => console.log('  ' + u));
} else {
  console.log('no queda ninguna foto externa sin mapear');
}
