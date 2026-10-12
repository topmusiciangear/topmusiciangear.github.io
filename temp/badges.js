var fs=require('fs');
var ps=JSON.parse(fs.readFileSync('data/products.json','utf8'));
var b={};
ps.forEach(function(p){ if(p.badge) b[p.badge]=(b[p.badge]||0)+1; });
console.log(JSON.stringify(b));
