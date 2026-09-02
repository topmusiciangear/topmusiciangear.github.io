var fs=require('fs');
var h=fs.readFileSync('guides/sidechain-modulation-plugins_es.html','utf8');
// Find the hero section
var heroIdx=h.indexOf('class="hero"');
if(heroIdx>=0){
  console.log('Hero section found at:',heroIdx);
  console.log(h.substring(heroIdx,heroIdx+3000));
}else{
  console.log('No hero section found');
  // Search for hero class
  var idx=0;
  while(true){
    idx=h.indexOf('hero',idx);
    if(idx<0)break;
    var context=h.substring(Math.max(0,idx-20),idx+50);
    if(context.indexOf('{')<0)console.log('Found at:',idx,context);
    idx++;
  }
}
