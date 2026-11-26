const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const guide = guides.find(g => g.id === 'best-interface');

// Fix English content
guide.sections[8].content = guide.sections[8].content
  .replace('that made the iD2 a favorite', 'that made the iD14 a favorite')
  .replace('drive headphones up to 600 ohms', 'drive headphones up to 300 ohms')
  .replace('Guitarists who only need one input and a compressor may prefer the Volt 2 Gen 2.', 'Guitarists who want a built-in analog compressor on the way in may prefer the Volt 276.');

// Fix Spanish content
guide.sections[8].content_es = guide.sections[8].content_es
  .replace('que hizo del iD2 un favorito', 'que hizo del iD14 un favorito')
  .replace('manejan auriculares de hasta 600 ohmios', 'manejan auriculares de hasta 300 ohmios')
  .replace('Guitarristas que solo necesitan una entrada y un compresor pueden preferir el Volt 2 Gen 2.', 'Guitarristas que quieren un compresor analógico integrado en la entrada pueden preferir el Volt 276.');

// Update the guide in the array
const idx = guides.findIndex(g => g.id === 'best-interface');
guides[idx] = guide;
fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2), 'utf8');

// Verify
const updated = guides.find(g => g.id === 'best-interface');
console.log('=== VERIFICATION ===');
console.log('EN has iD14 favorite:', updated.sections[8].content.includes('iD14 a favorite'));
console.log('EN has 300 ohms:', updated.sections[8].content.includes('300 ohms'));
console.log('EN has Volt 276 compressor:', updated.sections[8].content.includes('Volt 276'));
console.log('EN has old 600 ohms:', updated.sections[8].content.includes('600 ohms'));
console.log('EN has old Volt 2 Gen 2:', updated.sections[8].content.includes('Volt 2 Gen 2.'));
console.log('ES has iD14 favorite:', updated.sections[8].content_es.includes('iD14 un favorito'));
console.log('ES has 300 ohmios:', updated.sections[8].content_es.includes('300 ohmios'));
console.log('ES has Volt 276:', updated.sections[8].content_es.includes('Volt 276'));
console.log('ES has old 600 ohmios:', updated.sections[8].content_es.includes('600 ohmios'));