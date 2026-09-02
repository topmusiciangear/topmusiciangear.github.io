var fs=require('fs');
var h=fs.readFileSync('guides/sidechain-modulation-plugins_es.html','utf8');
// Find the guide-products-cards section
var cardsIdx=h.indexOf('guide-products-cards');
if(cardsIdx>=0){
  console.log('Products cards section found at:',cardsIdx);
  var chunk=h.substring(cardsIdx,cardsIdx+5000);
  console.log(chunk);
}else{
  console.log('No guide-products-cards found');
  // Check for product cards
  var idx=h.indexOf('guide-product-card');
  console.log('guide-product-card found at:',idx);
}
