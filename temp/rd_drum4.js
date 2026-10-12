var guides = JSON.parse(require('fs').readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
var g = guides.filter(function (x) { return (x.slug || x.id) === 'best-drum-machine'; })[0];
g.verdictProsCons.forEach(function (it, i) {
  console.log('### [' + i + '] ' + (it.product || it.title || ''));
  console.log('PROS_ES: ' + JSON.stringify(it.pros_es));
  console.log('CONS_ES: ' + JSON.stringify(it.cons_es));
});
