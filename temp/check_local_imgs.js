// Comprueba que las fotos locales referenciadas en las guias existen de verdad.
const fs = require('fs');
const path = require('path');

const pages = fs.readdirSync('guides').filter(f => f.endsWith('.html'));
const missing = new Map();
let refs = 0;
const seen = new Set();

for (const f of pages) {
  const s = fs.readFileSync(path.join('guides', f), 'utf8');
  const re = /(?:src|content)="((?:\.\.\/)?img\/products\/[^"]+\.webp)"/g;
  let m;
  while ((m = re.exec(s))) {
    refs++;
    let rel = m[1];
    if (rel.startsWith('../')) rel = rel.slice(3);
    if (seen.has(rel)) continue;
    seen.add(rel);
    if (!fs.existsSync(rel)) {
      if (!missing.has(rel)) missing.set(rel, new Set());
      missing.get(rel).add(f);
    }
  }
}

const files = fs.readdirSync('img/products').filter(f => f.endsWith('.webp'));
const total = files.reduce((a, f) => a + fs.statSync(path.join('img/products', f)).size, 0);

console.log('paginas: ' + pages.length);
console.log('referencias a fotos locales: ' + refs);
console.log('fotos distintas referenciadas: ' + seen.size);
console.log('ficheros en img/products: ' + files.length + '  (' + (total / 1048576).toFixed(1) + ' MB)');
console.log('referencias rotas: ' + missing.size);
for (const [rel, fs_] of missing) {
  console.log('  ' + rel + ' -> ' + [...fs_].slice(0, 4).join(', '));
}
