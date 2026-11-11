const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
// 1. products.json
const pPath = B + 'data/products.json';
let raw = fs.readFileSync(pPath, 'utf8');
const before = raw;
raw = raw.replace('"es": "Punto dulce amplio"', '"es": "Punto ideal amplio"');
if (raw === before) { console.log('ERROR: no cambio products'); process.exit(1); }
fs.writeFileSync(pPath, raw, 'utf8');
console.log('1. products.json 684 bestFor.es OK');
// 2. guides.json
const gPath = B + 'data/guides.json';
let g = fs.readFileSync(gPath, 'utf8');
const b2 = g;
g = g.replace('como caballo de batalla cerrado y plegable', 'como herramienta de trabajo cerrada y plegable');
if (g === b2) { console.log('ERROR: no cambio guides'); process.exit(1); }
fs.writeFileSync(gPath, g, 'utf8');
console.log('2. guides.json caballo OK');
// 3. translations.js
const tPath = B + 'js/translations.js';
let t = fs.readFileSync(tPath, 'utf8');
const b3 = t;
t = t.replace('creemos genuinamente', 'creemos de verdad');
if (t === b3) { console.log('ERROR: no cambio translations'); process.exit(1); }
fs.writeFileSync(tPath, t, 'utf8');
console.log('3. translations.js OK');
// 4. min files
['t.min.js', 'translations.min.js', 'translations.v2.min.js', 'translations.v3.min.js', 'translations.v4.min.js'].forEach(function (f) {
  const fp = B + 'js/' + f;
  let c = fs.readFileSync(fp, 'utf8');
  const b = c;
  c = c.replace(/creemos genuinamente/g, 'creemos de verdad');
  if (c !== b) { fs.writeFileSync(fp, c, 'utf8'); console.log('4. ' + f + ' OK'); }
  else console.log('4. ' + f + ' sin cambio');
});
