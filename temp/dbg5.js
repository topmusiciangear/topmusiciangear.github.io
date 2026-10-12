var fs=require('fs');
var src=fs.readFileSync('build-guides.js','utf8');
// what follows my 636 entry?
var i=src.indexOf('636: {');
console.log(JSON.stringify(src.slice(i+1400,i+1800)));
// where is the map's end? look for entries after 159000
var j=src.indexOf('reverb: "https://reverb.com/p/shure-beta-57a"');
console.log('--- after beta reverb line:');
console.log(JSON.stringify(src.slice(j,j+300)));
// 349.99 contexts in HTML
var en=fs.readFileSync('guides/best-mic-for-guitar-amps.html','utf8');
var idx=0,n=0;
while((idx=en.indexOf('349.99',idx))>-1 && n<6){
  console.log('349CTX: '+JSON.stringify(en.slice(Math.max(0,idx-200),idx+100)));
  idx+=6; n++;
}
