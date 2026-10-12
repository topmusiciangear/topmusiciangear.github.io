var fs=require('fs');
var en=fs.readFileSync('guides/best-stage-keyboards.html','utf8');
function chk(n,c){ console.log((c?'PASS':'FAIL')+' '+n); }
chk('G4M 82CQ link', en.indexOf('Astrolab-61-Note-Stage-Keyboard-Silver/82CQ')>-1);
chk('G4M 1399', en.indexOf('1,399')>-1);
chk('MS 1369', en.indexOf('1369')>-1);
chk('zzounds 1599 offer', en.indexOf('ARAASTROLAB')>-1 && en.indexOf('1599')>-1);
console.log('done');
