const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));
const ids = [1021, 1019, 1020, 1008, 1013, 1018, 1016, 1023, 1014, 1015];
ids.forEach(id => {
  const p = products.find(x => x.id === id);
  console.log(id + ' ' + p.title.slice(0, 42) + ' | precio lista catalogo=' + p.price + ' | PB url=' + (p.stores.pluginboutique || 'sin PB').replace('https://www.pluginboutique.com/product/', ''));
});