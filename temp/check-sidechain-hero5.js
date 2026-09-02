var fs=require('fs');
var h=fs.readFileSync('guides/sidechain-modulation-plugins_es.html','utf8');
// Search for <div class="hero-inner"
var idx=h.indexOf('<div class="hero-inner');
if(idx>=0){
  console.log('Found hero div at:',idx);
  console.log(h.substring(idx,idx+2000));
}else{
  console.log('No <div class="hero-inner found');
  // Search for hero class
  var idx2=h.indexOf('class="hero"');
  if(idx2>=0){
    console.log('Found hero class at:',idx2);
    console.log(h.substring(idx2,idx2+1000));
  }
}
