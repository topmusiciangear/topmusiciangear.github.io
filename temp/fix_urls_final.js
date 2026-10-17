const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const pp = B + 'data/products.json';
const products = JSON.parse(fs.readFileSync(pp, 'utf8'));
const searchTerm = t => { const s = String(t || '').trim(); const c = s.replace(/\s*\((each|pair|set|2 headsets?)\)\s*$/i, '').trim(); return c || s; };
const PARAM = /([?&](?:search_query|SearchText)=)([^"'&\s]+)/g;

let n = 0;
products.forEach(p => {
  const esperado = searchTerm(p.title);
  Object.keys(p.stores || {}).forEach(k => {
    const u = p.stores[k];
    if (!PARAM.test(u)) { PARAM.lastIndex = 0; return; }
    PARAM.lastIndex = 0;
    const nuevo = u.replace(PARAM, (todo, pre, val) => {
      const antes = decodeURIComponent(val.replace(/\+/g, ' '));
      if (antes === esperado) return todo;
      n++;
      console.log('  ' + p.id + ' ' + k + ': "' + antes + '" -> "' + esperado + '"');
      return pre + encodeURIComponent(esperado).replace(/%20/g, '+');
    });
    p.stores[k] = nuevo;
  });
});
fs.writeFileSync(pp, JSON.stringify(products, null, 2), 'utf8');
console.log('\nproducts.json: ' + n + ' parametros search_query/SearchText normalizados');

// ahora build-guides.js (entradas multilinea): se procesa el bloque completo
const bgPath = B + 'build-guides.js';
let bg = fs.readFileSync(bgPath, 'utf8');
let m2 = 0;
// localiza cada entrada por su id (puede ocupar varias lineas hasta la llave de cierre)
bg = bg.replace(/(\n\s*)(\d+): (\{[\s\S]*?\n\s*\}),?\n/g, (todo, sp, id, cuerpo) => {
  const p = products.find(x => x.id === Number(id));
  if (!p) return todo;
  const esperado = searchTerm(p.title);
  const nuevo = cuerpo.replace(/([?&](?:search_query|SearchText)=)([^"'&\s\\]+)/g, (t2, pre, val) => {
    const antes = decodeURIComponent(val.replace(/\+/g, ' '));
    if (antes === esperado) return t2;
    m2++;
    console.log('  mapa ' + id + ': "' + antes + '" -> "' + esperado + '"');
    return pre + encodeURIComponent(esperado).replace(/%20/g, '+');
  });
  return sp + id + ': ' + nuevo + ',\n';
});
fs.writeFileSync(bgPath, bg, 'utf8');
console.log('build-guides.js: ' + m2 + ' parametros normalizados');