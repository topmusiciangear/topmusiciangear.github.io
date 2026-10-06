const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const idx = guides.findIndex(g => g.id === 'best-digital-pianos');
const guide = guides[idx];
fs.writeFileSync('temp/guide_dump.json', JSON.stringify(guide, null, 2));
console.log('Written to temp/guide_dump.json');