var fs=require('fs');
function chk(n,c){console.log((c?'PASS':'FAIL')+' '+n);}
['guides/best-condenser-mics.html','guides/best-condenser-mics_es.html'].forEach(function(f){
  var h=fs.readFileSync(f,'utf8');
  chk(f+' photo 291966',h.indexOf('29/291966')>-1);
  chk(f+' G4M 1ZJI',h.indexOf('1ZJI')>-1);
  chk(f+' G4M 215',h.indexOf('215')>-1);
  chk(f+' MS 264',h.indexOf('264')>-1);
  chk(f+' REC0013117',h.indexOf('REC0013117')>-1);
  chk(f+' LEWLCT440PURE',h.indexOf('LEWLCT440PURE')>-1);
  chk(f+' zzounds 249',h.indexOf('249')>-1);
  chk(f+' Andertons 205',h.indexOf('205')>-1);
  chk(f+' andertons slug',h.indexOf('lewitt-lct-440-pure-large-diaphragm-condenser-microphone')>-1);
});
console.log('done');
