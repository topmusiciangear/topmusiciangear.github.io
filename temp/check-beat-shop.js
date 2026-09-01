var fs=require('fs');
var h=fs.readFileSync('guides/beatmaker-plugins_es.html','utf8');
// Find all shop-btn-primary occurrences
var idx=0;
var count=0;
while(true){
  idx=h.indexOf('shop-btn-primary',idx);
  if(idx<0)break;
  count++;
  // Get context around it
  var start=Math.max(0,idx-300);
  var end=Math.min(h.length,idx+200);
  var context=h.substring(start,end);
  // Extract product name if nearby
  var nameMatch=context.match(/verdict-product-name">([^<]+)</);
  if(nameMatch)console.log('Shop #'+count+':',nameMatch[1]);
  idx++;
}
console.log('Total shop buttons:',count);
