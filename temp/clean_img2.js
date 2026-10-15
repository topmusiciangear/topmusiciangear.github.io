const fs = require('fs');
const pf = 'C:/Users/Daniel/projects/topmusiciangear/data/products.json';
const P = JSON.parse(fs.readFileSync(pf, 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
const RE = /\?_gl=|_gcl_aw|utm_|gclid=/;
let n = 0;
arr.forEach(p => {
  Object.keys(p).forEach(k => {
    if (typeof p[k] === 'string' && RE.test(p[k]) && k !== 'img') {
      console.log('id ' + p.id + ' ' + p.title + '  campo "' + k + '":');
      console.log('   - ' + p[k].slice(0, 110));
      p[k] = p[k].split('?')[0];
      console.log('   + ' + p[k]);
      n++;
    }
  });
});
fs.writeFileSync(pf, JSON.stringify(P, null, 2), 'utf8');
console.log('\ncampos limpiados: ' + n);
let restos = 0;
(function w(v, r) {
  if (typeof v === 'string') { if (RE.test(v)) { restos++; console.log('   !! ' + r); } }
  else if (Array.isArray(v)) v.forEach((x, i) => w(x, r + '[' + i + ']'));
  else if (v && typeof v === 'object') Object.keys(v).forEach(k => w(v[k], r ? r + '.' + k : k));
})(arr, '');
console.log('restos en products.json: ' + restos);