// check_guides_json.js — Estado actual de studio-subwoofers en data/guides.json tras el build
const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const sub = g.find(x => x.id === 'studio-subwoofers');
console.log('=== text_en ===');
console.log(sub.featuredSnippet.text_en);
console.log('\n=== faq_a5_en ===');
console.log(sub.featuredSnippet.faq_a5_en);
console.log('\n=== faq_a5_es ===');
console.log(sub.featuredSnippet.faq_a5_es);
console.log('\n=== Todas las faq_a* (claves) ===');
Object.keys(sub.featuredSnippet).filter(k => k.startsWith('faq')).forEach(k => {
  console.log('--- ' + k + ' ---');
  console.log(sub.featuredSnippet[k].slice(0, 150));
});
