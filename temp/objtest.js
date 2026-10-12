var fs=require('fs');
var vm=require('vm');
var L=fs.readFileSync('temp/hub_move.js','utf8').split('\n');
// objects: 31-34, 35-39, 40-44 (0-idx 30-33, 34-38, 39-43)
[[30,33,'obj1'],[34,38,'obj2'],[39,43,'obj3']].forEach(function(r){
  var src='var o='+L.slice(r[0],r[1]+1).join('\n')+';';
  try{ new vm.Script(src); console.log(r[2]+' OK'); }
  catch(e){ console.log(r[2]+' FAIL: '+e.message); }
});
