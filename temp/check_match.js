const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

// Normaliza: quita acentos, minusculas, quita palabras genericas de categoria
const norm = s => (s || '')
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/\b(altavoz|active|active speaker|pasivo|passive|speaker|monitor|guitarra|bajo|amplificador|micro|mic|interface|interfaz)\b/g, '')
  .replace(/[^a-z0-9]/g, '');

const byNorm = {};
products.forEach(p => {
  [p.title, p.title_es].forEach(t => {
    if (!t) return;
    const k = norm(t);
    if (!k) return;
    (byNorm[k] = byNorm[k] || []).push(p);
  });
});

let tablas = 0, filas = 0, huerfanas = 0;
const ejemplos = [];

guides.forEach(g => {
  if (!g.productTable || !g.productTable.columns) return;
  tablas++;
  const vistos = new Set();
  g.productTable.columns.forEach(c => {
    const n = c.title_es || c.title;
    filas++;
    if (vistos.has(n)) return;
    vistos.add(n);
    const exact = products.find(p => p.title === n || p.title_es === n);
    if (exact) return;
    const porNorm = byNorm[norm(n)] || [];
    const unicos = [...new Set(porNorm)];
    if (unicos.length === 0) {
      huerfanas++;
      if (ejemplos.length < 25) ejemplos.push(g.id + ' -> ' + n);
    } else if (unicos.length > 1) {
      if (ejemplos.length < 25) ejemplos.push(g.id + ' -> ' + n + ' (AMBIGUO: ' + unicos.length + ')');
    }
  });
});

console.log('Guias con productTable: ' + tablas);
console.log('Filas totales: ' + filas);
console.log('Filas cuyo nombre NO resuelve a ningun producto (tras normalizar): ' + huerfanas);
console.log('\nEjemplos:');
ejemplos.forEach(e => console.log('   ' + e));
