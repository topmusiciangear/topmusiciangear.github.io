var fs=require('fs');
function chk(n,c){console.log((c?'PASS':'FAIL')+' '+n);}
['guides/monitor-setup.html','guides/monitor-setup_es.html'].forEach(function(f){
  var h=fs.readFileSync(f,'utf8');
  chk(f+' GLM photo 317285',h.indexOf('31/317285')>-1);
  chk(f+' GLM MS €315',h.indexOf('315')>-1);
  chk(f+' GLM G4M £249',h.indexOf('249')>-1);
  chk(f+' GLM Andertons £309',h.indexOf('309')>-1);
  chk(f+' GLM Andertons URL',h.indexOf('genelec-glm-3-loudspeaker-manager-user-kit')>-1);
});
console.log('done');