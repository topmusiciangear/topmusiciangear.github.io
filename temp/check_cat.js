var ps=require('../data/products.json');
function findId(id){var p=ps.find(function(x){return x.id===id});console.log(id+': '+(p?(p.title+' | img='+(p.img||'NONE').slice(0,60)+' | stores='+Object.keys(p.stores||{}).join(',')):'MISSING'));return p;}
console.log('--- yeti/k371 ---');
[518,57].forEach(findId);
console.log('--- condenser ghosts ---');
['LCT 440','TLM 102','TLM102','TLM 103','TLM103','WA-8000','WA8000'].forEach(function(nm){
  var hits=ps.filter(function(p){return p.title.toLowerCase().indexOf(nm.toLowerCase().replace(' ',''))>-1||p.title.toLowerCase().indexOf(nm.toLowerCase())>-1;});
  console.log(nm+': '+(hits.length?hits.map(function(p){return p.id+' '+p.title;}).join(' | '):'NO MATCH'));
});
console.log('--- digital mixer table names ---');
var d=require('../data/guides.json');
var g=d.find(function(x){return x.id==='best-digital-mixers'});
console.log('table: '+g.productTable.columns.map(function(c){return c.title}).join(' | '));
console.log('vpc: '+g.verdictProsCons.map(function(p){return p.name}).join(' | '));
console.log('featured: '+JSON.stringify(g.featuredProducts));
(g.sections||[]).forEach(function(s,i){console.log('sec'+i+' ['+(s.products||[]).join(',')+'] '+(s.heading||'').slice(0,60));});
