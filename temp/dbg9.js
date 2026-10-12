var fs=require('fs');
var en=fs.readFileSync('guides/best-mic-for-guitar-amps.html','utf8');
var idx=0,n=0;
while((idx=en.indexOf('SENE906',idx))>-1 && n<6){
  console.log('--- hit '+n+' @'+idx+': '+JSON.stringify(en.slice(Math.max(0,idx-350),idx+150)));
  idx+=7; n++;
}
