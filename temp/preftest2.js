var fs=require('fs');
var vm=require('vm');
var L=fs.readFileSync('temp/hub_move.js','utf8').split('\n');
[50,52,54,56,57,60,61,62,63,66,67,73,75,76,77,78].forEach(function(n){
  var src=L.slice(0,n).join('\n');
  try{ new vm.Script(src); console.log('prefix..'+n+' OK'); }
  catch(e){ console.log('prefix..'+n+' FAIL: '+e.message.split('\n')[0]); }
});
