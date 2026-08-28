var fs = require('fs');
var h = fs.readFileSync('guides/best-32-channel-digital-mixers.html', 'utf8');

// Count tables
var guideTable = (h.match(/guide-table/g) || []).length;
var guideComp = (h.match(/guide-comp-table/g) || []).length;
console.log('guide-table count:', guideTable);
console.log('guide-comp-table count:', guideComp);

// Count FAQ items
var faqItems = (h.match(/guide-faq-item/g) || []).length;
console.log('guide-faq-item count:', faqItems);

// Check for old FAQ content
var hasOldFaq = h.includes('best audio interface');
console.log('Has old FAQ (interfaces):', hasOldFaq);

// Check for old table content
var hasOldTable = h.includes('Ideal para');
console.log('Has old table with prices:', hasOldTable);

// Check SQ-6 192kHz reference
var has192 = h.includes('192 kHz');
console.log('Has 192 kHz:', has192);

// Verify verdict section
var hasVerdict = h.includes('Verdict');
console.log('Has verdict:', hasVerdict);
