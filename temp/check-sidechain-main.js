var fs=require('fs');
var h=fs.readFileSync('guides/sidechain-modulation-plugins_es.html','utf8');
// Find main content
var mainIdx=h.indexOf('mainContent');
if(mainIdx>=0){
  console.log('Main content area:');
  console.log(h.substring(mainIdx,mainIdx+3000));
}
