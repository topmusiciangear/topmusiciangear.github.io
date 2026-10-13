var fs=require('fs');
function chk(n,c){console.log((c?'PASS':'FAIL')+' '+n);}
['guides/monitor-setup.html','guides/monitor-setup_es.html'].forEach(function(f){
  var h=fs.readFileSync(f,'utf8');
  chk(f+' photo 1142303',h.indexOf('114/1142303')>-1);
  chk(f+' MS PCM0016890',h.indexOf('PCM0016890')>-1);
  chk(f+' MS €285',h.indexOf('285')>-1);
  chk(f+' zzounds $249',h.indexOf('249')>-1);
  chk(f+' G4M £199',h.indexOf('199')>-1);
  chk(f+' Andertons £219',h.indexOf('219')>-1);
  chk(f+' Andertons URL sonarworks',h.indexOf('sonarworks-soundid-reference-for-speakers')>-1);
});
console.log('done');