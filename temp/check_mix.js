var ps=require('../data/products.json');
['Tascam Model 12','Behringer X32 Compact','Korg SoundLink MW-1608','Allen & Heath CQ-18T','Midas M32R LIVE','M32R','Blue Yeti USB Microphone','AKG K371'].forEach(function(nm){
  var p=ps.find(function(x){return x.title===nm||x.title_es===nm;});
  console.log('"'+nm+'" -> '+(p?('id '+p.id+' img='+(p.img||'NONE').slice(0,50)+' stores='+Object.keys(p.stores||{}).join(',')):'NO EXACT MATCH'));
});
var fs=require('fs');
var src=fs.readFileSync('../build-guides.js','utf8');
[518,57].forEach(function(id){
  var i=src.indexOf('\n  '+id+': {');
  console.log('TEST '+id+': '+(i>-1?'present':'ABSENT'));
});
