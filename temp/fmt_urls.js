var fs=require('fs');
var src=fs.readFileSync('build-guides.js','utf8');
var i=src.indexOf('urls: {');
var n=0;
while(i>-1 && n<3){
  // print enclosing entry start (go back to line with "NNNN:")
  var back=src.lastIndexOf('\n  ',i);
  console.log('.....'+src.slice(Math.max(0,back-200),i+700));
  console.log('====================');
  i=src.indexOf('urls: {',i+1);
  n++;
}
