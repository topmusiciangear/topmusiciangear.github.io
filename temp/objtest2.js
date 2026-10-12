var fs=require('fs');
var vm=require('vm');
var L=fs.readFileSync('temp/hub_move.js','utf8').split('\n');
[[30,33,'obj1'],[34,38,'obj2'],[39,43,'obj3']].forEach(function(r){
  var body=L.slice(r[0],r[1]+1).join('\n').replace(/,\s*$/,'');
  try{ new vm.Script('var o='+body+';'); console.log(r[2]+' OK'); }
  catch(e){ console.log(r[2]+' FAIL: '+e.message); }
});
