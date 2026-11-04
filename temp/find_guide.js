const fs=require('fs');
const g=JSON.parse(fs.readFileSync('C:\\Users\\Daniel\\projects\\topmusiciangear\\data\\guides.json','utf8'));
const guide=g.find(x=>x.id==='tuners-bass-guitar');
console.log(JSON.stringify(guide, null, 2));
