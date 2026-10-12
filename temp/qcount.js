var fs=require('fs');
var L=fs.readFileSync('temp/chunk.js','utf8').split('\n');
L.forEach(function(l,i){
  var n=0;
  for(var k=0;k<l.length;k++){ if(l[k]==="'"&&l[k-1]!=='\\') n++; }
  if(n%2===1) console.log('ODD line '+(i+1)+': quotes='+n+' :: '+l.slice(0,120));
});
console.log('scan-done lines='+L.length);
