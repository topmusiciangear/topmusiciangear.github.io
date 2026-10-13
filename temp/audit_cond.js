var fs=require('fs');
var d=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var ps=JSON.parse(fs.readFileSync('data/products.json','utf8'));
function title(id){var p=ps.find(function(x){return x.id===id});return p?p.title:'MISSING-'+id;}
var g=d.find(function(x){return x.id==='best-condenser-mics'});
console.log('=== best-condenser-mics ===');
console.log('featured: '+JSON.stringify(g.featuredProducts));
console.log('table cols: '+(g.productTable?g.productTable.columns.map(function(c){return c.title}).join(' | '):'none'));
console.log('vpc: '+(g.verdictProsCons||[]).map(function(p){return p.name}).join(' | '));
(g.sections||[]).forEach(function(s,i){console.log('sec'+i+' ['+(s.products||[]).join(',')+'] '+(s.heading||'').slice(0,70));});
