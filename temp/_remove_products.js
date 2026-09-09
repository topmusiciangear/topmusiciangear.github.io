var fs = require('fs');
var p = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
var remove = [66, 67, 101, 125];
var out = p.filter(x => remove.indexOf(x.id) === -1);
if (out.length !== p.length - remove.length) throw new Error('some ids not found');
fs.writeFileSync('data/products.json', JSON.stringify(out, null, 2) + '\n', 'utf8');
console.log('products.json: removed', remove.join(','), '->', out.length, 'products');