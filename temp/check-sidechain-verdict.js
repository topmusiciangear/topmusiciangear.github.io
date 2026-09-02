var fs=require('fs');
var h=fs.readFileSync('guides/sidechain-modulation-plugins_es.html','utf8');
// Find verdict section
var verdictIdx=h.indexOf('verdict');
if(verdictIdx>=0){
  var verdict=h.substring(verdictIdx,verdictIdx+10000);
  // Find shop buttons in verdict
  var shopIdx=verdict.indexOf('shop-btn-primary');
  if(shopIdx>=0){
    console.log('Shop button found in verdict');
    console.log(verdict.substring(shopIdx-200,shopIdx+1000));
  }else{
    console.log('No shop-btn-primary in verdict');
  }
}
