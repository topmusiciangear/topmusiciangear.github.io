// ¿Se esta leyendo bien cfg.na para el 684?
const fs = require('fs');
const src = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
const ini = src.indexOf('const TEST_SHOP_BTN = {');
const fin = src.indexOf('\n};', ini);
const bloque = src.slice(ini, fin);

// evaluar el mapa
let cfg;
try {
  cfg = new Function('return (' + bloque.replace('const TEST_SHOP_BTN =', '').trim().replace(/;$/, '') + ')')()[684];
} catch (e) {
  console.log('no se pudo evaluar el mapa: ' + e.message);
  process.exit(1);
}
console.log('cfg[684] = ' + JSON.stringify(cfg, null, 1));
console.log('\nna: ' + JSON.stringify(cfg.na));
console.log('indice de zzounds en na: ' + ((cfg.na || []).indexOf('zzounds')));

// comparar con un producto que ya funcionaba
[344, 648].forEach(id => {
  let c;
  try { c = new Function('return (' + bloque.replace('const TEST_SHOP_BTN =', '').trim().replace(/;$/, '') + ')')()[id]; } catch (e) { return; }
  console.log('\ncfg[' + id + '].na = ' + JSON.stringify(c && c.na) + '  -> indice zzounds: ' + ((c && c.na || []).indexOf('zzounds')));
});

// como se ve en el HTML de una guia donde 344 si es na
const d = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/budget-mics_es.html', 'utf8');
const m = d.indexOf('openReviewModal(344)');
if (m > -1) {
  const seg = d.slice(m, m + 20000);
  const filas = [...seg.matchAll(/<a [^>]*data-store="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)];
  console.log('\n=== filas de la tarjeta del 344 (budget-mics) ===');
  filas.slice(0, 7).forEach(x => {
    const t = x[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const gris = /#262626/.test(x[0]);
    console.log('  ' + x[1].padEnd(12) + (gris ? '[gris]' : '[     ]') + ' ' + t.slice(0, 50));
  });
} else console.log('\nid 344 no encontrado en budget-mics');
