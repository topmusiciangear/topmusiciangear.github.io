var fs=require('fs');
var d=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var g=d.find(function(x){return x.id==='best-mic-for-guitar-amps'});
console.log('TITLE: '+g.title+' | TAG: '+g.titleTag);
console.log('TITLE_ES: '+g.title_es+' | TAG_ES: '+g.titleTag_es);
console.log('CAT: '+g.category);
console.log('FEATURED: '+JSON.stringify(g.featuredProducts));
console.log('SECTIONS:');
g.sections.forEach(function(s,i){console.log(' '+i+': '+s.heading+' | '+(s.products||[]).join(','));});
console.log('TABLE COLS: '+g.productTable.columns.map(function(c){return c.title}).join(' | '));
console.log('TABLE ROWS: '+g.productTable.rows.map(function(r){return r.label}).join(' | '));
var ps=JSON.parse(fs.readFileSync('data/products.json','utf8'));
['e906','i5','m 201','m201','beta 57','xm8500','pd200x','sm57','sm58','md421','e609','pg57'].forEach(function(q){
  var hits=ps.filter(function(p){return (p.title||'').toLowerCase().indexOf(q)>-1});
  hits.forEach(function(p){console.log('CATALOG: '+p.id+': '+p.title+' | $'+p.price+' | '+p.category)});
});
