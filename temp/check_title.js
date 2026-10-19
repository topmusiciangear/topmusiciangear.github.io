const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'best-guitar-home-office');

console.log('title:     ' + g.title);
console.log('title_es:  ' + g.title_es);
console.log('IGUALES: ' + (g.title === g.title_es));
console.log('\nQUERIDO: "Las mejores guitarras para trabajo remoto: silenciosas y compactas (Pros y Contras)"');