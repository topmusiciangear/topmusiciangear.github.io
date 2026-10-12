var fs=require('fs');
var src=fs.readFileSync('build-guides.js','utf8');
var i=src.indexOf('211: {');
console.log(JSON.stringify(src.slice(i-20,i+400)));
