var fs=require('fs');
function chk(n,c){console.log((c?'PASS':'FAIL')+' '+n);}
var en=fs.readFileSync('guides/best-condenser-mics.html','utf8');
var es=fs.readFileSync('guides/best-condenser-mics_es.html','utf8');
chk('EN U87 Type fixed',en.indexOf('Condenser, Multi-pattern</td>')>-1 && en.indexOf('Multi-pattern (3)')===-1);
chk('ES U87 Type fixed',es.indexOf('Condensador, Multi-patrón</td>')>-1 && es.indexOf('Multi-patrón (3)')===-1);
chk('C414 keeps (9)',en.indexOf('Multi-pattern (9)')>-1);
console.log('done');
