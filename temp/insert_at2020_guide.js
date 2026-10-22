const fs = require('fs');
const path = require('path');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';

const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const guide = JSON.parse(fs.readFileSync(B + 'temp/at2020_vs_p120.json', 'utf8'));

if (guides.some(g => g.id === guide.id)) {
  console.log('Guide already exists: ' + guide.id);
  process.exit(0);
}

const at = guides.findIndex(g => g.id === 'atc-vs-genelec');
if (at < 0) throw new Error('Insertion point not found');
guides.splice(at, 0, guide);

fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2) + '\n', 'utf8');
console.log('Inserted ' + guide.id + ' at index ' + at + '. Total guides: ' + guides.length);
console.log('Title: ' + guide.title);
console.log('TitleTag: ' + guide.titleTag + ' (' + guide.titleTag.length + ' chars)');
console.log('Description: ' + guide.description + ' (' + guide.description.length + ' chars)');
console.log('Description ES: ' + guide.description_es + ' (' + guide.description_es.length + ' chars)');
