var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var b=BASE+'build-guides.js';
var src=fs.readFileSync(b,'utf8');
var re=/art-LIG0019371-000"\r?\n    \}\r?\n  \}\r?\n  266: \{/;
console.log('match:'+re.test(src));
src=src.replace(re,'art-LIG0019371-000"\r\n    }\r\n  },\r\n  266: {');
fs.writeFileSync(b,src);
console.log('done');