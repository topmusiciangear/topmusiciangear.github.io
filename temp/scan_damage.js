const fs=require('fs');
const t=fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json','utf8');
console.log('empty product-name spans:', (t.match(/product-name"> <\/span>/g)||[]).length);
console.log('The is the:', (t.match(/The is the /g)||[]).length);
console.log('El es el:', (t.match(/El es el /g)||[]).length);
console.log('The is the budget:', (t.match(/The is the budget/g)||[]).length);