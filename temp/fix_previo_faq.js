const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));

let fixes = 0;

guides.forEach(g => {
  if (!g.faqs) return;
  g.faqs.forEach((faq, i) => {
    ['a_es', 'a', 'q_es', 'q'].forEach(field => {
      if (!faq[field]) return;
      if (typeof faq[field] === 'string' && faq[field].includes('previolificador')) {
        const before = faq[field];
        faq[field] = faq[field].replace(/previolificadores/g, 'previos').replace(/previolificador/g, 'previo');
        if (faq[field] !== before) { fixes++; console.log('  ' + g.id + '.faqs[' + i + '].' + field); }
      }
      // Check nested arrays/objects
      if (Array.isArray(faq[field])) {
        faq[field].forEach((item, j) => {
          if (typeof item === 'string' && item.includes('previolificador')) {
            faq[field][j] = item.replace(/previolificadores/g, 'previos').replace(/previolificador/g, 'previo');
            fixes++;
            console.log('  ' + g.id + '.faqs[' + i + '].' + field + '[' + j + ']');
          }
        });
      }
    });
  });
});

fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('FAQ fixes:', fixes);
const remaining = (JSON.stringify(guides).match(/previolificador/g) || []).length;
console.log('Restantes en todo el corpus:', remaining);