const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const vivos = JSON.parse(fs.readFileSync(B + 'temp/pb_precios_vivos.json', 'utf8'));
const eur = v => (v / 1.0084).toFixed(2);
const gbp = v => ((v / 1.0084) * 0.7959).toFixed(2);
const norm = s => parseFloat(String(s).replace(/[^0-9.]/g, ''));

let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
const log = [];

vivos.forEach(v => {
  if (!v.actual) return;
  const obj = norm(v.actual);
  if (obj === norm(v.nuestro)) return;
  const re = new RegExp('((?:^|\\n)\\s*' + v.id + ': \\{prices:\\{)([^\\n]*)');
  const m = bg.match(re);
  if (!m) { log.push(v.id + ': entrada no localizada'); return; }
  const resto = m[2];
  // sustituye el precio de PB
  let nuevoResto = resto.replace(/pluginboutique:"[^"]+"/, 'pluginboutique:"\u20AC' + obj.toFixed(2) + '"');
  // sustituye us/uk dentro de pbCur
  nuevoResto = nuevoResto.replace(/pbCur:\{us:"[^"]+",uk:"[^"]+"\}/, 'pbCur:{us:"$' + eur(obj) + '",uk:"\u00A3' + gbp(obj) + '"}');
  const nuevoBloque = m[1] + nuevoResto;
  bg = bg.replace(m[0], nuevoBloque);
  log.push(v.id + ' | ' + v.nombre + ': ' + v.nuestro + ' -> \u20AC' + obj.toFixed(2) +
    (v.badge ? '  [' + v.badge + ']' : '  (redondeo)') + '  US $' + eur(obj) + ' / \u00A3' + gbp(obj));
});

fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
console.log('precios PB actualizados: ' + log.length + '\n');
log.forEach(l => console.log('  ' + l));

// verificacion: releer el mapa
const check = fs.readFileSync(B + 'build-guides.js', 'utf8');
console.log('\n--- verificacion ---');
vivos.forEach(v => {
  if (!v.actual) return;
  const m = check.match(new RegExp('(?:^|\\n)\\s*' + v.id + ': \\{prices:\\{[^\\n]*'));
  console.log('  ' + v.id + ': ' + (m ? m[0].replace(/^\n/, '').trim().slice(0, 120) : 'NO'));
});