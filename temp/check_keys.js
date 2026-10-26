const fs=require('fs');
const g=JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json','utf8'));
const gu=g.find(x=>x.id==='best-monitors-for-small-rooms');
console.log('keys with title/tag/h1:', Object.keys(gu).filter(k=>/title|tag|h1|heading/i.test(k)));
console.log('titleTag:', gu.titleTag);
console.log('h1:', gu.h1);