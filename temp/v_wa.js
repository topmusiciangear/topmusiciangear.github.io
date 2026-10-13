var fs=require('fs');
function chk(n,c){console.log((c?'PASS':'FAIL')+' '+n);}
['guides/best-condenser-mics.html','guides/best-condenser-mics_es.html'].forEach(function(f){
  var h=fs.readFileSync(f,'utf8');
  chk(f+' photo 712330',h.indexOf('71/712330')>-1);
  chk(f+' G4M 436V',h.indexOf('436V')>-1);
  chk(f+' G4M 1020',h.indexOf('1,020')>-1);
  chk(f+' WAUWA8000',h.indexOf('WAUWA8000')>-1);
  chk(f+' zzounds 1299',h.indexOf('1,299')>-1);
  chk(f+' andertons slug',h.indexOf('warm-audio-wa-8000-large-diaphragm-condenser-microphone')>-1);
  chk(f+' Andertons 949',h.indexOf('949')>-1);
  chk(f+' REC0015721',h.indexOf('REC0015721')>-1);
  chk(f+' MS 1149',h.indexOf('1,149')>-1);
});
console.log('done');
