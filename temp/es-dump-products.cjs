const fs = require('fs');
const path = require('path');
const p = require('../data/products.json');

const OUT = 'C:/Users/Daniel/AppData/Local/Temp/opencode/es-products';
fs.mkdirSync(OUT, { recursive: true });

let index = [];
p.forEach((prod, i) => {
  if (!prod || typeof prod !== 'object') return;
  const lines = [];
  function collect(x, pr) {
    if (x === null || x === undefined) return;
    if (typeof x === 'string') {
      if (pr.endsWith('_es')) lines.push('[' + i + ']' + (pr ? '.' + pr : '') + ' || ' + x);
      return;
    }
    if (Array.isArray(x)) { x.forEach((v, j) => collect(v, pr + '[' + j + ']')); return; }
    if (typeof x === 'object') { Object.keys(x).forEach(k => collect(x[k], pr ? pr + '.' + k : k)); return; }
  }
  collect(prod, '');
  if (lines.length === 0) return;
  const id = prod.id || prod.name || ('product-' + i);
  const file = path.join(OUT, 'p-' + i + '.txt');
  fs.writeFileSync(file, lines.join('\n') + '\n', 'utf8');
  index.push('p-' + i + ' :: ' + id);
  const wc = lines.join(' ').split(/\s+/).length;
  console.log('p-' + i + ' :: ' + id + ' (' + lines.length + ' ES strings, ' + wc + ' words)');
});

fs.writeFileSync(path.join(OUT, '_INDEX.txt'), index.join('\n'), 'utf8');
console.log('TOTAL PRODUCTS:', p.length);