// Verifica que todos los /img/cut/*.webp referenciados existan en disco.
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const dir = path.join(root, 'guides');
let refs = 0, missing = new Set(), files = 0;
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.html')) continue;
  const s = fs.readFileSync(path.join(dir, f), 'utf8');
  const re = /\/img\/cut\/([a-f0-9]{10}\.webp)/g;
  let m;
  while ((m = re.exec(s))) {
    refs++;
    const p = path.join(root, 'img/cut', m[1]);
    if (!fs.existsSync(p)) missing.add(m[1]);
  }
  if (s.includes('img/guides/best-monitors')) console.log('REF VIEJA en ' + f);
  files++;
}
console.log('paginas: ' + files + ' | referencias: ' + refs + ' | faltan: ' + missing.size);
if (missing.size) console.log([...missing].slice(0, 10).join('\n'));
// y al reves: recortes que nadie usa
const used = new Set();
for (const f of fs.readdirSync(dir)) {
  const s = fs.readFileSync(path.join(dir, f), 'utf8');
  const re = /\/img\/cut\/([a-f0-9]{10}\.webp)/g;
  let m;
  while ((m = re.exec(s))) used.add(m[1]);
}
const all = fs.readdirSync(path.join(root, 'img/cut')).filter(f => f.endsWith('.webp'));
const unused = all.filter(f => !used.has(f));
console.log('recortes en disco: ' + all.length + ' | sin usar en guias: ' + unused.length);
