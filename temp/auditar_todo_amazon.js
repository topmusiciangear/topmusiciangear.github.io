const fs = require('fs');
const path = require('path');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';

function recorrer(dir, acc) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (['.git', 'node_modules', 'temp', '.github'].includes(e.name)) continue;
      recorrer(p, acc);
    } else if (e.name.endsWith('.html')) acc.push(p);
  }
  return acc;
}

const files = recorrer(B, []);
console.log('ficheros HTML en el sitio: ' + files.length);

let conAmazon = 0, sinTag = 0;
const listaSin = [];
const porArchivo = {};

for (const f of files) {
  const s = fs.readFileSync(f, 'utf8');
  const enlaces = s.match(/https:\/\/(?:www\.)?amazon\.[a-z.]+\/(?:dp|gp\/product)\/[A-Z0-9]{10}[^"\s<]*/g) || [];
  const malos = enlaces.filter(u => !/tag=/.test(u));
  if (enlaces.length) {
    conAmazon += enlaces.length;
    if (malos.length) {
      sinTag += malos.length;
      porArchivo[path.relative(B, f)] = malos.length;
      listaSin.push(...malos.slice(0, 3).map(u => path.relative(B, f) + '  ->  ' + u.slice(0, 70)));
    }
  }
}

console.log('enlaces Amazon en TODO el sitio: ' + conAmazon);
console.log('enlaces Amazon SIN tag: ' + sinTag);
console.log('\nficheros afectados: ' + Object.keys(porArchivo).length);
Object.entries(porArchivo).slice(0, 10).forEach(([f, n]) => console.log('  ' + n + 'x  ' + f));
if (listaSin.length) { console.log('\nejemplos:'); listaSin.slice(0, 8).forEach(x => console.log('  ' + x)); }
