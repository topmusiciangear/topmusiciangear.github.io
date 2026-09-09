var fs = require('fs');
var path = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
var g = JSON.parse(fs.readFileSync(path, 'utf8'));
var x = g.find(function (y) { return y.id === 'best-monitors-for-small-rooms'; });
x.conclusion = x.conclusion.replace(/KRK Rokit 7 G5 \( each\) adds/, 'KRK Rokit 7 G5 (around $538 a pair) adds');
fs.writeFileSync(path, JSON.stringify(g, null, 2), 'utf8');
var c = JSON.stringify(g);
['( each)', '( a pair)', '(el par)', '( el par)', '( per pair)', '( cada uno)', '( por par)', '(each)', '(a pair)', '(per pair)'].forEach(function (pt) { if (c.indexOf(pt) >= 0) console.log('REMAIN ' + pt); });
console.log('done');