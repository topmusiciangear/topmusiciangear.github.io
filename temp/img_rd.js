var fs=require('fs');
var p='data/products.json';
var ps=JSON.parse(fs.readFileSync(p,'utf8'));
var r=ps.find(function(x){return x.id===637});
console.log('BEFORE: '+r.img);
r.img='https://r2.gear4music.com/media/110/1108022/1200/preview.jpg';
fs.writeFileSync(p,JSON.stringify(ps,null,2));
console.log('AFTER: '+r.img);
