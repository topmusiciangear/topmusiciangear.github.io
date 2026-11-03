const fs = require('fs');
const guidesPath = 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(guidesPath,'utf8'));
const idx = guides.findIndex(g => g.id === 'tuners-bass-guitar');
if (idx === -1) { console.error('not found'); process.exit(1); }
const newGuide = JSON.parse(fs.readFileSync('temp/guide_full.json','utf8'));
guides[idx] = newGuide;
fs.writeFileSync(guidesPath, JSON.stringify(guides,null,2));
console.log('replaced at', idx);
