var guides = JSON.parse(require('fs').readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
var g = guides.filter(function (x) { return (x.slug || x.id) === 'best-drum-machine'; })[0];
g.sections.forEach(function (s, i) {
  console.log('### SEC' + i + ' H: ' + s.heading_es);
  console.log(s.content_es);
  console.log('');
});
