var fs=require('fs');
var vm=require('vm');
var L=fs.readFileSync('temp/hub_move.js','utf8').split('\n');
var pre=L.slice(0,28).join('\n');
var src=pre+'\nhub.sections.push(\n'+L.slice(30,44).join('\n')+'\n);';
try{ new vm.Script(src); console.log('ALL-3 OK'); }
catch(e){ console.log('ALL-3 FAIL: '+e.message.split('\n')[0]); }
// also: what is line 44 EXACTLY vs line 39? compare endings
console.log(JSON.stringify(L[38].slice(-20)));
console.log(JSON.stringify(L[43].slice(-20)));
console.log(JSON.stringify(L[33].slice(-20)));
