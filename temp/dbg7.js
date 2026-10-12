var fs=require('fs');
var en=fs.readFileSync('guides/best-mic-for-guitar-amps.html','utf8');
console.log(en.slice(95058-500,95058+3000).replace(/\n/g,' '));
