var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
var guide = g.find(function(x) { return x.id === 'beat-making'; });
guide.sections.forEach(function(s, i) {
  var h = s.heading || '(empty)';
  var he = s.heading_es || '(empty)';
  var c = (s.content || '').substring(0, 50);
  var ce = (s.content_es || '').substring(0, 50);
  console.log('Section ' + i + ': heading=' + h.substring(0, 50) + ' | heading_es=' + he.substring(0, 50));
  console.log('  content=' + c);
  console.log('  content_es=' + ce);
  console.log('  products=' + JSON.stringify(s.products));
  console.log('');
});
