var fs=require('fs');
function chk(n,c){console.log((c?'PASS':'FAIL')+' '+n);}
var want=['Elgato Stream Deck+','Rode Streamer X','Elgato Wave XLR MK.2','TC Helicon GoXLR Mini','Mackie MainStream','Rode RODECaster Pro II','Roland Bridge Cast X','Yamaha AG08','Mackie DLZ Creator'];
['guides/stream-controllers.html','guides/stream-controllers_es.html'].forEach(function(f){
  var h=fs.readFileSync(f,'utf8');
  want.forEach(function(w){chk(f+' has '+w,h.indexOf(w)>-1);});
  chk(f+' no Maono',h.indexOf('Maono')===-1);
  chk(f+' AG08 Andertons photo',h.indexOf('CAG08BLUK')>-1);
  chk(f+' DLZ photo 942214',h.indexOf('94/942214')>-1);
  chk(f+' DLZ zZounds 799',h.indexOf('MACDLZCREATOR')>-1);
  chk(f+' DLZ Andertons 521',h.indexOf('521')>-1);
  chk(f+' DLZ MS 649',h.indexOf('649')>-1);
  chk(f+' AG08 MS 459',h.indexOf('459')>-1);
});
console.log('done');