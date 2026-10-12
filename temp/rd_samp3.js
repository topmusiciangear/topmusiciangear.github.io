var guides = JSON.parse(require('fs').readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
var g = guides.filter(function (x) { return (x.slug || x.id) === 'best-hardware-samplers'; })[0];
[5, 6, 7].forEach(function (i) {
  console.log('### SEC' + i + ' ###\n' + g.sections[i].content_es + '\n');
});
[4, 5, 6].forEach(function (i) {
  var it = g.verdictProsCons[i];
  console.log('### V[' + i + '] ' + it.name + ' ###');
  console.log('PROS_ES: ' + JSON.stringify(it.pros_es));
  console.log('CONS_ES: ' + JSON.stringify(it.cons_es));
});
