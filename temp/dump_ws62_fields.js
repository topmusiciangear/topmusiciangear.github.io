const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const sub = g.find(x => x.id === 'studio-subwoofers');
const fields = [
  ['description', sub.description],
  ['description_es', sub.description_es],
  ['conclusion', sub.conclusion],
  ['conclusion_es', sub.conclusion_es],
  ['intro', sub.intro],
  ['intro_es', sub.intro_es],
  ['columns[3].title', sub.productTable.columns[3].title],
  ['columns[3].title_es', sub.productTable.columns[3].title_es],
  ['fs.text_en', sub.featuredSnippet.text_en],
  ['fs.text_es', sub.featuredSnippet.text_es],
  ['fs.faq_a5_en', sub.featuredSnippet.faq_a5_en],
  ['fs.faq_a5_es', sub.featuredSnippet.faq_a5_es],
  ['fs.faq_q5_en', sub.featuredSnippet.faq_q5_en],
  ['fs.faq_q5_es', sub.featuredSnippet.faq_q5_es]
];
fields.forEach(([k, v]) => {
  const hasGap = typeof v === 'string' && (/^[ :]/.test(v.trim()) || /product-name"> ?<\/span>/.test(v) || /\bThe is\b|\bEl es\b/.test(v));
  console.log((hasGap ? '**GAP** ' : 'ok     ') + k + ': ' + String(v).slice(0, 170));
});
