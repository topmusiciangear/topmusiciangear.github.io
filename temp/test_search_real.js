const fs = require('fs');
const vm = require('vm');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const code = fs.readFileSync(B + 'js/shop-buttons.js', 'utf8');
const ctx = { window: {}, console, encodeURIComponent, setTimeout };
vm.createContext(ctx);
vm.runInContext(code + '\n;this.__getResolvedStores = getResolvedStores; this.__searchTerm = searchTerm;', ctx);
const grs = ctx.__getResolvedStores;
const st = ctx.__searchTerm;

// producto real del catalogo: solo tiene PB
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const genome = products.find(p => p.id === 1020);
const res = grs(genome);
console.log('=== GENOME (solo tiene Plugin Boutique) ===');
Object.keys(res).forEach(k => {
  const u = decodeURIComponent(res[k]);
  console.log('  ' + k.padEnd(14) + ': ' + u.slice(0, 120));
});
console.log('\nnombre exacto en TODAS las búsquedas: ' +
  Object.keys(res).every(k => decodeURIComponent(res[k]).indexOf('Two Notes Audio Engineering GENOME') > -1 || res[k].indexOf('pluginboutique.com/product') > -1));

// casos con sufijo de unidad
console.log('\n=== sufijo de unidad ===');
[[646, 'IsoAcoustics ISO-200 (Pair)'], [59, 'K&M 26722 Monitor Stands (Each)']].forEach(([id, nombre]) => {
  const r = grs({ id: id, title: nombre, category: 'accessories', stores: {} });
  const q = r.gear4music ? decodeURIComponent(r.gear4music) : '(sin g4m)';
  console.log('  ' + id + ' "' + nombre + '" -> ' + q.slice(0, 100));
  console.log('     unidad retirada: ' + (q.indexOf('(Pair)') < 0 && q.indexOf('(Each)') < 0 ? 'si' : 'NO'));
});

// un producto con tiendas reales: su URL debe seguir siendo la de la tienda, no una búsqueda
console.log('\n=== con tienda real (no debe cambiar a búsqueda) ===');
const amp = products.find(p => p.id === 1019);
const ra = grs(amp);
console.log('  G4M: ' + decodeURIComponent(ra.gear4music || '(sin g4m)').slice(0, 100));
console.log('  PB : ' + decodeURIComponent(ra.pluginboutique || '').slice(0, 90));