var fs=require('fs');
var en=fs.readFileSync('guides/best-stage-keyboards.html','utf8');
var es=fs.readFileSync('guides/best-stage-keyboards_es.html','utf8');
console.log('EN new: '+(en.match(/130\/1302302/g)||[]).length+' old: '+(en.match(/130\/1302301/g)||[]).length);
console.log('ES new: '+(es.match(/130\/1302302/g)||[]).length+' old: '+(es.match(/130\/1302301/g)||[]).length);
