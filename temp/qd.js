var fs=require('fs');
var L=fs.readFileSync('temp/hub_move.js','utf8').split('\n');
[33,38,42,43].forEach(function(n){
  var l=L[n];
  var out=[];
  for(var k=0;k<l.length;k++){ if(l[k]==="'") out.push(k+':'+JSON.stringify(l.slice(Math.max(0,k-15),k+15))); }
  console.log('line '+(n+1)+' has '+out.length+" single-quotes:");
  out.forEach(function(o){console.log('   '+o)});
});
