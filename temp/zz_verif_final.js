// Verificacion final: ningun boton de zZounds debe llevar a la portada ni a un 404
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guias = fs.readdirSync(BASE + 'guides').filter(f => f.endsWith('.html'));

const PORTADA = 'https://www.zzounds.com/"';
const ROTOS = new Set([
  'https://www.zzounds.com/item--SEENEOMUSB',
  'https://www.zzounds.com/productreview--BEHXR18',
  'https://www.zzounds.com/productreview--BEHX32COMPACT'
]);

let total = 0, portada = 0, rotos = 0;
const conPortada = [], conRotos = [];

guias.forEach(f => {
  const d = fs.readFileSync(BASE + 'guides/' + f, 'utf8');
  [...d.matchAll(/<a [^>]*data-store="zzounds"[^>]*href="([^"]+)"/g)].forEach(m => {
    total++;
    if (m[1] + '"' === PORTADA) { portada++; conPortada.push(f); }
    if (ROTOS.has(m[1])) { rotos++; conRotos.push(f + ' -> ' + m[1]); }
  });
});

console.log('=== BOTONES DE zZounds EN LAS 314 PAGINAS ===');
console.log('  total:                 ' + total);
console.log('  a la PORTADA (mal):    ' + portada);
console.log('  a un 404 (mal):        ' + rotos);
if (conPortada.length) console.log('    ' + [...new Set(conPortada)].slice(0, 8).join(', '));
if (conRotos.length) conRotos.slice(0, 8).forEach(x => console.log('    ' + x));

// comprobaciones de UTF-8 en TODO el repo generado
console.log('\n=== UTF-8 ===');
let malos = 0;
['build-guides.js', 'js/app.js', 'js/app.min.js', 'js/shop-buttons.js', 'data/products.json', 'data/guides.json']
  .forEach(f => {
    const s = fs.readFileSync(BASE + f, 'utf8');
    const n = (s.match(/â‚¬|Â£|Â°|Ã©/g) || []).length;
    console.log('  ' + f.padEnd(24) + 'mojibake: ' + n);
    malos += n;
  });
guias.forEach(f => { malos += (fs.readFileSync(BASE + 'guides/' + f, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length; });
console.log('  las 314 paginas        mojibake: ' + malos);

// precios
console.log('\n=== PRECIOS EN LOS 6 PRODUCTOS TOCADOS ===');
const s = fs.readFileSync(BASE + 'build-guides.js', 'utf8');
const ini = s.indexOf('const TEST_SHOP_BTN = {');
const bloque = s.slice(ini, s.indexOf('\n};', ini));
[138, 145, 422, 430, 449, 670].forEach(id => {
  const m = new RegExp('(?:^|\\n)(\\s*)' + id + ':\\s*\\{').exec(bloque);
  if (!m) { console.log('  ' + id + ': sin entrada'); return; }
  const i0 = m.index + m[1].length;
  let d = 0, f = i0;
  for (let j = i0; j < bloque.length; j++) { if (bloque[j] === '{') d++; else if (bloque[j] === '}') { d--; if (!d) { f = j; break; } } }
  const ent = bloque.slice(i0, f + 1).replace(/\s+/g, ' ');
  console.log('  ' + String(id).padEnd(4) + ent.slice(0, 175));
});
