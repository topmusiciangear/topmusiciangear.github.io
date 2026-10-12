var fs=require('fs');
var en=fs.readFileSync('guides/best-mic-for-guitar-amps.html','utf8');
var idx=en.indexOf('SENE906');
console.log(JSON.stringify(en.slice(idx,idx+900)));
console.log('=====PRIMARY BTN for e906=====');
// find primary button: look backwards from dropdown for Buy at
var back=en.lastIndexOf('Buy at', idx);
console.log(JSON.stringify(en.slice(Math.max(0,back-600),back+400)));
