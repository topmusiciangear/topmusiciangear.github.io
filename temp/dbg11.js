var fs=require('fs');
var en=fs.readFileSync('guides/best-mic-for-guitar-amps.html','utf8');
// card title occurrence (outside JSON-LD)
var idx=0,n=0,target=-1;
while((idx=en.indexOf('Sennheiser e906',idx))>-1){
  var ctx=en.slice(Math.max(0,idx-100),idx+50).replace(/\n/g,' ');
  if(ctx.indexOf('guide-product-card-title')>-1 || ctx.indexOf('guide-section-prod-name')>-1){ target=idx; break; }
  idx+=14; n++; if(n>30) break;
}
console.log('card title at '+target);
if(target>-1){
  // find enclosing buy area: next 'shop-more' or 'tmg-btn' block
  var slice=en.slice(target,target+6000);
  var b=slice.indexOf('Buy at');
  console.log(JSON.stringify(slice.slice(Math.max(0,b-800),b+900)));
}
