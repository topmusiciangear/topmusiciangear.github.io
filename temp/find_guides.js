var fs = require('fs');
var d = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
d.forEach(function(g) {
  if (/budget.*interface|studio.*monitor.*small/i.test(g.id)) {
    console.log('---');
    console.log('id: ' + g.id);
    console.log('title: ' + g.title);
    console.log('title_es: ' + g.title_es);
    console.log('tag: ' + g.titleTag);
    console.log('tag_es: ' + g.titleTag_es);
  }
});