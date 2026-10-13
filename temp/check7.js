var fs=require('fs');
var d=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var g=d.find(function(x){return x.id==='monitor-setup'});
var S=g.sections;
function chk(n,c){console.log((c?'PASS':'FAIL')+' '+n);}
// 0. find intro sentence
var all=JSON.stringify(g);
chk('F1 intro sentence present',all.indexOf('supera un par perfecto')>-1);
chk('F2 HS8 interruptores',S[1].content_es.indexOf('Dos interruptores traseros son la primera')>-1);
chk('F2 HS8 baja a 38',S[1].content_es.indexOf('baja a 38 Hz')>-1);
chk('F3 Focal mueve menos',S[2].content_es.indexOf('mueve menos aire que un HS8 de 8')>-1);
chk('F3 Focal peleando',S[2].content_es.indexOf('peleando contra el límite')>-1);
chk('F4 KM Cada Soportes',S[3].content_es.indexOf('Cada Soportes de Monitor')>-1);
chk('F5 ISO inclinación',S[4].content_es.indexOf('con inclinación hasta 6,5 grados')>-1);
chk('F5 ISO coma',S[4].content_es.indexOf('el par cuesta dinero de verdad')>-1);
chk('F6 Mueve REW',S[5].content_es.indexOf('Mueve REW')>-1);
chk('F6 oídos verá',S[5].content_es.indexOf('verá jamás')>-1);
chk('F7 Mueves',S[6].content_es.indexOf('¿Mueves tres vías')>-1);
