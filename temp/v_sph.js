var fs=require('fs');
function chk(n,c){console.log((c?'PASS':'FAIL')+' '+n);}
['guides/best-condenser-mics.html','guides/best-condenser-mics_es.html'].forEach(function(f){
  var h=fs.readFileSync(f,'utf8');
  chk(f+' Andertons 1226',h.indexOf('1,226')>-1);
  chk(f+' zzounds 1499',h.indexOf('1,499')>-1);
  chk(f+' MS 1489',h.indexOf('1,489')>-1);
  chk(f+' REC0016277',h.indexOf('REC0016277')>-1);
  chk(f+' UADSPHEREDLX',h.indexOf('UADSPHEREDLX')>-1);
});
console.log('done');
