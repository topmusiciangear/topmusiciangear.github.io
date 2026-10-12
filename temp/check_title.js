var fs = require('fs');
var d = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
var g = d.find(function (x) { return x.id === 'best-stage-keyboards'; });
console.log('title_en: ' + g.title);
console.log('title_es: ' + g.title_es);
console.log('tag_en: ' + g.titleTag);
console.log('tag_es: ' + g.titleTag_es);
