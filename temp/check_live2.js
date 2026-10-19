const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const html = fs.readFileSync(B + 'guides/best-headphones-for-mixing_es.html', 'utf8');

// Secciones de FAQ
const faqBlock = html.match(/<div class="guide-faq">[\s\S]*?<\/div>\s*<\/div>/);
const faqCount = (html.match(/guide-faq-question/g) || []).length;

// Productos: el grid principal
const grid = html.match(/guide-products-cards">([\s\S]*?)<\/div>\s*<\/div>/);
const cardsInGrid = grid ? (grid[1].match(/guide-product-card-title/g) || []).length : 0;

// Total de cards en la pagina (incluye secciones de guias relacionadas)
const totalCards = (html.match(/guide-product-card-title/g) || []).length;

console.log('FAQs: ' + faqCount);
console.log('Cards en el grid principal: ' + cardsInGrid);
console.log('Cards totales en la pagina (incluye related): ' + totalCards);

// Listar los productos del grid principal
if (grid) {
  const titles = (grid[1].match(/guide-product-card-title">([^<]+)/g) || []).map(t => t.replace(/.*>/, ''));
  console.log('\nProductos del grid:');
  titles.forEach(t => console.log('  - ' + t));
}
