var fs=require('fs');
var A=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var o=[];
['budget-mics','pro-monitors','scarlett-vs-volt','precision-vs-jazz','sm57-vs-md421'].forEach(function(id){
  var g=A.find(function(x){return x&&x.id===id;});
  o.push('--- '+id+' ---');
  o.push('title='+g.title);
  o.push('title_es='+g.title_es);
  o.push('titleTag='+g.titleTag);
  o.push('titleTag_es='+g.titleTag_es);
});
var n=0;
A.forEach(function(g){
  var s=JSON.stringify(g);
  if(/uA Volt/.test(s)){ o.push('UAVOLT in '+g.id); n++; }
});
o.push('uA-count-guides='+n);
fs.writeFileSync('temp/cons_patch/r2_check.txt', o.join('\n'),'utf8');
console.log('ok');
