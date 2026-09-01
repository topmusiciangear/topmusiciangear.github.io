var fs=require('fs');
var h=fs.readFileSync('guides/beatmaker-plugins_es.html','utf8');
// Find the main content area
var mainIdx=h.indexOf('<main');
if(mainIdx<0)mainIdx=h.indexOf('<article');
if(mainIdx<0)mainIdx=h.indexOf('guide-detail');
console.log('Main content starts at:',mainIdx);
// Find product cards in the body
var bodyIdx=h.indexOf('<body');
var body=h.substring(bodyIdx);
var cardIdx=0;
var cards=[];
while(true){
  cardIdx=body.indexOf('guide-product-card',cardIdx);
  if(cardIdx<0)break;
  // Skip CSS definitions
  var context=body.substring(cardIdx,cardIdx+50);
  if(context.indexOf('{')<0 && context.indexOf(':')<0){
    cards.push(cardIdx);
  }
  cardIdx++;
}
console.log('Real product cards:',cards.length);
if(cards.length>0){
  console.log('\nFirst real card:');
  console.log(body.substring(cards[0],cards[0]+1500));
}
