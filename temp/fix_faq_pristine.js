const fs = require('fs');
const P = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const guides = JSON.parse(fs.readFileSync(P, 'utf8'));
const g = guides.find(x => x.id === 'best-interface');
const before = g.featuredSnippet.faq_a4_en;
g.featuredSnippet.faq_a4_en = before.split('pristine conversion').join('clean conversion');
console.log('cambiado:', before !== g.featuredSnippet.faq_a4_en);
fs.writeFileSync(P, JSON.stringify(guides, null, 2));