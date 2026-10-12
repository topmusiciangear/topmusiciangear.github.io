var fs=require('fs');
var d=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var spe=d.find(function(x){return x.id==='midi-keyboards'});
spe.verdictProsCons.forEach(function(v){
  if(/Hammer 88|Kontrol S61/.test(v.name)){
    console.log('===== '+v.name+' =====');
    console.log('pros: '+JSON.stringify(v.pros));
    console.log('cons: '+JSON.stringify(v.cons));
    console.log('pros_es: '+JSON.stringify(v.pros_es));
    console.log('cons_es: '+JSON.stringify(v.cons_es));
  }
});
console.log('===== SPE SEC0 FULL EN =====');
console.log(spe.sections[0].content);
console.log('===== SPE SEC0 FULL ES =====');
console.log(spe.sections[0].content_es);
