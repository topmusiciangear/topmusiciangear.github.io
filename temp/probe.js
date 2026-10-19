const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
['FP-30X', 'RP107', 'YDP-146', 'YDP-166', 'CLP-835', 'PX-S1100', 'FP-10', 'P-225']
  .forEach(q => {
    const h = p.filter(x => (x.title || '').includes(q) || (x.title_es || '').includes(q));
    console.log('\n"' + q + '" -> ' + h.length);
    h.forEach(x => console.log('   id=' + x.id + ' score=' + x.score + '  "' + x.title + '"'));
  });
