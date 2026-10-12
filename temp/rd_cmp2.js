var guides = JSON.parse(require('fs').readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
var g = guides.filter(function (x) { return (x.slug || x.id) === 'compact-rhythm-devices'; })[0];
g.sections.forEach(function (s, i) {
  console.log('### SEC' + i + ' ###\n' + s.content_es + '\n');
});
