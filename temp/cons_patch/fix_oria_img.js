var fs=require('fs');
var P='data/products.json';
var A=JSON.parse(fs.readFileSync(P,'utf8'));
var list=Array.isArray(A)?A:A.products;
var p=list.find(x=>x.id===515);
console.log('before', p.image);
p.image='https://r2.gear4music.com/media/103/1036441/1200/preview.jpg';
fs.writeFileSync(P, JSON.stringify(A,null,2),'utf8');
console.log('after', p.image);
