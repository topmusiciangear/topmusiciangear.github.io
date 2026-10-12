var fs=require('fs');
var en=fs.readFileSync('guides/best-stage-keyboards.html','utf8');
var i=en.indexOf('2,299');
console.log(JSON.stringify(en.slice(Math.max(0,i-700),i+200)));
