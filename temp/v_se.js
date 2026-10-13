var fs=require('fs');
function chk(n,c){console.log((c?'PASS':'FAIL')+' '+n);}
['guides/best-condenser-mics.html','guides/best-condenser-mics_es.html'].forEach(function(f){
  var h=fs.readFileSync(f,'utf8');
  chk(f+' G4M 177',h.indexOf('177')>-1);
  chk(f+' se2200a URL',h.indexOf('se-electronics-se2200a-microphone')>-1);
  chk(f+' Andertons 143',h.indexOf('143')>-1);
  chk(f+' SEESE2200',h.indexOf('SEESE2200')>-1);
  chk(f+' zzounds 299',h.indexOf('299')>-1);
  chk(f+' REC0013378',h.indexOf('REC0013378')>-1);
  chk(f+' MS 259',h.indexOf('259')>-1);
});
console.log('done');
