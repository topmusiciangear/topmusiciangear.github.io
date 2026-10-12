var fs=require('fs');
var vm=require('vm');
var L=fs.readFileSync('temp/hub_move.js','utf8').split('\n');
var src=L.slice(0,44).join('\n');
try{ new vm.Script(src); console.log('OK?!'); }
catch(e){ console.log(e.stack.split('\n').slice(0,4).join('\n')); }
