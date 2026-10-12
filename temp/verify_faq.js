var fs=require('fs');
var en=fs.readFileSync('guides/best-mic-for-guitar-amps.html','utf8');
var es=fs.readFileSync('guides/best-mic-for-guitar-amps_es.html','utf8');
function chk(n,c){ console.log((c?'PASS':'FAIL')+' '+n); }
chk('EN q2 e906', en.indexOf('SM57 vs Sennheiser e906 - which is better for guitar?')>-1);
chk('EN a2 switch', en.indexOf('3-position presence switch (Bright, Moderate, Dark)')>-1);
chk('EN zero e609', en.indexOf('e609')===-1);
chk('ES q2 e906', es.indexOf('SM57 vs Sennheiser e906')>-1);
chk('ES a2 emoticona', es.indexOf('interruptor de presencia de 3 posiciones')>-1);
chk('ES zero e609', es.indexOf('e609')===-1);
