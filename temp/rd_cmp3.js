var guides = JSON.parse(require('fs').readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
var g = guides.filter(function (x) { return (x.slug || x.id) === 'compact-rhythm-devices'; })[0];
for (var i = 1; i <= 7; i++) {
  console.log('### Q' + i + ': ' + g.featuredSnippet['faq_q' + i + '_es']);
  console.log(g.featuredSnippet['faq_a' + i + '_es']);
  console.log('');
}
