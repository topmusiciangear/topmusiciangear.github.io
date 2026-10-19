const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
['X32 Rack', 'Ui24R', 'WING Rack', 'SQ-Rack', 'XR18', 'M32C', 'CQ-20B', 'SE 24R', 'Yamaha Revstar Element RSE20',
 'Squier Sonic Mustang', 'Enya Nova Go Sonic', 'Squier Debut Series Stratocaster'].forEach(n => {
  const h = products.filter(p => (p.title || '') === n || (p.title_es || '') === n
    || (p.title || '').includes(n) || (p.title_es || '').includes(n));
  console.log('\n"' + n + '" -> ' + h.length + ' hits');
  h.slice(0, 6).forEach(p => console.log('   id=' + p.id + '  "' + p.title + '"  title_es="' + (p.title_es || '') + '"  score=' + p.score));
});
