var fs=require('fs');
var en=fs.readFileSync('guides/best-stage-keyboards.html','utf8');
console.log('82CQ hits: '+(en.match(/82CQ/g)||[]).length);
console.log('6AMY hits (old): '+(en.match(/6AMY/g)||[]).length);
var i=en.indexOf('82CQ');
console.log(JSON.stringify(en.slice(Math.max(0,i-200),i+100)));
