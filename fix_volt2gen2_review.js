const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

const guide = guides.find(g => g.id === 'best-interface');

// Fix English content
guide.sections[9].content = guide.sections[9].content
  .replace('The Gen 2 removed MIDI I/O that the original Volt 2 Gen 2 had', 'The Gen 2 removed the MIDI I/O that the original Volt 2 had')
  .replace('At around $199 it is the cheapest way into the UA sound', 'At around $219 it is the cheapest way into the UA sound')
  .replace('for about $100 more', 'for about $70–$80 more');

// Fix Spanish content
guide.sections[9].content_es = guide.sections[9].content_es
  .replace('El Gen 2 eliminó el MIDI I/O que tenía el Volt 2 Gen 2 original', 'El Gen 2 eliminó el MIDI I/O que tenía el Volt 2 original')
  .replace('A unos $199 es la forma más barata de entrar en el sonido UA', 'A unos $219 es la forma más barata de entrar en el sonido UA')
  .replace('por unos $100 más', 'por unos $70–$80 más');

// Fix quick facts for product 55
const p55 = products.find(p => p.id === 55);
if (p55 && p55.facts && p55.facts[0]) {
  p55.facts[0].value = '2-in / 2-out';
  console.log('Updated quick facts: 2-in / 4-out → 2-in / 2-out');
}

// Update the guide in the array
const idx = guides.findIndex(g => g.id === 'best-interface');
guides[idx] = guide;
fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
fs.writeFileSync('data/products.json', JSON.stringify(products, null, 2), 'utf8');

// Verify
const updated = guides.find(g => g.id === 'best-interface');
console.log('=== VERIFICATION ===');
console.log('EN has old Volt 2 Gen 2 had:', updated.sections[9].content.includes('original Volt 2 Gen 2 had'));
console.log('EN has original Volt 2 had:', updated.sections[9].content.includes('original Volt 2 had'));
console.log('EN has $199:', updated.sections[9].content.includes('$199'));
console.log('EN has $219:', updated.sections[9].content.includes('$219'));
console.log('EN has $100 more:', updated.sections[9].content.includes('$100 more'));
console.log('EN has $70–$80 more:', updated.sections[9].content.includes('$70–$80 more'));
console.log('ES has old Volt 2 Gen 2 original:', updated.sections[9].content_es.includes('Volt 2 Gen 2 original'));
console.log('ES has Volt 2 original:', updated.sections[9].content_es.includes('Volt 2 original'));
console.log('ES has $199:', updated.sections[9].content_es.includes('$199'));
console.log('ES has $219:', updated.sections[9].content_es.includes('$219'));