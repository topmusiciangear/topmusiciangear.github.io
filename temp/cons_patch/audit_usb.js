var fs=require('fs');
var A=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var g=A.find(function(x){return x&&x.id==='budget-usb-mics';});
var o=[];
o.push('TITLE='+g.title+' || '+g.title_es);
o.push('FEAT='+JSON.stringify(g.featuredProducts));
o.push('COLS='+JSON.stringify((g.productTable&&g.productTable.columns||[]).map(function(c){return c.title;})));
o.push('NSEC='+g.sections.length);
g.sections.forEach(function(s,i){
  o.push('sec'+i+' prods='+JSON.stringify(s.products||[])+' h='+(s.heading||'').slice(0,60));
});
var v=(g.verdictProsCons||[]).map(function(x){return x.name;});
o.push('VPC='+JSON.stringify(v));
fs.writeFileSync('temp/cons_patch/audit_usb.txt', o.join('\n'),'utf8');
console.log('ok');
