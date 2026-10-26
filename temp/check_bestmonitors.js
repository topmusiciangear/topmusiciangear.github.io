const fs=require('fs');
const g=JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json','utf8'));
const gu=g.find(x=>x.id==='best-monitors');
const t=JSON.stringify(gu);
console.log('current best-monitors has WS-6.2:', t.includes('Kali Audio WS-6.2'));
console.log('featuredProducts includes 300:', (gu.featuredProducts||[]).includes(300));
console.log('has empty product-name span:', t.includes('product-name"> </span>'));