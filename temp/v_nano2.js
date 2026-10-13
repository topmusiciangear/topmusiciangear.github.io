var fs=require('fs');
['guides/budget-usb-mics.html','guides/budget-usb-mics_es.html'].forEach(function(f){
  var h=fs.readFileSync(f,'utf8');
  console.log(f+' 3U2R:'+((h.match(/3U2R/g)||[]).length)+' 3U30:'+((h.match(/3U30/g)||[]).length)+' REC0007433:'+((h.match(/REC0007433/g)||[]).length)+' BLUYETINANO:'+((h.match(/BLUYETINANO/g)||[]).length));
});
