var fs=require('fs');
var h=fs.readFileSync('guides/beatmaker-plugins_es.html','utf8');
// Find the first shop-btn-primary and show its parent container
var idx=h.indexOf('shop-btn-primary');
if(idx>=0){
  // Go back to find the product card container
  var start=Math.max(0,idx-1000);
  var chunk=h.substring(start,idx+2000);
  console.log('First shop button area (excerpt):');
  // Find the primary button and show it
  var btnIdx=chunk.indexOf('shop-btn-primary');
  console.log(chunk.substring(btnIdx-100,btnIdx+500));
}
