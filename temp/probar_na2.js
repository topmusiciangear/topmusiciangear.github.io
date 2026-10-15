const fs = require('fs');
const src = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
const ini = src.indexOf('const TEST_SHOP_BTN = {');
const fin = src.indexOf('\n};', ini);
// desde la llave de apertura hasta la llave de cierre
const cuerpo = src.slice(ini + 'const TEST_SHOP_BTN = '.length, fin + 2);
let mapa;
try {
  mapa = new Function('return ' + cuerpo)();
} catch (e) {
  console.log('error evaluando: ' + e.message);
  console.log('ultimos 120 chars: ' + JSON.stringify(cuerpo.slice(-120)));
  process.exit(1);
}
console.log('entradas en el mapa: ' + Object.keys(mapa).length);

[684, 344, 648].forEach(id => {
  const c = mapa[id];
  console.log('\ncfg[' + id + '] = ' + (c ? JSON.stringify(c).slice(0, 200) : 'NO EXISTE'));
  if (c) console.log('   na: ' + JSON.stringify(c.na) + '  -> indice zzounds: ' + ((c.na || []).indexOf('zzounds')));
});

// ver el HTML del 344
const d = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/budget-mics_es.html', 'utf8');
const m = d.indexOf('openReviewModal(344)');
console.log('\n=== tarjeta del 344 en budget-mics ===');
if (m > -1) {
  const seg = d.slice(m, m + 20000);
  const filas = [...seg.matchAll(/<a [^>]*data-store="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)];
  filas.slice(0, 6).forEach(x => {
    const t = x[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    console.log('  ' + x[1].padEnd(12) + (/background:#262626/.test(x[0]) ? '[gris]' : '[     ]') + ' ' + t.slice(0, 52));
  });
} else console.log('  id 344 no esta en budget-mics');
