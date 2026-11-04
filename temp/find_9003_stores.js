const fs=require('fs');
const txt=fs.readFileSync('C:\\Users\\Daniel\\projects\\topmusiciangear\\data\\products.json','utf8');
const idx=txt.indexOf('"id": 9003');
const end=txt.indexOf('}', idx+5000);
console.log(txt.substring(idx, end));
