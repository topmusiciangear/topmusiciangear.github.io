var fs=require('fs');
var d=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
['slg200s-vs-gs-mini','best-bass-home-office'].forEach(function(id){
  var g=d.find(function(x){return x.id===id});
  if(!g){ console.log(id+': NOT FOUND'); return; }
  console.log('== '+id+' ==');
  console.log(' title: '+g.title);
  console.log(' titleTag: '+g.titleTag);
  console.log(' title_es: '+g.title_es);
  console.log(' titleTag_es: '+g.titleTag_es);
});
