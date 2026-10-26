const fs=require('fs');
const B='C:/Users/Daniel/projects/topmusiciangear/';
const p=JSON.parse(fs.readFileSync(B+'data/products.json','utf8'));
const pr=p.find(x=>x.id===303);
pr.desc='The Genelec 8010A proves that reference monitoring does not need a big box.';
pr.desc_es='El Genelec 8010A demuestra que el monitoreo de referencia no necesita una caja grande.';
fs.writeFileSync(B+'data/products.json', JSON.stringify(p,null,2),'utf8');
console.log('done');