var fs=require('fs');
function chk(n,c){console.log((c?'PASS':'FAIL')+' '+n);}
['guides/best-condenser-mics.html','guides/best-condenser-mics_es.html'].forEach(function(f){
  var h=fs.readFileSync(f,'utf8');
  chk(f+' no TLM102',h.indexOf('TLM 102')===-1);
  chk(f+' Sphere sec',h.indexOf('Sphere DLX')>-1);
  chk(f+' sE2200 sec',h.indexOf('sE2200')>-1);
  chk(f+' Sphere G4M 1283',h.indexOf('1,283')>-1);
  chk(f+' sE2200 G4M 300',h.indexOf('300')>-1);
  chk(f+' 899494 img',h.indexOf('89/899494')>-1);
  chk(f+' 340072 img',h.indexOf('34/340072')>-1);
  chk(f+' 5B0C link',h.indexOf('5B0C')>-1);
  chk(f+' 2CYA link',h.indexOf('2CYA')>-1);
  chk(f+' B0C35LC2JZ',h.indexOf('B0C35LC2JZ')>-1);
  chk(f+' B077HZJJSJ',h.indexOf('B077HZJJSJ')>-1);
});
console.log('done');
