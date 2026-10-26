const fs=require('fs');
const B='C:/Users/Daniel/projects/topmusiciangear/';
const g=JSON.parse(fs.readFileSync(B+'data/guides.json','utf8'));
const gu=g.find(x=>x.id==='beginner-bass-guitars');
const s=gu.sections[1];
console.log('heading:', JSON.stringify(s.heading));
console.log('heading_es:', JSON.stringify(s.heading_es));
console.log('products:', s.products);
console.log('content first 200:', s.content.slice(0,200));