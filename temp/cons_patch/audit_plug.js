var fs=require('fs');
var A=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var o=[];
['ai-tools-plugins'].forEach(function(id){
  var g=A.find(function(x){return x&&x.id===id;});
  o.push('KEYS='+Object.keys(g).join(','));
  o.push('TITLE='+g.title+' || '+g.title_es);
  o.push('CMPKEYS='+Object.keys(g.comparison).join(','));
  o.push('CMP_EXTRA='+JSON.stringify(g.comparison).slice(0,800));
  o.push('FEAT='+JSON.stringify(g.featuredProducts));
  o.push('TABLECOLS='+JSON.stringify((g.productTable&&g.productTable.columns||[]).map(function(c){return c.title;})));
});
fs.writeFileSync('temp/cons_patch/audit_plug.txt', o.join('\n'),'utf8');
console.log('ok');
