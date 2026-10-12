var fs = require('fs');
var guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
var g = guides.find(function (x) { return x.id === 'budget-mics'; });
var f = g.featuredSnippet;
var a = 'y desde la NT1 Signature para voces de estudio silenciosas';
if (f.text_es.indexOf(a) < 0) { console.log('NOT FOUND'); process.exit(1); }
f.text_es = f.text_es.split(a).join('y la NT1 Signature para voces de estudio silenciosas');
fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2));
console.log('snippet ES fixed');
