var fs=require('fs');
function chk(n,c){console.log((c?'PASS':'FAIL')+' '+n);}
['guides/monitor-setup.html','guides/monitor-setup_es.html'].forEach(function(f){
  var h=fs.readFileSync(f,'utf8');
  chk(f+' ISO photo 367081',(h.match(/36\/367081/g)||[]).length>=2);
  chk(f+' MS 304',(h.indexOf('304')>-1));
  chk(f+' zzounds 429',(h.indexOf('429')>-1));
  chk(f+' MS 70',(h.indexOf('70')>-1));
  chk(f+' ISO 169',(h.indexOf('169')>-1));
  chk(f+' ISO 156',(h.indexOf('156')>-1));
  chk(f+' Andertons 132',(h.indexOf('132')>-1));
  chk(f+' G4M 149',(h.indexOf('149')>-1));
  chk(f+' ISO 2I7W link',(h.indexOf('2I7W')>-1));
  chk(f+' Focal 3T37 link',(h.indexOf('3T37')>-1));
  chk(f+' FOLALPHA65EVO link',(h.indexOf('FOLALPHA65EVO')>-1));
});
console.log('done');
