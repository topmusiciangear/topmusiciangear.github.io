const fs=require('fs');
const data=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
const g=data.find(x=>x.id==='tuners-bass-guitar');
console.log(JSON.stringify(g.verdict_es));
