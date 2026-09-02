var fs=require('fs');
var h=fs.readFileSync('guides/sidechain-modulation-plugins_es.html','utf8');
// Find all occurrences of hero-inner
var idx=0;
while(true){
  idx=h.indexOf('hero-inner',idx);
  if(idx<0)break;
  console.log('Found at:',idx,'Type:',h.substring(idx-20,idx).indexOf('{')>=0?'CSS':'HTML');
  idx++;
}
