// Limpia fix-clipping-scarlett: quita verdictProsCons y featuredProducts.
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

fs.writeFileSync(B + 'temp/guides.before_clean3.json', JSON.stringify(guides, null, 2), 'utf8');

const g = guides.find(x => x.id === 'fix-clipping-scarlett');
g.verdictProsCons = [];
g.featuredProducts = [];

fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('verdictProsCons: ' + g.verdictProsCons.length);
console.log('featuredProducts: ' + g.featuredProducts);
console.log('Backup: temp/guides.before_clean3.json');
console.log('data/guides.json escrito.');