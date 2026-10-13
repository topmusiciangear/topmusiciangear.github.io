var fs=require('fs');
function chk(n,c){console.log((c?'PASS':'FAIL')+' '+n);}
var want=['Elgato Stream Deck+','Rode Streamer X','Elgato Wave XLR MK.2','Elgato Stream Deck + XL','TC Helicon GoXLR Mini','Rode RODECaster Pro II','Mackie MainStream','Elgato Wave XLR Pro','Roland Bridge Cast X','Maono Maonocaster E2 Gen2'];
['guides/stream-controllers.html','guides/stream-controllers_es.html'].forEach(function(f){
  var h=fs.readFileSync(f,'utf8');
  want.forEach(function(w){chk(f+' has '+w,h.indexOf(w)>-1);});
  chk(f+' no ZG02',h.indexOf('ZG02')===-1);
  chk(f+' no ghost MK.2 col',h.indexOf('Stream Deck MK.2')===-1);
  chk(f+' no Razer col',h.indexOf('Razer Stream Controller X')===-1);
  chk(f+' RCP2 photo 829851',h.indexOf('82/829851')>-1);
  chk(f+' RCP2 G4M 519',h.indexOf('519')>-1);
  chk(f+' RCP2 zZounds RODRCPII',h.indexOf('RODRCPII')>-1);
  chk(f+' RCP2 MS REC0016024',h.indexOf('REC0016024')>-1);
  chk(f+' chooser present',h.indexOf('How to Choose')>-1||h.indexOf('Cómo elegir')>-1);
});
console.log('done');