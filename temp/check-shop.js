var fs=require('fs');
var h=fs.readFileSync('guides/sidechain-modulation-plugins_es.html','utf8');
// Find shop button containers
var matches=h.match(/class="[^"]*shop[^"]*"/g);
console.log('Shop classes:',matches?matches.slice(0,5).join('\n'):'none');
// Find price display
var priceMatch=h.match(/shop-price/g);
console.log('shop-price count:',priceMatch?priceMatch.length:0);
// Find the RC-20 product card area
var idx=h.indexOf('RC-20');
if(idx>=0){
  var chunk=h.substring(idx,idx+3000);
  // Look for price patterns
  var p=chunk.match(/£[0-9.]+/g);
  console.log('RC-20 pound prices:',p);
  var d=chunk.match(/\$[0-9.]+/g);
  console.log('RC-20 dollar prices:',d);
}
