var fs=require('fs');
var d=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var g=d.find(function(x){return x.id==='budget-usb-mics'});
var keys=Object.keys(g).filter(function(k){return /faq/i.test(k)});
console.log('FAQ keys: '+keys.join(', '));
keys.forEach(function(k){
  var v=g[k];
  var s=JSON.stringify(v);
  if(/Seiren|SoloCast|PM461|K688|headphone|auricular|podcast/i.test(s)){
    console.log('\n===== '+k+' =====');
    console.log(s.slice(0,6000));
  }
});
