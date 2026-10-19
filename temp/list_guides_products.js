const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

// Extraer todos los productos de cada guía
const data = guides.map(g => {
  const products = [];
  if (g.productTable && g.productTable.columns) {
    g.productTable.columns.forEach(c => products.push(c.title_es || c.title));
  }
  return { id: g.id, title: g.title, count: products.length, products };
}).filter(d => d.count > 0);

const total = data.reduce((a, b) => a + b.count, 0);
console.log('Total guías: ' + guides.length);
console.log('Guías con tabla de productos: ' + data.length);
console.log('Total productos: ' + total);
console.log('');

// Guardar para referencia
fs.writeFileSync(B + 'temp/guides_products.json', JSON.stringify(data, null, 2), 'utf8');

// Mostrar las guías con más productos
data.sort((a, b) => b.count - a.count);
data.slice(0, 20).forEach(d => {
  console.log(d.count + ' productos: ' + d.id + ' - ' + d.title);
});