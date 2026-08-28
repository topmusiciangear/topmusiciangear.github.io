var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

var fixes = 0;
g.forEach(function(guide){
  (guide.sections||[]).forEach(function(s,i){
    if(s.content_es){
      var orig = s.content_es;
      s.content_es = s.content_es.replace(/Precio: \| Suena como: ([^(]+)\(\+\)/g, 'Suena como: $1').trim();
      s.content_es = s.content_es.replace(/Precio: \| Suena como: ([^<]+)/g, 'Suena como: $1').trim();
      s.content_es = s.content_es.replace(/Precio: \| <strong>Suena como: ([^(]+)\(\+\)<\/strong>/g, '<strong>Suena como: $1</strong>').trim();
      s.content_es = s.content_es.replace(/Precio: \| <strong>Suena como: ([^<]+)<\/strong>/g, '<strong>Suena como: $1</strong>').trim();
      s.content_es = s.content_es.replace(/<strong>Precio: \| Suena como: ([^(]+)\(\+\)<\/strong>/g, '<strong>Suena como: $1</strong>').trim();
      s.content_es = s.content_es.replace(/<strong>Precio: \| Suena como: ([^<]+)<\/strong>/g, '<strong>Suena como: $1</strong>').trim();
      if(s.content_es !== orig) fixes++;
    }
  });
});

console.log('Fixed ' + fixes + ' sections');
fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
