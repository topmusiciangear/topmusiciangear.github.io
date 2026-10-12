var fs=require('fs');
var ps=JSON.parse(fs.readFileSync('data/products.json','utf8'));
var p=ps.find(function(x){return x.id===211});
console.log(JSON.stringify(p,null,1).slice(0,2500));
