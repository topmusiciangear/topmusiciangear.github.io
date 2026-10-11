var fs = require('fs');
var guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
var g = guides.find(function (x) { return x.id === 'best-condenser-mics'; });
var ci = g.productTable.columns.findIndex(function (c) { return c.title.indexOf('NT1 Signature') >= 0; });
var row = g.productTable.rows.find(function (r) { return /max spl/i.test(r.label); });
console.log('before: ' + JSON.stringify(row.values[ci]));
row.values[ci] = { value: '142 dB', value_es: '142 dB' };
fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2));
console.log('NT1 Signature Max SPL -> 142 dB');
