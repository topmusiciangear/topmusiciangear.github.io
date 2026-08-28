var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var b = g.find(function(x){return x.id==='beginner-bass-guitars'});

b.sections.forEach(function(s,i){
  if(s.content_es){
    var orig = s.content_es;
    s.content_es = s.content_es.replace(/Precio: \| Suena como: ([^(]+)\(\+\)/g, 'Suena como: $1').trim();
    s.content_es = s.content_es.replace(/Precio: \| Suena como: ([^<]+)/g, 'Suena como: $1').trim();
    s.content_es = s.content_es.replace(/vintage de \?/g, 'vintage?');
    s.content_es = s.content_es.replace(/en bajos que \+/g, 'en bajos que cuestan el doble o el triple');
    s.content_es = s.content_es.replace(/que \+\./g, 'que cuestan el doble o el triple.');
    if(s.content_es !== orig) console.log('Fixed sec' + (i+1) + ' content_es');
  }
});

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('Done');
