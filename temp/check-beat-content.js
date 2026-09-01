var fs=require('fs');
var h=fs.readFileSync('guides/beatmaker-plugins_es.html','utf8');
// Find actual shop buttons (not in style tags)
var styleEnd=h.indexOf('</style>');
var content=h.substring(styleEnd);
var idx=0;
var count=0;
while(true){
  idx=content.indexOf('shop-btn-primary',idx);
  if(idx<0)break;
  count++;
  // Get surrounding context
  var start=Math.max(0,idx-500);
  var end=Math.min(content.length,idx+500);
  var chunk=content.substring(start,end);
  // Try to find product name
  var nameMatch=chunk.match(/class="guide-section-title"[^>]*>([^<]+)/);
  if(!nameMatch)nameMatch=chunk.match(/verdict-product-name">([^<]+)</);
  console.log('Button #'+count+':',nameMatch?nameMatch[1]:'unknown');
  // Check for price
  var priceMatch=chunk.match(/£[0-9.]+/);
  var dollarMatch=chunk.match(/\$[0-9.]+/);
  console.log('  Price:',priceMatch?priceMatch[0]:(dollarMatch?dollarMatch[0]:'none'));
  idx++;
}
console.log('Total content buttons:',count);
