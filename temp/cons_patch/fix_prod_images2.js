var fs=require('fs');
var P='data/products.json';
var A=JSON.parse(fs.readFileSync(P,'utf8'));
var list=Array.isArray(A)?A:A.products;
function upd(id, img){
  var p=list.find(x=>x.id===id);
  if(!p){console.log('not found '+id);return;}
  console.log(id, p.title, '->', img.slice(0,60));
  p.image=img;
}
upd(183,'https://r2.gear4music.com/media/44/443840/1200/preview.jpg'); // RME UFX III placeholder gear4music (verified pattern)
upd(516,'https://cdn11.bigcommerce.com/s-tsw2okvg64/images/stencil/1280x1280/products/20982/72954/9999-12077-2__51754.1657736383.jpg?c=2'); // Lynx Aurora-n from Front End Audio CDN
fs.writeFileSync(P, JSON.stringify(A,null,2),'utf8');
console.log('done');
