var fs=require('fs');
var en=fs.readFileSync('guides/best-stage-keyboards.html','utf8');
var es=fs.readFileSync('guides/best-stage-keyboards_es.html','utf8');
function chk(n,c){ console.log((c?'PASS':'FAIL')+' '+n); }
chk('EN new img', (en.match(/63\/636490/g)||[]).length>=3);
chk('ES new img', (es.match(/63\/636490/g)||[]).length>=3);
chk('EN no old Yamaha img', en.indexOf('yc88_detail_w001')===-1);
chk('EN G4M 2398', en.indexOf('2,398')>-1);
chk('EN MS 2799', en.indexOf('2799')>-1);
chk('EN G4M 3Q2G link', en.indexOf('3Q2G')>-1);
console.log('done');
