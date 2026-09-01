var fs=require('fs');
var h=fs.readFileSync('guides/beatmaker-plugins_es.html','utf8');
// Find the verdict section
var verdictIdx=h.indexOf('verdict');
if(verdictIdx>=0){
  console.log('Verdict section found at:',verdictIdx);
  // Find shop buttons in verdict
  var verdict=h.substring(verdictIdx,verdictIdx+10000);
  var shopIdx=verdict.indexOf('shop-btn-primary');
  if(shopIdx>=0){
    console.log('\nShop button in verdict:');
    console.log(verdict.substring(shopIdx-200,shopIdx+1000));
  }
}
