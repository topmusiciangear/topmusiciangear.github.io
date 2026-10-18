const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';

const sb = fs.readFileSync(B + 'js/shop-buttons.js', 'utf8');
const m = sb.match(/amazon\.com\/dp\/[A-Z0-9]{10}[^"\s]*/g) || [];
const sin = m.filter(u => u.indexOf('tag=') < 0);
console.log('=== shop-buttons.js ===');
console.log('  enlaces /dp/: ' + m.length + ' | sin tag: ' + sin.length);
sin.slice(0, 8).forEach(u => console.log('    ! ' + u));

const html = fs.readFileSync(B + 'guides/best-home-studio-speakers.html', 'utf8')
  + fs.readFileSync(B + 'guides/best-home-studio-speakers_es.html', 'utf8');
const hm = html.match(/https:\/\/www\.amazon\.com\/dp\/[A-Z0-9]{10}[^"\s<]*/g) || [];
const hsin = hm.filter(u => u.indexOf('tag=topmusicg-20') < 0);
console.log('\n=== HTML de la guia ===');
console.log('  enlaces Amazon: ' + hm.length + ' | sin tag: ' + hsin.length);
console.log('  ASINs presentes: ' + [...new Set(hm.map(u => (u.match(/\/dp\/([A-Z0-9]{10})/) || [])[1]))].sort().join(', '));

const prods = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
console.log('\n=== TIENDAS DE LOS 6 ===');
[1042, 1043, 1046, 1047, 1048, 1049].forEach(id => {
  const p = prods.find(x => x.id === id);
  const k = Object.keys(p.stores || {});
  console.log('  ' + id + ' ' + p.title.padEnd(28) + k.length + ' tiendas  ' + (k.includes('amazon') ? 'Amazon SI' : 'Amazon NO'));
});
