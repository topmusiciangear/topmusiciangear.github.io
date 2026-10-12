var fs=require('fs');
var vm=require('vm');
var L=fs.readFileSync('temp/hub_move.js','utf8').split('\n');
function T(name, src){
  try{ new vm.Script(src); console.log(name+' OK'); }
  catch(e){ console.log(name+' FAIL: '+e.message.split('\n')[0]); }
}
var pre=L.slice(0,28).join('\n');
T('pre+push+obj1', pre+'\nhub.sections.push(\n'+L.slice(30,34).join('\n')+'\n);');
T('pre+push+obj1+obj2', pre+'\nhub.sections.push(\n'+L.slice(30,34).join('\n')+'\n'+L.slice(34,39).join('\n')+'\n);');
