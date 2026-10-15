const fs = require('fs');
const raw = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8');
const p = JSON.parse(raw);

const x = p.find(y => y.id === 675);
console.log('=== 675 sE Electronics X1 R ===');
console.log(JSON.stringify(x, null, 1));

console.log('\n=== otras referencias a "X1" en el catalogo ===');
p.filter(y => /X1\s*R/i.test(y.title || '')).forEach(y =>
  console.log('  ' + y.id + '  ' + y.title + '  ->  ' + y.img));

console.log('\n=== como son las img de otros sE Electronics ===');
p.filter(y => /sE Electronics/i.test(y.title || '')).forEach(y =>
  console.log('  ' + y.id + '  ' + y.title + '\n      ' + y.img));
