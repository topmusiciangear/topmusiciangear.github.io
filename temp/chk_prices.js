var fs=require('fs');
var src=fs.readFileSync('build-guides.js','utf8');
['635: {','636: {'].forEach(function(k){
  var i=src.indexOf(k);
  console.log(src.slice(i,i+700));
  console.log('=====');
});
