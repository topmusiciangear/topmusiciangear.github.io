const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'fix-clipping-scarlett');

console.log('sections:');
g.sections.forEach((s, i) => {
  console.log('  Section ' + i + ':');
  console.log('  heading:   ' + s.heading);
  console.log('  heading_es:' + s.heading_es);
  console.log('  content:   ' + (s.content || '').substring(0, 200));
  console.log('  content_es:' + (s.content_es || '').substring(0, 200));
  console.log('');
});