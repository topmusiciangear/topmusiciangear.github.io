var fs=require('fs');
function chk(n,c){console.log((c?'PASS':'FAIL')+' '+n);}
['guides/best-digital-mixers.html','guides/best-digital-mixers_es.html'].forEach(function(f){
  var h=fs.readFileSync(f,'utf8');
  chk(f+' Ui16 sec',h.indexOf('Soundcraft Ui16: Tablet Mixing')>-1||h.indexOf('Soundcraft Ui16: mezcla con tableta')>-1);
  chk(f+' WING sec',h.indexOf('WING Compact: Flagship Power')>-1||h.indexOf('WING Compact: potencia insignia')>-1);
  chk(f+' Ui16 stereo-only',h.indexOf('stereo only')>-1||h.indexOf('solo estéreo')>-1);
  chk(f+' WING 64-track',h.indexOf('64 track')>-1||h.indexOf('64 pista')>-1);
});
console.log('done');
