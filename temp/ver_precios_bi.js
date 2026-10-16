const fs = require('fs');
const p = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
['SSL 2+ MKII', 'Volt 276', 'Volt 2', 'Audient iD14', 'Scarlett 2i2'].forEach(n => {
  const x = p.find(y => (y.title || '').includes(n));
  console.log((x ? x.id : '??') + '  ' + (x ? x.title : n) + '  -> $' + (x ? x.price : '?'));
});
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'best-interface');
const t = JSON.stringify(s);
console.log('\nlinks en sec0:');
[...t.matchAll(/<a[^>]*href="([^"]+)"[^>]*>([^<]{0,80})/g)].forEach(m => console.log('  ' + m[1].slice(0, 60) + '  ::  ' + m[2].slice(0, 60)));
console.log('\nconversion bits en sec3: ' + (t.match(/conversión de \d+ bits/) || []).length);
[...new Set(t.match(/.{0,40}conversión de \d+ bits.{0,20}/g) || [])].forEach(m => console.log('  ...' + m.replace(/<[^>]+>/g, ' ').trim().slice(0, 100)));
