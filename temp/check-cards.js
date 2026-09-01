var fs=require('fs');
var h=fs.readFileSync('guides/beatmaker-plugins_es.html','utf8');
// Find all guide-product-card occurrences
var idx=0;
var cards=[];
while(true){
  idx=h.indexOf('guide-product-card',idx);
  if(idx<0)break;
  cards.push(idx);
  idx++;
}
console.log('Product cards found:',cards.length);
if(cards.length>0){
  // Show first card
  var card=cards[0];
  console.log('\nFirst card content:');
  console.log(h.substring(card,card+2000));
}
