const fs = require('fs');
const html = fs.readFileSync('guides/best-32-channel-digital-mixers.html','utf8');
const faqDivs = html.match(/<div class="guide-faq-item">/g);
console.log('FAQ div count:', faqDivs ? faqDivs.length : 0);
const tableDivs = html.match(/<div class="guide-table-wrapper">/g);
console.log('Table wrapper count:', tableDivs ? tableDivs.length : 0);
const verdictDivs = html.match(/<div class="guide-verdict">/g);
console.log('Verdict div count:', verdictDivs ? verdictDivs.length : 0);
// Check for product cards section
const productCards = html.match(/guide-products-cards/g);
console.log('Product cards:', productCards ? productCards.length : 0);
// Check for repeated section headings
const h2s = html.match(/<h2[^>]*>/g);
console.log('H2 headings:', h2s ? h2s.length : 0);
if (h2s) h2s.forEach((h,i) => console.log('  H2-' + (i+1) + ':', h.substring(0,80)));
