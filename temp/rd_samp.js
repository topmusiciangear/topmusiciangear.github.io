var guides = JSON.parse(require('fs').readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
var g = guides.filter(function (x) { return (x.slug || x.id) === 'best-hardware-samplers'; })[0];
[6, 9].forEach(function (i) {
  var it = g.verdictProsCons[i];
  console.log('### [' + i + ']');
  console.log('PROS: ' + JSON.stringify(it.pros));
  console.log('CONS: ' + JSON.stringify(it.cons));
  console.log('CONS_ES: ' + JSON.stringify(it.cons_es));
});
console.log('products:', JSON.stringify(g.featuredProducts));
