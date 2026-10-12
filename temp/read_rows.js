var fs=require('fs');
var d=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var g=d.find(function(x){return x.id==='best-mic-for-guitar-amps'});
g.productTable.rows.forEach(function(r){
  console.log('### '+r.label+' / '+r.label_es);
  r.values.forEach(function(v,i){console.log('  ['+i+'] '+v.value+' || '+v.value_es)});
});
console.log('--- featuredSnippet: '+JSON.stringify(g.featuredSnippet).slice(0,2000));
