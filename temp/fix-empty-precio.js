var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

var fixes = 0;
g.forEach(function(guide){
  (guide.sections||[]).forEach(function(s,i){
    if(s.content_es){
      var orig = s.content_es;
      // Remove empty <strong>Precio: </strong> entirely
      s.content_es = s.content_es.replace(/<strong>Precio:\s*<\/strong>\s*/g, '').trim();
      // Also remove if followed by a space or newline
      s.content_es = s.content_es.replace(/<strong>Precio:\s*<\/strong>/g, '').trim();
      if(s.content_es !== orig) fixes++;
    }
  });
});

console.log('Fixed ' + fixes + ' empty Precio labels');
fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
