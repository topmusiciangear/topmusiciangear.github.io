var fs=require('fs');
['guides/best-stage-keyboards.html','guides/best-stage-keyboards_es.html'].forEach(function(f){
  var h=fs.readFileSync(f,'utf8');
  var ck=h.lastIndexOf('CK88');
  var seg=h.slice(ck,ck+22000);
  console.log(f,'MS-1399-visible:'+(seg.indexOf('1,399')>-1),'G4M-1188:'+(seg.indexOf('1,188')>-1),'zzounds-1499:'+(seg.indexOf('1,499')>-1));
});
