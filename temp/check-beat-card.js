var fs=require('fs');
var h=fs.readFileSync('guides/beatmaker-plugins_es.html','utf8');
var styleEnd=h.indexOf('</style>');
var content=h.substring(styleEnd);
var idx=content.indexOf('shop-btn-primary',styleEnd);
// Get a large chunk around the first real shop button
var start=Math.max(0,idx-2000);
var chunk=content.substring(start,idx+2000);
// Find the product card div
var cardStart=chunk.lastIndexOf('guide-product-card');
if(cardStart>=0){
  console.log('Product card:');
  console.log(chunk.substring(cardStart,cardStart+2000));
}
