var fs=require('fs');
['guides/budget-usb-mics.html','guides/budget-usb-mics_es.html'].forEach(function(f){
  var h=fs.readFileSync(f,'utf8');
  var m=h.match(/<title>[\s\S]*?<\/title>/);
  console.log(f+' => '+m[0]);
});
