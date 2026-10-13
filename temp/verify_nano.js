var fs=require('fs');
function chk(n,c){console.log((c?'PASS':'FAIL')+' '+n);}
// Nano appears in usb-mics + budget-usb-mics guides; check both langs of usb-mics
['guides/usb-mics.html','guides/usb-mics_es.html','guides/budget-usb-mics.html','guides/budget-usb-mics_es.html'].forEach(function(f){
  var h;
  try{h=fs.readFileSync(f,'utf8');}catch(e){console.log('SKIP '+f);return;}
  var i=h.indexOf('Yeti Nano');
  if(i===-1){console.log('SKIP '+f+' (no Nano)');return;}
  var seg=h.slice(i,i+12000);
  chk(f+' BLUYETINANO link',seg.indexOf('BLUYETINANO')>-1);
  chk(f+' 3U30 link',seg.indexOf('3U30')>-1);
  chk(f+' REC0007433 link',seg.indexOf('REC0007433')>-1);
  var prices=(seg.match(/data-price='([^']*)'/g)||[]).join(' ');
  console.log('  prices near Nano: '+prices.slice(0,200));
});
console.log('done');
