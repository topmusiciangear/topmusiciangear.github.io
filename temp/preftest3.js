var fs=require('fs');
var vm=require('vm');
var L=fs.readFileSync('temp/hub_move.js','utf8').split('\n');
[29,30,44,45,46,47,48,49].forEach(function(n){
  var src=L.slice(0,n).join('\n');
  try{ new vm.Script(src); console.log('prefix..'+n+' OK'); }
  catch(e){ console.log('prefix..'+n+' FAIL: '+e.message.split('\n')[0]); }
});
console.log('L29='+JSON.stringify(L[28])+' L30='+JSON.stringify(L[29])+' L45='+JSON.stringify(L[44]));
