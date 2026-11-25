const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

let guide = guides.find(g => g.id === 'best-digital-mixers');
if (guide) {
  guide.title = guide.title.replace('Best digital Mixers', 'Best Digital Mixers');
  guide.titleTag = guide.titleTag.replace('Best digital Mixers', 'Best Digital Mixers');
  console.log('Fixed title:', guide.title);
  console.log('Fixed titleTag:', guide.titleTag);
  fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
  console.log('Saved guides.json');
} else {
  console.log('Guide not found');
}