var fs=require('fs');
function chk(n,c){console.log((c?'PASS':'FAIL')+' '+n);}
['guides/stream-controllers.html','guides/stream-controllers_es.html'].forEach(function(f){
  var h=fs.readFileSync(f,'utf8');
  // BEACN allowed ONLY in the honest-trade sentence about GoXLR's origin? No — must be zero. Check:
  var beacn=(h.match(/BEACN/g)||[]).length;
  console.log(f+' BEACN count='+beacn);
  chk(f+' GoXLR Mini section',h.indexOf('GoXLR Mini')>-1);
  chk(f+' ZG02 section',h.indexOf('ZG02')>-1);
  chk(f+' MainStream section',h.indexOf('MainStream')>-1);
  chk(f+' G4M GoXLR link',h.indexOf('TC-Helicon-GoXLR-Mini')>-1);
  chk(f+' Amazon ZG02',h.indexOf('B0CQZ25H1M')>-1);
  chk(f+' MainStream links',h.indexOf('Mackie-MainStream')>-1||h.indexOf('MACMAINSTREAM')>-1);
  chk(f+' GoXLR photo',h.indexOf('GoXLR-MINI_Left')>-1);
  chk(f+' MainStream photo',h.indexOf('mainstream.png')>-1);
});
console.log('done');