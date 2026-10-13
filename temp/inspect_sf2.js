var fs=require('fs');
var d=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var g=d.find(function(x){return x.id==='studio-furniture'});
console.log('--- table rows ---');
g.productTable.rows.forEach(function(r,i){
  console.log('ROW'+i+' label='+r.label+' / '+r.label_es);
  r.values.forEach(function(v,j){ console.log('  ['+j+'] '+v.value+' || '+v.value_es); });
});
console.log('--- vpc[3] ---');
console.log(JSON.stringify(g.verdictProsCons[3],null,2));
