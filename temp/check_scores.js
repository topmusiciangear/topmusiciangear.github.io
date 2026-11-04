const fs=require('fs');
const products=JSON.parse(fs.readFileSync('C:\\Users\\Daniel\\projects\\topmusiciangear\\data\\products.json'));
const scores=JSON.parse(fs.readFileSync('C:\\Users\\Daniel\\projects\\topmusiciangear\\js\\guide-scores.js','utf8').match(/"tuners-bass-guitar":\s*({[\s\S]*?})\n  }/)[1]);
console.log('products');
[9003,9004,98,9005,9006,9001,61,9007,9008].forEach(id=>{
  const p=products.find(x=>x.id===id);
  console.log(id, p.title);
});
