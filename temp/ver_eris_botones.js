const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const d = fs.readFileSync(BASE + 'guides/best-monitors-for-small-rooms_es.html', 'utf8');

// 1) ¿tiene la tarjeta del Eris boton de comprar?
const i = d.indexOf('Eris Studio 5');
const ini = d.lastIndexOf('guide-product-card', i);
const frag = d.slice(ini, ini + 7000);
console.log('=== TARJETA DEL ERIS ===');
console.log('  shop-btn-primary: ' + (frag.match(/shop-btn-primary/g) || []).length);
console.log('  shop-more-list  : ' + (frag.match(/shop-more-list/g) || []).length);
console.log('  data-store      : ' + [...new Set((frag.match(/data-store="([^"]+)"/g) || []))].join(', '));
console.log('  data-price      : ' + (frag.match(/data-price=/g) || []).length);

// 2) el desplegable completo
const p = frag.indexOf('shop-more-list');
if (p > -1) {
  const seg = frag.slice(p - 200, p + 3000);
  const filas = [...seg.matchAll(/<a [^>]*data-store="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)];
  console.log('\n  filas del desplegable: ' + filas.length);
  filas.forEach(m => {
    const txt = m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    console.log('    ' + m[1].padEnd(12) + (/data-price=|data-pb-/.test(m[0]) ? '[precio] ' : '[      ] ') + txt.slice(0, 45));
  });
} else {
  console.log('\n  NO HAY DESPLEGABLE en la tarjeta');
  console.log('  (la tarjeta tiene ' + frag.length + ' chars)');
  // ver que hay
  const btns = [...frag.matchAll(/<(a|button)[^>]*class="([^"]*shop[^"]*)"[^>]*>/g)];
  console.log('  elementos shop: ' + btns.map(x => x[1] + '.' + x[2]).join(', '));
}

// 3) veredictos: 14 en el HTML vs 13 en el JSON
console.log('\n=== VEREDICTOS ===');
const nombres = [...d.matchAll(/<div class="verdict-product-name">([^<]+)<\/div>/g)].map(m => m[1].trim());
console.log('  en el HTML: ' + nombres.length);
const rep = nombres.filter((x, i) => nombres.indexOf(x) !== i);
console.log('  duplicados : ' + (rep.length ? rep.join(', ') : 'ninguno'));
nombres.forEach((n, i) => console.log('   [' + i + '] ' + n));
