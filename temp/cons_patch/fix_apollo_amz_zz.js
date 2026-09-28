var fs=require('fs');
var P='data/products.json';
var A=JSON.parse(fs.readFileSync(P,'utf8'));
var p=A.find(x=>x.id===513);
p.stores.amazon='https://www.amazon.com/dp/B0DC13HNN3';
p.stores.zzounds='https://www.zzounds.com/item--UADAPX8PG2E';
fs.writeFileSync(P, JSON.stringify(A,null,2),'utf8');
console.log('fixed stores');

var bg=fs.readFileSync('build-guides.js','utf8');
bg=bg.replace('amazon:"https://www.amazon.com/dp/B0DC12V1GS"','amazon:"https://www.amazon.com/dp/B0DC13HNN3"');
bg=bg.replace('zzounds:"https://www.zzounds.com/item--UADX8PG2E"','zzounds:"https://www.zzounds.com/item--UADAPX8PG2E"');
bg=bg.replace('amazon:"$3,499.00",zzounds:"$3,499.00"','amazon:"$3,299.00",zzounds:"$3,399.00"');
fs.writeFileSync('build-guides.js', bg);
console.log('fixed build');
