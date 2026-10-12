var guides = JSON.parse(require('fs').readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
var g = guides.filter(function (x) { return (x.slug || x.id) === 'portable-interfaces'; })[0];
console.log(JSON.stringify(g.sections[1].content_es).slice(0, 900));
