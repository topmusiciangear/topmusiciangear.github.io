const fs=require('fs');
const g=JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json','utf8'));
const gu=g.find(x=>x.id==='best-monitors-for-small-rooms');
console.log('productTable keys:', Object.keys(gu.productTable));
console.log('productTable sample:', JSON.stringify(gu.productTable).slice(0,1500));