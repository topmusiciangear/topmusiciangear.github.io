var fs=require('fs');
var en=fs.readFileSync('guides/best-stage-keyboards.html','utf8');
function chk(n,c){ console.log((c?'PASS':'FAIL')+' '+n); }
chk('MS bundle URL', en.indexOf('Korg-Grandstage-X-inkl-Wooden-stand/art-KEY0005938-000')>-1);
chk('MS 2299', en.indexOf('2,299')>-1);
chk('andertons white (no Agotado on its row)', (function(){
  var i=en.indexOf('Korg-Grandstage-X-Stage-Piano');
  var seg=en.slice(Math.max(0,i-600),i+600);
  return seg.indexOf('Agotado')===-1;
})());
console.log('done');
