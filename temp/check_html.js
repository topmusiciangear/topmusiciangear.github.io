const fs = require('fs');
const path = 'C:/Users/Daniel/projects/topmusiciangear/guides/best-monitors.html';
const content = fs.readFileSync(path, 'utf8');

console.log('=== BUSCANDO PRODUCTOS EN HTML ===');

// Buscar los product cards
const cardRegex = /<div class="product-card"[^>]*>[\s\S]*?<\/div>/g;
const matches = content.match(cardRegex);
if (matches) {
  console.log('Total product cards:', matches.length);
  matches.slice(0, 3).forEach((m, i) => {
    console.log('Card ' + i + ' (primeros 300 chars):');
    console.log(m.substring(0, 300));
    console.log('---');
  });
} else {
  console.log('No product cards encontrados');
}

// Buscar por nombres de productos
const products = ['JBL 305P', 'Kali Audio LP-6', 'KRK Rokit 7', 'Yamaha HS8', 'Adam Audio A7V', 'Genelec 8010A', 'Neumann KH 80', 'Genelec 8351B', 'Kali IN-UNF', 'Kali LP-UNF', 'Focal Shape 65'];
products.forEach(name => {
  const regex = new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
  const count = (content.match(regex) || []).length;
  if (count > 0) console.log(name + ': ' + count + ' ocurrencias');
});