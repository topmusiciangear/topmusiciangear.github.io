var fs=require('fs');
var h=fs.readFileSync('guides/sidechain-modulation-plugins_es.html','utf8');
// Find all occurrences of RC-20
var idx=0;
while(true){
  idx=h.indexOf('RC-20',idx);
  if(idx<0)break;
  console.log('Found RC-20 at:',idx);
  console.log('Context:',h.substring(Math.max(0,idx-50),idx+100));
  idx++;
}
