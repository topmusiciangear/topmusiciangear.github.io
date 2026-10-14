var fs=require('fs');
var A=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var P=JSON.parse(fs.readFileSync('data/products.json','utf8'));
var PC={}; P.forEach(function(p){ PC[p.id]=p; });
var o=[];
var labs={};
A.forEach(function(g){
  if(g.comparison&&g.comparison.rows) g.comparison.rows.forEach(function(r){ if(r.label_es) labs[r.label_es]=1; });
  if(g.productTable&&g.productTable.rows) g.productTable.rows.forEach(function(r){ if(r.label_es) labs['PT:'+r.label_es]=1; });
});
o.push('DISTINCT_LABELS='+Object.keys(labs).length);
Object.keys(labs).sort().forEach(function(l){ o.push(l); });
o.push('--- PRICE/TIER verify ---');
[['best-beginner-electric-guitar','Epiphone'],['best-ribbon-mics','Voodoo'],['budget-pa-systems',null],['budget-usb-mics',null]].forEach(function(pair){
  var g=A.find(function(x){return x&&x.id===pair[0];});
  o.push('== '+pair[0]+' title='+g.title+' || '+g.title_es);
  (g.featuredProducts||[]).forEach(function(id){
    var p=PC[id];
    if(p) o.push('  feat '+id+' '+p.title+' price='+p.price);
  });
  if(g.productTable&&g.productTable.rows) g.productTable.rows.forEach(function(r){
    if(/precio|price/i.test(r.label||'')) o.push('  PRICEROW='+JSON.stringify(r.values.map(function(v){return v.value;})));
  });
});
fs.writeFileSync('temp/cons_patch/audit_labels.txt', o.join('\n'),'utf8');
console.log('ok');
