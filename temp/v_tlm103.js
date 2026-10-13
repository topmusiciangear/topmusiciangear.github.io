var fs=require('fs');
function chk(n,c){console.log((c?'PASS':'FAIL')+' '+n);}
['guides/best-condenser-mics.html','guides/best-condenser-mics_es.html'].forEach(function(f){
  var h=fs.readFileSync(f,'utf8');
  chk(f+' photo 589956',h.indexOf('58/589956')>-1);
  chk(f+' G4M 22FD',h.indexOf('22FD')>-1);
  chk(f+' G4M 976',h.indexOf('976')>-1);
  chk(f+' NEUTLM103',h.indexOf('NEUTLM103')>-1);
  chk(f+' zzounds 1295',h.indexOf('1,295')>-1);
  chk(f+' andertons slug',h.indexOf('neumann-tlm103-studio-condenser-mic')>-1);
  chk(f+' Andertons 966',h.indexOf('966')>-1);
  chk(f+' REC0000317',h.indexOf('REC0000317')>-1);
  chk(f+' MS 1039',h.indexOf('1,039')>-1);
});
console.log('done');
