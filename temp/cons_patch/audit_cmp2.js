var fs=require('fs');
var A=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var o=[];
['pro-monitors','pro-drum-machines'].forEach(function(id){
  var g=A.find(function(x){return x&&x.id===id;});
  o.push('--- '+id+' ---');
  (g.comparison.rows||[]).forEach(function(r,i){
    o.push('row'+i+' keys='+Object.keys(r).join(',')+' | '+JSON.stringify(r).slice(0,220));
  });
});
fs.writeFileSync('temp/cons_patch/audit_cmp2.txt', o.join('\n'),'utf8');
console.log('ok');
