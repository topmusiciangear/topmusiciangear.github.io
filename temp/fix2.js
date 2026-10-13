var fs=require('fs');
var d=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var ps=JSON.parse(fs.readFileSync('data/products.json','utf8'));
// 1. ES fix U87 Type
var g=d.find(function(x){return x.id==='best-condenser-mics'});
var row=g.productTable.rows.find(function(r){return r.label==='Type';});
row.values[7].value_es='Condensador, Multi-patrón';
console.log('ES fixed: '+row.values[7].value_es);
fs.writeFileSync('data/guides.json',JSON.stringify(d,null,2));
// 2. check catalog titles for condenser table names
['Audio-Technica AT2020','Rode NT1 Signature Series','Lewitt LCT 440 PURE','Neumann TLM 102','Neumann TLM 103','AKG C414 XLII','Warm Audio WA-8000','Neumann U 87 Ai'].forEach(function(nm){
  var p=ps.find(function(x){return x.title===nm||x.title_es===nm});
  console.log('"'+nm+'" -> '+(p?('id '+p.id+' "'+p.title+'"'):'NO MATCH'));
});
// 3. 639 title
var m639=ps.find(function(x){return x.id===639});
console.log('639: '+(m639?m639.title:'MISSING'));
// 4. active-vs-passive-pa
var avp=d.find(function(x){return x.id==='active-vs-passive-pa'});
console.log('avp title: '+avp.title);
console.log('avp featured: '+JSON.stringify(avp.featuredProducts));
console.log('avp vpc count: '+(avp.verdictProsCons||[]).length);
// 5. Yeti + K371 in catalog?
[196,297].forEach(function(id){var p=ps.find(function(x){return x.id===id});console.log(id+': '+(p?p.title:'MISSING'));});
var yeti=ps.filter(function(x){return /yeti/i.test(x.title)});
console.log('yeti search: '+yeti.map(function(p){return p.id+' '+p.title;}).join(' | '));
var k371=ps.filter(function(x){return /k371/i.test(x.title)});
console.log('k371 search: '+k371.map(function(p){return p.id+' '+p.title;}).join(' | '));
