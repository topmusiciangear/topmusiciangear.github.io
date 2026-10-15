const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'starter-studio');

function buscar(k, etiqueta) {
  console.log('\n--- ' + etiqueta + ' ---');
  let n = 0;
  (function rec(o, r) {
    if (typeof o === 'string') {
      if (!o.includes(k)) return;
      [...o.matchAll(new RegExp('.{0,150}' + k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '.{0,150}', 'g'))].forEach(m => {
        n++; console.log('  [' + r + ']\n     ...' + m[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() + '...');
      });
      return;
    }
    if (Array.isArray(o)) return o.forEach((v, i) => rec(v, r + '[' + i + ']'));
    if (o && typeof o === 'object') Object.keys(o).forEach(kk => rec(o[kk], r + '.' + kk));
  })(s, '');
  if (!n) console.log('  (ninguno)');
}
buscar('3.000', 'micro de 3.000');
buscar('más silencioso que puedes comprar', '"el más silencioso que puedes comprar"');
