var fs=require('fs');
var d=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var spe=d.find(function(x){return x.id==='midi-keyboards'});
[6,7].forEach(function(i){
  var s=spe.sections[i];
  console.log('===== SEC'+i+': '+s.heading+' | products:'+(s.products||[]).join(','));
  console.log('EN: '+s.content);
  console.log('ES: '+(s.content_es||'').slice(0,1500));
});
var hub=d.find(function(x){return x.id==='best-keyboard'});
console.log('===== HUB SEC3 sample =====');
console.log('heading: '+hub.sections[3].heading+' / '+hub.sections[3].heading_es);
console.log('EN: '+hub.sections[3].content);
