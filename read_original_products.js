const fs = require('fs');
var buf = fs.readFileSync('/tmp/products_original.json');
// Remove BOM if present
var str = buf.toString('utf16le');
if (str.charCodeAt(0) === 0xFEFF) str = str.slice(1);
var p = JSON.parse(str);
var p53 = p.find(function(x){return x.id === 53;});
var p55 = p.find(function(x){return x.id === 55;});
console.log('Product 53:', p53 ? p53.title : 'NOT FOUND');
console.log('Product 55:', p55 ? p55.title : 'NOT FOUND');
fs.writeFileSync('/tmp/products_original_utf8.json', JSON.stringify(p, null, 2), 'utf8');
console.log('Saved as UTF-8');