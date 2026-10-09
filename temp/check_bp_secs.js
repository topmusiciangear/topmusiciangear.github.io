const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const guide = g.find(x => x.id === 'best-plugins');
guide.sections.forEach((s, i) => {
  const h = s.heading || '';
  if (/Pro-Q 4|Pro-C 3|Soundtoys|UAD Ultimate/.test(h)) {
    console.log('=== SEC ' + i + ' :: ' + h + ' | products=' + JSON.stringify(s.products));
    console.log('EN len:', (s.content || '').length, '| ES len:', (s.content_es || '').length);
    console.log('EN:', (s.content || '').slice(0, 300).replace(/\n/g, ' '));
    console.log('ES:', (s.content_es || '').slice(0, 300).replace(/\n/g, ' '));
    console.log('');
  }
});
