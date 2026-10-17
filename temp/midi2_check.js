const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
[1008, 1007].forEach(id => {
  const p = products.find(x => x.id === id);
  console.log('=== ' + id + ' ' + p.brand + ' | ' + p.title + ' | price(catalogo)=' + p.price);
  console.log('  img: ' + p.img);
  console.log('  image: ' + p.image);
  console.log('  stores: ' + Object.keys(p.stores || {}).join(', '));
  const m = bg.match(new RegExp('(?:^|\\n)\\s*' + id + ': \\{prices:\\{[^\\n]*'));
  console.log('  TEST: ' + (m ? m[0].replace(/^\n/, '').trim() : 'SIN ENTRADA'));
});
Promise.all([
  'https://banners.pluginboutique.com/efszazxwbxiip97tscava5iaz4lk',
  'https://banners.pluginboutique.com/msjrldeol87ro2vg58we3uwyvitf'
].map(u => fetch(u, { method: 'HEAD' })
  .then(r => u.slice(24, 48) + '... -> ' + r.status + ' | ' + r.headers.get('content-type'))
  .catch(e => u + ' -> ERROR ' + e.message)))
  .then(rs => rs.forEach(x => console.log('\n' + x)));