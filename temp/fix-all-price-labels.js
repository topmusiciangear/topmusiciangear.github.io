var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

var fixes = 0;
g.forEach(function(guide){
  (guide.sections||[]).forEach(function(s,i){
    // Fix EN
    if(s.content){
      var orig = s.content;
      s.content = s.content.replace(/<strong>Price:\s*<\/strong>\s*/g, '').trim();
      if(s.content !== orig) fixes++;
    }
    // Fix ES
    if(s.content_es){
      var orig = s.content_es;
      s.content_es = s.content_es.replace(/<strong>Precio:\s*<\/strong>\s*/g, '').trim();
      if(s.content_es !== orig) fixes++;
    }
  });
});

console.log('Fixed ' + fixes + ' empty Price/Precio labels');
fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
