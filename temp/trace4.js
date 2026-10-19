const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const overrides = require(B + 'temp/score_overrides.js');
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

// ¿existe la clave de la guia en overrides?
console.log('Guias en overrides:', Object.keys(overrides).length);
['best-electric-guitar', 'best-parlor-guitars', 'best-reverb-delay', 'budget-headphones', 'mics-for-creators', 'monitor-setup']
  .forEach(g => console.log('  ' + g + ': ' + (overrides[g] ? Object.keys(overrides[g]).length + ' productos' : 'NO EXISTE')));

// ¿Products.json está escrito con scores viejos?
const sh = products.find(p => p.title.includes('Ultra II'));
console.log('\nproducts.json Ultra II score:', sh.score, '(esperado 9.8)');

// ¿Está products.json READ-ONLY o algo lo re-sincroniza?
const st = fs.statSync(B + 'data/products.json');
console.log('mtime products.json:', st.mtime.toISOString());
