var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var ps=JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
var p=ps.find(function(x){return x.id===650;});
p.stores.zzounds='https://www.zzounds.com/item--AURMOPAD';
fs.writeFileSync(BASE+'data/products.json',JSON.stringify(ps,null,2));
console.log('products.json 650 updated with zzounds URL');