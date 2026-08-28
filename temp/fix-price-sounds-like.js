var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

var fixes = 0;
g.forEach(function(guide){
  (guide.sections||[]).forEach(function(s,i){
    if(s.content){
      var orig = s.content;
      // Fix "Price: | Sounds like: X (+)" -> "Sounds like: X"
      s.content = s.content.replace(/<strong>Price: \| Sounds like: ([^(]+)\(\+\)<\/strong>/g, '<strong>Sounds like: $1</strong>').trim();
      s.content = s.content.replace(/<strong>Price: \| Sounds like: ([^<]+)<\/strong>/g, '<strong>Sounds like: $1</strong>').trim();
      s.content = s.content.replace(/Price: \| Sounds like: ([^(]+)\(\+\)/g, 'Sounds like: $1').trim();
      // Remove empty Price labels
      s.content = s.content.replace(/<strong>Price:\s*<\/strong>\s*/g, '').trim();
      if(s.content !== orig) fixes++;
    }
    if(s.content_es){
      var orig = s.content_es;
      s.content_es = s.content_es.replace(/<strong>Precio: \| Suena como: ([^(]+)\(\+\)<\/strong>/g, '<strong>Suena como: $1</strong>').trim();
      s.content_es = s.content_es.replace(/<strong>Precio: \| Suena como: ([^<]+)<\/strong>/g, '<strong>Suena como: $1</strong>').trim();
      s.content_es = s.content_es.replace(/<strong>Precio:\s*<\/strong>\s*/g, '').trim();
      if(s.content_es !== orig) fixes++;
    }
  });
});

console.log('Fixed ' + fixes + ' sections');
fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
