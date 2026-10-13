var fs=require('fs');
function chk(n,c){console.log((c?'PASS':'FAIL')+' '+n);}
['guides/best-live-sound-mixers.html','guides/best-live-sound-mixers_es.html'].forEach(function(f){
  var h=fs.readFileSync(f,'utf8');
  chk(f+' Bose photo 505656',h.indexOf('50/505656')>-1);
  chk(f+' MS PAH0019778',h.indexOf('PAH0019778')>-1);
  chk(f+' MS 899',h.indexOf('899')>-1);
  chk(f+' G4M 728',h.indexOf('728')>-1);
});
console.log('done');