const fs = require('fs');
const vm = require('vm');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const code = fs.readFileSync(B + 'js/shop-buttons.js', 'utf8');
const ctx = { window: {}, console, encodeURIComponent, setTimeout };
vm.createContext(ctx);
vm.runInContext(code + '\n;this.__g = getResolvedStores;', ctx);
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

function consulta(url) {
  const d = decodeURIComponent(url);
  const m = d.match(/[?&](q|query|SearchText|search_query)=([^&]+)/);
  return m ? m[2].replace(/\+/g, ' ') : '(sin query)';
}

let total = 0, bien = 0, mal = [];
products.forEach(p => {
  const res = ctx.__g(p);
  Object.keys(res).forEach(k => {
    const u = res[k];
    const esBusqueda = /search|prodsearch|\/s\?k=|marketplace\?query/.test(decodeURIComponent(u));
    if (!esBusqueda) return;
    total++;
    const q = consulta(u);
    const esperado = p.title.replace(/\s*\((each|pair|set|2 headsets?)\)\s*$/i, '').trim();
    const ok = q === esperado || decodeURIComponent(q) === esperado;
    if (ok) bien++;
    else mal.push(p.id + ' ' + p.title + ' -> ' + k + ': "' + q + '"');
  });
});
console.log('buscadores generados en todo el catalogo: ' + total);
console.log('con el nombre EXACTO del producto: ' + bien);
console.log('discrepancias: ' + mal.length);
mal.slice(0, 15).forEach(x => console.log('   ' + x));