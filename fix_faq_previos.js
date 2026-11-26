const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const guide = guides.find(g => g.id === 'best-interface');
const fsn = guide.featuredSnippet;

// Fix FAQ 1
fsn.faq_a1_en = fsn.faq_a1_en.replace('redesigned clean previos', 'redesigned clean preamps');

// Fix FAQ 3
fsn.faq_a3_en = fsn.faq_a3_en.replace('runs Unison previo emulations', 'runs Unison preamp emulations');

// Fix FAQ 5
fsn.faq_a5_en = fsn.faq_a5_en.replace('console-grade Class-A previos', 'console-grade Class-A preamps');
fsn.faq_a5_en = fsn.faq_a5_en.replace('warm mic previos', 'warm mic preamps');

// Update the guide in the array
const idx = guides.findIndex(g => g.id === 'best-interface');
guides[idx] = guide;
fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2), 'utf8');

// Verify
const updated = guides.find(g => g.id === 'best-interface');
const fsn2 = updated.featuredSnippet;
console.log('=== VERIFICATION ===');
console.log('FAQ 1 has previos:', (fsn2.faq_a1_en.match(/previos/g)||[]).length);
console.log('FAQ 3 has previo:', (fsn2.faq_a3_en.match(/previo/g)||[]).length);
console.log('FAQ 5 has previos:', (fsn2.faq_a5_en.match(/previos/g)||[]).length);
console.log('FAQ 1:', fsn2.faq_a1_en.substring(0, 120));
console.log('FAQ 3:', fsn2.faq_a3_en.substring(0, 120));
console.log('FAQ 5:', fsn2.faq_a5_en.substring(0, 120));