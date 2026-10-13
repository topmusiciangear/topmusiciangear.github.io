var fs=require('fs');
function chk(n,c){console.log((c?'PASS':'FAIL')+' '+n);}
var want=['Elgato Stream Deck+','Rode Streamer X','Elgato Wave XLR MK.2','TC Helicon GoXLR Mini','Mackie MainStream','Rode RODECaster Pro II','Roland Bridge Cast X','Maono Maonocaster E2 Gen2','Yamaha AG08'];
['guides/stream-controllers.html','guides/stream-controllers_es.html'].forEach(function(f){
  var h=fs.readFileSync(f,'utf8');
  want.forEach(function(w){chk(f+' has '+w,h.indexOf(w)>-1);});
  chk(f+' no Deck+XL',h.indexOf('Stream Deck + XL')===-1&&h.indexOf('Stream Deck +XL')===-1);
  chk(f+' no Wave Pro',h.indexOf('Wave XLR Pro')===-1);
  chk(f+' XLR Dock mention',h.indexOf('XLR Dock')>-1);
  chk(f+' AG08 photo',h.indexOf('yamaha-ag08-bl_1_REC0016318')>-1);
  chk(f+' AG08 MS 459',h.indexOf('459')>-1);
  chk(f+' AG08 Andertons 405',h.indexOf('405')>-1);
  chk(f+' AG08 zZounds YAMAG08',h.indexOf('YAMAG08')>-1);
  chk(f+' RCP2 photo 1068690',h.indexOf('106/1068690')>-1);
});
console.log('done');