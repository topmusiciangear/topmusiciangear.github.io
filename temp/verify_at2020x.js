const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
let fail = 0;
const ck = (n, ok, extra) => { if (!ok) fail++; console.log('  ' + (ok ? 'OK  ' : '[!!] ') + n.padEnd(46) + (extra || '')); };

console.log('=== A. AT2020USB-X: tiendas y precios ===');
const s = fs.readFileSync(BASE + 'build-guides.js', 'utf8');
const i = s.indexOf('\n  291: {');
const b = s.indexOf('{', i);
let d = 0, k = b;
while (k < s.length) { if (s[k] === '{') d++; else if (s[k] === '}') { d--; if (!d) break; } k++; }
const blk = s.substring(i, k + 1);
console.log(blk);
ck('G4M SIN precio', !/gear4music:\s*"£/.test(blk));
ck('G4M conserva URL real (fila Agotado clicable)', /528M/.test(blk));
ck('Music Store €135.00', /musicstore:\s*"€135\.00"/.test(blk));
ck('Andertons £111.00', /andertons:\s*"£111\.00"/.test(blk));
ck('URL MS es en_OE/EUR', /musicstore\.com\/en_OE\/EUR\/Audio-Technica-AT2020USB-X/.test(blk));
ck('URL MS es el -X, no el -XP', /AT2020USB-X-USB-Condenser/.test(blk) && !/XP-USB/.test(blk));
ck('URL Andertons es el -X', /at2020usb-x-cardioid/.test(blk));

const p = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8')).find(x => x.id === 291);
console.log('\n  products.json stores:'); Object.keys(p.stores).forEach(k => console.log('    ' + k.padEnd(12) + p.stores[k]));
ck('products.json tiene musicstore', !!p.stores.musicstore);
ck('products.json tiene andertons', !!p.stores.andertons);
ck('products.json MS en en_OE/EUR', /musicstore\.com\/en_OE\/EUR\//.test(p.stores.musicstore));

console.log('\n=== B. Error del XLR corregido en best-microphone ===');
['guides/best-microphone.html', 'guides/best-microphone_es.html'].forEach(function (f) {
  const h = fs.readFileSync(BASE + f, 'utf8');
  const bad = /AT2020USB-X[^.]{0,120}(with both USB and XLR|con salidas USB y XLR)/i.test(h);
  ck(f.replace('guides/', ''), !bad);
});
const bm = fs.readFileSync(BASE + 'guides/best-microphone.html', 'utf8');
const bmEs = fs.readFileSync(BASE + 'guides/best-microphone_es.html', 'utf8');
ck('EN dice que es USB-only', /USB-only/.test(bm));
ck('ES dice que es solo USB', /solo USB/.test(bmEs));
ck('EN remite al PodMic/Q2U para XLR', /Rode PodMic USB or the Samson Q2U/.test(bm));
ck('ES remite al PodMic/Q2U para XLR', /Rode PodMic USB o el Samson Q2U/.test(bmEs));

console.log('\n=== C. Superlativos obsoletos del usb-mics ===');
['guides/usb-mics.html', 'guides/usb-mics_es.html'].forEach(function (f) {
  const h = fs.readFileSync(BASE + f, 'utf8');
  ck(f.replace('guides/', '') + ' sin "only mic here"+XLR', !/only mic here[^<]{0,80}XLR/i.test(h));
  ck(f.replace('guides/', '') + ' sin "único"+XLR', !/único [^<]{0,80}XLR/i.test(h));
});
ck('EN: PodMic "One of four"', /One of four mics here/.test(fs.readFileSync(BASE + 'guides/usb-mics.html', 'utf8')));
ck('ES: PodMic "Uno de cuatro"', /Uno de cuatro micrófonos/.test(fs.readFileSync(BASE + 'guides/usb-mics_es.html', 'utf8')));
ck('EN: 148 dB "tied with"', /tied with the Samson Q2U/.test(fs.readFileSync(BASE + 'guides/usb-mics.html', 'utf8')));
ck('ES: 148 dB "empatado"', /empatado con el Samson Q2U/.test(fs.readFileSync(BASE + 'guides/usb-mics_es.html', 'utf8')));

console.log('\n=== D. Regla 4/4 en las 10 columnas ===');
const g = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8')).find(x => x.id === 'usb-mics');
g.verdictProsCons.forEach(v => {
  const ok = v.pros.length >= 4 && v.cons.length >= 4 && v.pros_es.length === v.pros.length && v.cons_es.length === v.cons.length;
  ck(v.name, ok, v.pros.length + '/' + v.cons.length);
});

console.log('\n' + (fail === 0 ? 'TODAS LAS COMPROBACIONES OK' : 'FALLOS: ' + fail));
process.exit(fail === 0 ? 0 : 1);