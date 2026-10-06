const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = require(DIR + 'data/guides.json');
const g = G.find(x => x.id === 'best-digital-pianos');
const f = g.featuredSnippet;
for (let i = 1; i <= 6; i++) {
  console.log('=== Q' + i + ' EN:', (f['faq_q' + i + '_en'] || '').slice(0, 110));
  console.log('    A' + i + ' EN:', (f['faq_a' + i + '_en'] || '').slice(0, 400));
}
console.log('\n=== CONCLUSION EN ===');
console.log(g.conclusion);
console.log('\n=== CONCLUSION ES ===');
console.log(g.conclusion_es);
