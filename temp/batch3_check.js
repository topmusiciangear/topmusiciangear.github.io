const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
[1012, 1010, 1009].forEach(id => {
  const p = products.find(x => x.id === id);
  console.log('=== ' + id + ' ' + p.brand + ' | ' + p.title + ' | price=' + p.price);
  console.log('  img: ' + p.img);
  console.log('  image: ' + p.image);
  console.log('  stores: ' + Object.keys(p.stores || {}).join(', '));
  const m = bg.match(new RegExp('(?:^|\\n)\\s*' + id + ': \\{prices:\\{[^\\n]*'));
  console.log('  TEST: ' + (m ? m[0].replace(/^\n/, '').trim() : 'SIN ENTRADA'));
});
const imgs = [
  'https://r2.gear4music.com/media/86/862628/1200/preview.jpg',
  'https://r2.gear4music.com/media/119/1193109/1200/preview.jpg',
  'https://banners.pluginboutique.com/py7p3xx6rk4ry7i10ywnp66ayqnh'
];
Promise.all(imgs.map(u => fetch(u, { method: 'HEAD' })
  .then(r => u.slice(0, 58) + ' -> ' + r.status + ' | ' + r.headers.get('content-type'))
  .catch(e => u.slice(0, 58) + ' -> ERROR ' + e.message)))
  .then(rs => rs.forEach(x => console.log('\n' + x)));