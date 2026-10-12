var fs=require('fs');
var ps=JSON.parse(fs.readFileSync('data/products.json','utf8'));
var ids=[276,277,278,279,280,281,284,287,289,292,429,430,439];
ids.forEach(function(id){
  var p=ps.find(function(x){return x.id===id});
  console.log(id+': '+(p?p.title:'NOT FOUND'));
});
