var fs=require('fs');
var en=fs.readFileSync('guides/best-mic-for-guitar-amps.html','utf8');
console.log('has 634 entry: '+ (en.indexOf('634:')>-1));
console.log('has item--SENE906: '+(en.indexOf('SENE906')>-1));
console.log('has $219: '+(en.indexOf('219')>-1));
// PD200X mentions with context
var idx=0, n=0;
while((idx=en.indexOf('PD200X',idx))>-1 && n<8){
  console.log('PD200X @'+idx+': ...'+en.slice(Math.max(0,idx-160),idx+120).replace(/\n/g,' ')+'...');
  idx+=5; n++;
}
idx=0; n=0;
while((idx=en.indexOf('XM8500',idx))>-1 && n<8){
  console.log('XM8500 @'+idx+': ...'+en.slice(Math.max(0,idx-160),idx+120).replace(/\n/g,' ')+'...');
  idx+=5; n++;
}
