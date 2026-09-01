var fs=require('fs');
var h=fs.readFileSync('guides/sidechain-modulation-plugins_es.html','utf8');
// Find RC-20 section and extract shop button area
var idx=h.indexOf('RC-20 Retro Color');
if(idx<0){console.log('RC-20 not found');process.exit();}
// Find the next shop-btn-primary after RC-20
var chunk=h.substring(idx,idx+5000);
var shopIdx=chunk.indexOf('shop-btn-primary');
if(shopIdx>=0){
  console.log('Shop button area:');
  console.log(chunk.substring(shopIdx-100,shopIdx+800));
}
