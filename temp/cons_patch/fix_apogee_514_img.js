var fs=require('fs');
var P='data/products.json';
var A=JSON.parse(fs.readFileSync(P,'utf8'));
var p=A.find(x=>x.id===514);
console.log('before', p.img);
p.img='https://r2.gear4music.com/media/16/167659/1200/preview.jpg';
fs.writeFileSync(P, JSON.stringify(A,null,2),'utf8');
console.log('after', p.img);
