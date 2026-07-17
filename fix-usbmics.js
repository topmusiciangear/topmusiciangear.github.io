const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

// Fix usb-mics Q1 EN - answer is a fragment
const g = guides.find(x => x.id === 'usb-mics');
g.featuredSnippet.faq_a1_en = 'Yes, the Shure SM57 is recommended because it has recorded guitar amps on more hit records than any other microphone. Priced at $99, this product holds a 4.7/5 user rating.';

console.log('Fixed usb-mics Q1 EN');
console.log('Before: Yes, the same SM57 that has recorded...');
console.log('After: ' + g.featuredSnippet.faq_a1_en);

fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
