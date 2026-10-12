var fs=require('fs');
var src=fs.readFileSync('build-guides.js','utf8');
console.log('634 in build: '+src.indexOf('634: {'));
console.log('635 in build: '+src.indexOf('635: {'));
console.log('uses of TEST_SHOP_BTN: ');
var idx=0,n=0;
while((idx=src.indexOf('TEST_SHOP_BTN',idx))>-1 && n<20){
  console.log(' @'+idx+': '+JSON.stringify(src.slice(idx,idx+120)));
  idx+=13; n++;
}
