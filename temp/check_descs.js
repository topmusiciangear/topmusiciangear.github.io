const p = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');
[494, 626].forEach(id => {
  const x = p.find(y => y.id === id);
  console.log(id, 'DESC:', x.desc);
  console.log(id, 'DESC_ES:', x.desc_es);
});
