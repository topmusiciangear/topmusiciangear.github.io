const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const s = fs.readFileSync(B + 'build-guides.js', 'utf8');
const ini = s.indexOf('const TEST_SHOP_BTN = {');
const mapa = new Function('return ' + s.slice(ini + 'const TEST_SHOP_BTN = '.length, s.indexOf('\n};', ini) + 2))();

[684, 19, 20].forEach(id => {
  const x = p.find(y => y.id === id);
  const cfg = mapa[id];
  const tiendas = Object.keys(x.stores || {});
  const conPrecio = cfg && cfg.prices ? Object.keys(cfg.prices) : [];
  const sinPrecio = tiendas.filter(k => !conPrecio.includes(k));
  console.log('\n=== ' + id + '  ' + x.title + ' ===');
  console.log('  tiendas : ' + tiendas.join(', '));
  console.log('  precios : ' + (conPrecio.length ? conPrecio.map(k => k + ' ' + cfg.prices[k]).join(' | ') : 'NINGUNO'));
  console.log('  oos     : ' + JSON.stringify((cfg && cfg.oos) || []));
  console.log('  na      : ' + JSON.stringify((cfg && cfg.na) || []));
  console.log('  ' + (sinPrecio.length ? 'FALTA PRECIO en: ' + sinPrecio.join(', ') : 'todas las tiendas con precio'));
});

// en la pagina
const d = fs.readFileSync(B + 'guides/starter-studio_es.html', 'utf8');
console.log('\n=== filas en la pagina ES ===');
[684, 19].forEach(id => {
  const m = d.indexOf('openReviewModal(' + id + ')');
  const seg = d.slice(m, m + 20000);
  const filas = [...seg.matchAll(/<a [^>]*data-store="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)];
  console.log('\n  id ' + id + ' (' + filas.length + ' filas)');
  filas.forEach(x => {
    const t = x[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    console.log('    ' + x[1].padEnd(11) + (/background:#262626/.test(x[0]) ? '[gris] ' : '[precio]') + t.slice(0, 42));
  });
});
