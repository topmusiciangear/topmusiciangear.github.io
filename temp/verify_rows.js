var fs=require('fs');
function chk(n,c){ console.log((c?'PASS':'FAIL')+' '+n); }
var en=fs.readFileSync('guides/best-keyboard.html','utf8');
var es=fs.readFileSync('guides/best-keyboard_es.html','utf8');
chk('EN Sounds row', en.indexOf('<td class="label">Sounds</td>')>-1);
chk('EN 321 SuperNATURAL', en.indexOf('321 tones, SuperNATURAL')>-1);
chk('EN CFX VRM', en.indexOf('24 voices, CFX + VRM Lite')>-1);
chk('EN ZEN-Core 1154', en.indexOf('1,154 tones, ZEN-Core')>-1);
chk('EN Speakers row', en.indexOf('<td class="label">Speakers</td>')>-1);
chk('EN 11W FP', en.indexOf('Yes, 11 W x 2')>-1);
chk('ES Sonidos', es.indexOf('<td class="label">Sonidos</td>')>-1);
chk('ES Altavoces', es.indexOf('<td class="label">Altavoces</td>')>-1);
chk('ES 321', es.indexOf('321 sonidos, SuperNATURAL')>-1);
chk('stub intact', fs.readFileSync('guides/midi-keyboards.html','utf8').indexOf('best-stage-keyboards.html')>-1);
console.log('done');
