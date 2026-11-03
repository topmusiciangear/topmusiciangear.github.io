const fs=require('fs');
const d=JSON.parse(fs.readFileSync('C:\\Users\\Daniel\\projects\\topmusiciangear\\data\\products.json'));
[9001,9007,9008,61].forEach(id=>{
  const p=d.find(x=>x.id===id);
  console.log(id, p? p.title : 'not found');
});
