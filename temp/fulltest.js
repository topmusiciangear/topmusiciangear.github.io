var fs=require('fs');
var vm=require('vm');
var src=fs.readFileSync('temp/hub_move.js','utf8');
try{ new vm.Script(src,{filename:'hub_move.js'}); console.log('FULL vm.Script OK'); }
catch(e){ console.log('FULL FAIL: '+e.stack.split('\n').slice(0,6).join(' | ')); }
