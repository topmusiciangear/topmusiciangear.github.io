var fs=require('fs');
var vm=require('vm');
var L=fs.readFileSync('temp/hub_move.js','utf8').split('\n');
[8,12,16,21,22,23,24,25,26,27,28].forEach(function(n){
  var src=L.slice(0,n).join('\n');
  try{ new vm.Script(src); console.log('prefix..'+n+' OK'); }
  catch(e){ console.log('prefix..'+n+' FAIL: '+e.message.split('\n')[0]); }
});
