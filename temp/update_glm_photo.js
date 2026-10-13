var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var fails=[];
function assert(c,m){if(!c)fails.push(m);}

// ---------- 1. products.json: update 649 photo ----------
var ps=JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
var p=ps.find(function(x){return x.id===649;});
assert(p,'649 missing');
p.img='https://r2.gear4music.com/media/31/317285/1200/preview.jpg';
fs.writeFileSync(BASE+'data/products.json',JSON.stringify(ps,null,2));
console.log('products.json 649 photo updated');

// ---------- 2. build and verify ----------
if(fails.length){console.log('FAIL:\n'+fails.join('\n'));process.exit(1);}
console.log('DONE');