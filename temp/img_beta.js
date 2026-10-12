var fs=require('fs');
var p='data/products.json';
var ps=JSON.parse(fs.readFileSync(p,'utf8'));
var b=ps.find(function(x){return x.id===636});
console.log('BEFORE: '+b.img);
b.img='https://r2.gear4music.com/media/48/489111/1200/preview.jpg';
fs.writeFileSync(p,JSON.stringify(ps,null,2));
console.log('AFTER: '+b.img);
