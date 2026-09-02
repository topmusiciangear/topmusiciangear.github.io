var fs=require('fs');
var h=fs.readFileSync('guides/sidechain-modulation-plugins_es.html','utf8');
// Find the main content
var bodyIdx=h.indexOf('<body');
var body=h.substring(bodyIdx);
// Find actual product card HTML (not CSS)
var idx=0;
var cards=[];
while(true){
  idx=body.indexOf('guide-product-card">',idx);
  if(idx<0)break;
  cards.push(idx);
  idx++;
}
console.log('Product cards found:',cards.length);
if(cards.length>0){
  console.log('\nFirst card HTML:');
  console.log(body.substring(cards[0],cards[0]+2000));
}
