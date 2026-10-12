var fs=require('fs');
var en=fs.readFileSync('guides/best-mic-for-guitar-amps.html','utf8');
var es=fs.readFileSync('guides/best-mic-for-guitar-amps_es.html','utf8');
var n1=(en.match(/489111/g)||[]).length, n2=(es.match(/489111/g)||[]).length;
var o1=(en.match(/shureweb\.eu/g)||[]).length, o2=(es.match(/shureweb\.eu/g)||[]).length;
console.log('EN new-img hits: '+n1+' old-img hits: '+o1);
console.log('ES new-img hits: '+n2+' old-img hits: '+o2);
