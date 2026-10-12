var fs=require('fs');
var d=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var ids=d.map(function(g){return g.id}).filter(function(id){return /midi|keyboard|piano|synth/i.test(id)});
console.log('keyboard-related guide ids: '+ids.join(', '));
var m=d.find(function(x){return x.id==='midi-controllers'});
if(m){
  console.log('== midi-controllers ==');
  console.log('title: '+m.title+' | tag: '+m.titleTag);
  console.log('title_es: '+m.title_es);
  console.log('featured: '+JSON.stringify(m.featuredProducts));
  console.log('table: '+(m.productTable?m.productTable.columns.map(function(c){return c.title}).join(' | '):'(none)'));
  console.log('intro: '+(m.intro||'').slice(0,400));
}
// who links to midi-keyboards?
var linkers=d.filter(function(g){return JSON.stringify(g).indexOf('midi-keyboards')>-1}).map(function(g){return g.id});
console.log('guides mentioning midi-keyboards: '+linkers.join(', '));
