const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
p.filter(x => (x.title || '').includes('Q9U')).forEach(x => console.log('id=' + x.id + '  "' + x.title + '"'));
