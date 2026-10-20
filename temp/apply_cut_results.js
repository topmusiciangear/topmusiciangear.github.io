// Pasa los resultados del recorte a data/cut-images.json (solo los que tienen WebP valido).
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const resultsPath = path.join(root, 'temp/cut_results.json');
const outPath = path.join(root, 'data/cut-images.json');

if (!fs.existsSync(resultsPath)) {
  console.error('Falta temp/cut_results.json (corre antes python temp/cut_all_images.py)');
  process.exit(1);
}

const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));

// Lista negra manual: fotos cuyo recorte sale mal (objeto blanco pegado encima,
// etiquetas de texto, capturas de pantalla...). Se quedan con su imagen original.
const blacklistPath = path.join(root, 'data/cut-blacklist.json');
const blacklist = fs.existsSync(blacklistPath) ? JSON.parse(fs.readFileSync(blacklistPath, 'utf8')) : [];
const blocked = url => blacklist.some(t => t && url.indexOf(t) !== -1);

const map = {};
let total = 0, missing = 0, skipped = 0;

Object.keys(results).forEach(url => {
  if (blocked(url)) { skipped++; return; }
  const rel = results[url];
  if (!rel) return;
  if (!fs.existsSync(path.join(root, rel))) { missing++; return; }
  map[url] = rel;
  total++;
});

fs.writeFileSync(outPath, JSON.stringify(map, null, 1));
console.log('data/cut-images.json: ' + total + ' imagenes recortadas'
  + (missing ? ' (' + missing + ' sin archivo)' : '')
  + (skipped ? ' (' + skipped + ' en lista negra)' : ''));
