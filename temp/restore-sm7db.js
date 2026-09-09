var fs = require('fs');
var data = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
var entry = JSON.parse(fs.readFileSync('temp/_sm7db_entry.json', 'utf8'))[0];
if (data.some(function (e) { return e && e.id === 321; })) throw new Error('id 321 already present');
data.push(entry);
fs.writeFileSync('data/products.json', JSON.stringify(data, null, 2) + '\n');
console.log('products.json:', data.length, 'entries; id 321', entry.title, 're-added');