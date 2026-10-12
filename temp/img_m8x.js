var fs=require('fs');
var p='data/products.json';
var ps=JSON.parse(fs.readFileSync(p,'utf8'));
var m=ps.find(function(x){return x.id===639});
console.log('BEFORE: '+m.img);
m.img='https://r2.gear4music.com/media/130/1302302/1200/preview.jpg';
fs.writeFileSync(p,JSON.stringify(ps,null,2));
console.log('AFTER: '+m.img);
