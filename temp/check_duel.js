var fs = require('fs');
var d = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
var g = d.find(function (x) { return x.id === 'nord-stage-4-vs-montage-m8x'; });
console.log('GUIDE BEFORE: ' + g.image);
var ps = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
var m = ps.find(function (x) { return x.id === 12; });
console.log('P12 BEFORE: ' + m.title + ' | ' + m.img);
