var fs=require('fs');
var d=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var g=d.find(function(x){return x.id==='monitor-setup'});
console.log('title: '+g.title);
console.log('title_es: '+g.title_es);
console.log('titleTag: '+g.titleTag);
console.log('titleTag_es: '+g.titleTag_es);
console.log('featured: '+JSON.stringify(g.featuredProducts));
console.log('table cols: '+(g.productTable?g.productTable.columns.map(function(c){return c.title}).join(' | '):'none'));
console.log('verdictPC: '+(g.verdictProsCons||[]).map(function(p){return p.name}).join(' | '));
console.log('--- verdict ---'); console.log(g.verdict);
console.log('--- verdict_es ---'); console.log(g.verdict_es);
console.log('--- conclusion (first 800) ---'); console.log((g.conclusion||'').slice(0,800));
console.log('--- conclusion_es (first 800) ---'); console.log((g.conclusion_es||'').slice(0,800));
(g.sections||[]).forEach(function(s,i){
  console.log('=== Sec '+i+': '+(s.heading||'').slice(0,80));
  console.log('  products: '+JSON.stringify(s.products));
  console.log('  content(EN first 400): '+(s.content||'').slice(0,400));
  console.log('  content(ES first 400): '+(s.content_es||'').slice(0,400));
});
var ps=JSON.parse(fs.readFileSync('data/products.json','utf8'));
[645,646,647,648,649,650,651].forEach(function(id){
  var p=ps.find(function(x){return x.id===id});
  console.log(id+': '+(p?p.title+' | img='+p.img+' | stores='+Object.keys(p.stores||{}).join(','):'MISSING'));
});
