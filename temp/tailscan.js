var fs=require('fs');
var vm=require('vm');
var L=fs.readFileSync('temp/hub_move.js','utf8').split('\n');
var tail=L.slice(44).join('\n');
try{ new vm.Script(tail); console.log('TAIL parses alone (unexpected)'); }
catch(e){ console.log('TAIL FAIL: '+e.message.split('\n')[0]); }
L.slice(44).forEach(function(l,i){
  var src='var dummy=0;\n'+l;
  try{ new vm.Script(src); }catch(e){ console.log('line '+(45+i)+' suspicious: '+e.message.split('\n')[0]+' :: '+l.slice(0,150)); }
});
console.log('line-scan done');
