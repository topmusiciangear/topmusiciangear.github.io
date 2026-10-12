var fs=require('fs');
var en=fs.readFileSync('guides/best-stage-keyboards.html','utf8');
var es=fs.readFileSync('guides/best-stage-keyboards_es.html','utf8');
var n1=(en.match(/110\/1108022/g)||[]).length, n2=(es.match(/110\/1108022/g)||[]).length;
var o1=(en.match(/static\.roland\.com\/products\/rd-2000_ex/g)||[]).length;
console.log('EN new-img: '+n1+' old-img: '+o1+' | ES new-img: '+n2);
