var fs=require('fs');
function chk(n,c){console.log((c?'PASS':'FAIL')+' '+n);}
['guides/stream-controllers.html','guides/stream-controllers_es.html'].forEach(function(f){
  var h=fs.readFileSync(f,'utf8');
  chk(f+' no BEACN',h.indexOf('BEACN')===-1);
  chk(f+' no Loupedeck/Loupeedeck',h.indexOf('oupedeck')===-1);
  chk(f+' GoXLR Mini section',h.indexOf('GoXLR Mini')>-1);
  chk(f+' ZG02 section',h.indexOf('ZG02')>-1);
  chk(f+' MainStream section',h.indexOf('MainStream')>-1);
  chk(f+' chooser present',h.indexOf('How to Choose')>-1||h.indexOf('Cómo elegir')>-1);
  chk(f+' Deck+ section intact',h.indexOf('keeps selling out')>-1||h.indexOf('no deja de agotarse')>-1);
  chk(f+' G4M GoXLR link',h.indexOf('TC-Helicon-GoXLR-Mini')>-1);
  chk(f+' Amazon ZG02',h.indexOf('B0CQZ25H1M')>-1);
  chk(f+' G4M MainStream',h.indexOf('Mackie-MainStream')>-1);
  chk(f+' GoXLR price',h.indexOf('110.25')>-1||h.indexOf('189')>-1);
  chk(f+' 9 table cols',h.indexOf('Mackie MainStream')>-1&&h.indexOf('Yamaha ZG02')>-1);
});
console.log('done');