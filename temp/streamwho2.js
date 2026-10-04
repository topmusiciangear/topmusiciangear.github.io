const P = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');
[239, 240, 244, 246, 260, 261, 327].forEach(id => {
  const p = P.find(x => x.id === id);
  console.log(id, ':', p ? p.title : 'MISSING');
});
const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const g = G.find(x => x.id === 'stream-controllers');
console.log('BestFor vals:', g.productTable.rows.find(r => r.label === 'Best For').values.map(v => v.value).join(' | '));
console.log('Type vals:', g.productTable.rows.find(r => r.label === 'Type').values.map(v => v.value).join(' | '));