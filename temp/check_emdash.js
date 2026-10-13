var fs=require('fs');
var d=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var g=d.find(function(x){return x.id==='stream-controllers';});
g.sections.forEach(function(s,i){
  if(s.content_es){
    var idx=s.content_es.indexOf(' — ');
    if(idx>-1){
      console.log('Section',i,'has em dash:',s.content_es.slice(idx-30,idx+30));
    }
  }
});