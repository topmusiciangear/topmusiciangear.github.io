var fs=require('fs');
var src=fs.readFileSync('build-guides.js','utf8');
[325,14].forEach(function(id){
  var i=src.indexOf('\n  '+id+': {');
  // entry ends at next '\n  NNN:' or map close; print 900 chars
  console.log('===== BUTTON '+id+' =====');
  console.log(src.slice(i,i+900));
});
var d=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var hub=d.find(function(x){return x.id==='best-keyboard'});
hub.productTable.rows.forEach(function(r){
  console.log('### '+r.label);
  r.values.forEach(function(v,i){console.log('  ['+i+'] '+v.value+' || '+v.value_es)});
});
