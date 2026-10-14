const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));

console.log('=== ESTRUCTURA DE FAQs ===');
let faqCount = 0;
let faqWithEs = 0;
let faqMissingEs = 0;

guides.forEach(g => {
  const faqFields = ['faqs', 'faq', 'faq_es', 'faqs_es', 'faqData', 'faq_data'];
  faqFields.forEach(field => {
    if (g[field] && Array.isArray(g[field])) {
      g[field].forEach(f => {
        if (!f) return;
        faqCount++;
        if (f.a_es || f.answer_es) faqWithEs++;
        else faqMissingEs++;
      });
    }
  });
});

console.log('Guías con FAQs:', guides.filter(g => g.faqs || g.faq || g.faq_es || g.faqs_es || g.faqData || g.faq_data).length);
console.log('Total FAQs:', faqCount);
console.log('Con ES:', faqWithEs);
console.log('Sin ES:', faqMissingEs);

// Show structure of first guide with FAQs
const firstGuide = guides.find(g => g.faqs && Array.isArray(g.faqs) && g.faqs.length > 0 && g.faqs[0]);
if (firstGuide) {
  console.log('\n=== Estructura de FAQ en', firstGuide.id, '===');
  console.log(JSON.stringify(firstGuide.faqs[0], null, 2));
}

// Check all possible FAQ locations
const faqLocations = {};
guides.forEach(g => {
  Object.keys(g).forEach(key => {
    if (key.toLowerCase().includes('faq')) {
      faqLocations[key] = (faqLocations[key] || 0) + 1;
    }
  });
});
console.log('\n=== Campos FAQ encontrados ===');
console.log(JSON.stringify(faqLocations));