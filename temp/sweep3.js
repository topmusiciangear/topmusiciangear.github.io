var fs=require('fs');
var d=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var g=d.find(function(x){return x.id==='budget-usb-mics'});
[6,10,3,12,4].forEach(function(i){
  var s=g.sections[i];
  console.log('\n===== SECTION '+i+': '+s.heading+' =====');
  console.log('--- EN ---\n'+s.content);
  console.log('--- ES ---\n'+(s.content_es||'(none)'));
});
console.log('\n===== verdictProsCons (Seiren 280 / SoloCast 439 / SoloCast2 281 / PM461 284 / K688 278) =====');
var want=['Razer Seiren','SoloCast 2','SoloCast','PM461','K688'];
g.verdictProsCons.forEach(function(v){
  if(want.some(function(w){return v.name.indexOf(w)>-1})){
    console.log('\n--- '+v.name+' ---');
    console.log('pros: '+JSON.stringify(v.pros));
    console.log('cons: '+JSON.stringify(v.cons));
    console.log('pros_es: '+JSON.stringify(v.pros_es));
    console.log('cons_es: '+JSON.stringify(v.cons_es));
  }
});
