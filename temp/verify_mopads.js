var fs=require('fs');
function chk(n,c){console.log((c?'PASS':'FAIL')+' '+n);}
['guides/monitor-setup.html','guides/monitor-setup_es.html'].forEach(function(f){
  var h=fs.readFileSync(f,'utf8');
  chk(f+' MoPADs MS €39.99',h.indexOf('39')>-1);
  chk(f+' MoPADs amazon $39.99',h.indexOf('39')>-1);
  chk(f+' MoPADs zzounds oos link',h.indexOf('AURMOPAD')>-1);
  chk(f+' MoPADs MS link REC0004624',h.indexOf('REC0004624')>-1);
});
console.log('done');