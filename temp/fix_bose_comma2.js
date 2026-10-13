var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var b=BASE+'build-guides.js';
var src=fs.readFileSync(b,'utf8');
var re=/art-PAH0019778-000"\r?\n    \}\r?\n  \}\r?\n  412: \{/;
console.log('match:'+re.test(src));
src=src.replace(re,'art-PAH0019778-000"\r\n    }\r\n  },\r\n  412: {');
fs.writeFileSync(b,src);
console.log('done');