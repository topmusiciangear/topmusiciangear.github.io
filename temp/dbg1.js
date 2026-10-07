const fs = require('fs');
const btn = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
const prod = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8');
console.log('btn €777:', btn.includes('€777'));
console.log('btn art-GIT0054641:', btn.includes('art-GIT0054641-000'));
console.log('prod art-GIT0054641:', prod.includes('art-GIT0054641-000'));
console.log('btn £635:', btn.includes('£635'));
