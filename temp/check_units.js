const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

// Unidades de los auriculares
const hp = products.filter(p => p.category === 'headphones');
const conteo = {};
hp.forEach(p => { const u = p.unit || '(sin unit)'; conteo[u] = (conteo[u] || 0) + 1; });
console.log('Unidades en auriculares:', JSON.stringify(conteo));

console.log('\nMuestras:');
['Audeze MM-500', 'Neumann NDH 30', 'Neumann NDH 20', 'Audeze LCD-X', 'Sennheiser HD 600', 'Beyerdynamic DT 990 Pro', 'Sony MDR-7506', 'Audio-Technica ATH-M50x']
  .forEach(n => {
    const p = products.find(x => x.title === n || x.title_es === n);
    console.log('  ' + (p ? (p.title + ' -> unit=' + p.unit) : (n + ' -> NO EXISTE')));
  });

// Categorias que usan 'each'
const cats = {};
products.filter(p => p.unit === 'each').forEach(p => { cats[p.category] = (cats[p.category] || 0) + 1; });
console.log('\nCategorias con unit=each:', JSON.stringify(cats));
