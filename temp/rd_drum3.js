var guides = JSON.parse(require('fs').readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
var g = guides.filter(function (x) { return (x.slug || x.id) === 'best-drum-machine'; })[0];
for (var i = 1; i <= 5; i++) {
  console.log('### Q' + i + ': ' + g.featuredSnippet['faq_q' + i + '_es']);
  console.log(g.featuredSnippet['faq_a' + i + '_es']);
  console.log('');
}
console.log('### CURRENT EN Q1: ' + g.featuredSnippet.faq_q1);
