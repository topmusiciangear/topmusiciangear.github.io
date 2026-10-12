var fs=require('fs');
var d=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var g=d.find(function(x){return x.id==='budget-usb-mics'});
['intro','intro_es','conclusion','conclusion_es','verdict','verdict_es'].forEach(function(k){
  console.log('\n===== '+k+' =====\n'+(g[k]||'(none)').slice(0,3000));
});
