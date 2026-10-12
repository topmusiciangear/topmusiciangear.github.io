var fs=require('fs');
var d=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var hub=d.find(function(x){return x.id==='best-keyboard'});
hub.sections.forEach(function(s,i){
  var hits=[];
  ['midi-keyboards','midi-keyboard'].forEach(function(q){
    if((s.content||'').indexOf(q)>-1) hits.push('EN:'+q);
    if((s.content_es||'').indexOf(q)>-1) hits.push('ES:'+q);
  });
  console.log(i+' '+s.heading.slice(0,60)+' => '+(hits.join(', ')||'clean'));
});
console.log('HUB intro links midi: '+hub.intro.indexOf('midi-keyboards'));
console.log('HUB verdictProsCons count: '+(hub.verdictProsCons||[]).length);
