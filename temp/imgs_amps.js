const p = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');
[71, 557, 73, 74, 76, 555, 75, 556, 503, 294, 483].forEach(id => {
  const x = p.find(y => y.id === id);
  console.log(id, (x.img || 'NOIMG').slice(0, 80));
});
