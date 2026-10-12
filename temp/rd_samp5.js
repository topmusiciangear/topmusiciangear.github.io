var guides = JSON.parse(require('fs').readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
var g = guides.filter(function (x) { return (x.slug || x.id) === 'best-hardware-samplers'; })[0];
console.log('CONC:\n' + g.conclusion);
console.log('\nVERD:\n' + g.verdict);
