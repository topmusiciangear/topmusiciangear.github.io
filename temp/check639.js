const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const b = fs.readFileSync(BASE + 'build-guides.js', 'utf8');
const i = b.indexOf('\n    639:');
console.log('=== entrada 639 completa ===');
console.log(b.slice(i, i + 330));

const P = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
console.log('\n=== imagenes sucias ===');
arr.filter(p => /\?_gl=|_gcl_aw|utm_|gclid=/.test(p.img || '')).forEach(p => {
  const limpia = p.img.split('?')[0];
  console.log('\nid ' + p.id + '  ' + p.title);
  console.log('  sucia : ' + p.img.slice(0, 150) + '...');
  console.log('  limpia: ' + limpia);
});