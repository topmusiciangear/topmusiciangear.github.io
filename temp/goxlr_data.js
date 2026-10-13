var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var fails=[];
function assert(c,m){if(!c)fails.push(m);}

var ps=JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
var p=ps.find(function(x){return x.id===659;});
assert(p,'659 missing');
p.img='https://r2.gear4music.com/media/72/728567/1200/preview.jpg';
fs.writeFileSync(BASE+'data/products.json',JSON.stringify(ps,null,2));
console.log('products 659 photo updated');

var b=BASE+'build-guides.js';
var src=fs.readFileSync(b,'utf8');
var old='musicstore: "€132.80",';
assert(src.indexOf(old)>-1,'old MS price not found');
src=src.replace(old,'musicstore: "€158.00",');
fs.writeFileSync(b,src);
console.log('TEST 659 MS -> 158');
if(fails.length){console.log('FAIL:\n'+fails.join('\n'));process.exit(1);}
console.log('DONE');