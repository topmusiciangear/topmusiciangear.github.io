var fs=require('fs');
var h=fs.readFileSync('guides/beatmaker-plugins_es.html','utf8');
var mainIdx=h.indexOf('guide-detail');
var content=h.substring(mainIdx);
var idx=0;
var buttons=[];
while(true){
  idx=content.indexOf('shop-btn-primary',idx);
  if(idx<0)break;
  buttons.push(idx);
  idx++;
}
console.log('Shop buttons in content:',buttons.length);
if(buttons.length>0){
  var first=buttons[0];
  var start=Math.max(0,first-500);
  console.log('\nFirst button context:');
  console.log(content.substring(start,first+500));
}
