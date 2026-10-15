// Limpia los parametros de seguimiento de las imagenes de portada de las guias
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));
let n = 0;
guides.forEach(g => {
  if (g.image && /\?_gl=|_gcl_aw|utm_|gclid=/.test(g.image)) {
    const antes = g.image;
    g.image = g.image.split('?')[0];
    n++;
    console.log(g.id + ':');
    console.log('   - ' + antes.slice(0, 100) + '...');
    console.log('   + ' + g.image);
  }
});
fs.writeFileSync(gf, JSON.stringify(guides, null, 2), 'utf8');
console.log('\nportadas limpiadas: ' + n);

// comprobar que no queda nada sucio en ningun sitio del corpus
const RE = /\?_gl=|_gcl_aw|utm_|gclid=/;
let restos = 0;
(function w(v, r) {
  if (typeof v === 'string') { if (RE.test(v)) { restos++; console.log('   !! ' + r + ': ' + v.slice(0, 90)); } }
  else if (Array.isArray(v)) v.forEach((x, i) => w(x, r + '[' + i + ']'));
  else if (v && typeof v === 'object') Object.keys(v).forEach(k => w(v[k], r ? r + '.' + k : k));
})(guides, '');
const P = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
(function w(v, r) {
  if (typeof v === 'string') { if (RE.test(v)) { restos++; console.log('   !! products.' + r); } }
  else if (Array.isArray(v)) v.forEach((x, i) => w(x, r + '[' + i + ']'));
  else if (v && typeof v === 'object') Object.keys(v).forEach(k => w(v[k], r ? r + '.' + k : k));
})(arr, '');
console.log('restos de tracking en guides.json + products.json: ' + restos);