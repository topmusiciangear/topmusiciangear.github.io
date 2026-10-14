const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const img = guides.find(x => x.id === 'beginner-bass-guitars').image;
guides.filter(x => x.image === img).forEach(x => console.log(x.id + ' | ' + x.title));
console.log('---');
const P = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
const arr = Array.isArray(P) ? P : P.products;
arr.filter(p => (p.img || '').includes('67660')).forEach(p => console.log('producto: ' + p.id + ' ' + p.title + ' | ' + p.img));