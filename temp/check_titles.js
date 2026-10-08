const p = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');
[105, 493, 494, 109, 108, 152, 106, 153, 626, 630, 631, 233, 235, 236, 495, 496].forEach(id => {
  const x = p.find(y => y.id === id);
  console.log(id, '| TITLE:', x.title, '| TITLE_ES:', x.title_es);
});
