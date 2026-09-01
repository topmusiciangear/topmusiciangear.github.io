var fs=require('fs');
var h=fs.readFileSync('guides/beatmaker-plugins_es.html','utf8');
// Find RC-20 and show context
var idx=h.indexOf('RC-20');
if(idx>=0){
  console.log('Found RC-20 at:',idx);
  // Find the shop-btn-primary after this
  var chunk=h.substring(idx,idx+5000);
  var shopIdx=chunk.indexOf('shop-btn-primary');
  if(shopIdx>=0){
    console.log('Shop button area:');
    console.log(chunk.substring(shopIdx-200,shopIdx+1000));
  }else{
    console.log('No shop-btn-primary found after RC-20');
    // Show what's around the product card
    var cardIdx=chunk.indexOf('guide-product-card');
    if(cardIdx>=0)console.log('Card area:',chunk.substring(cardIdx,cardIdx+500));
  }
}
