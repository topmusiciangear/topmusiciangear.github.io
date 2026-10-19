const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'best-headphones-for-mixing');
// Mira la estructura de faq de otra guia con faq propio
const conFaq = guides.find(x => Array.isArray(x.faq) && x.faq.length > 2);
console.log('Guia con faq:', conFaq.id, '| entradas:', conFaq.faq.length);
console.log(JSON.stringify(conFaq.faq.slice(0, 2), null, 1));
