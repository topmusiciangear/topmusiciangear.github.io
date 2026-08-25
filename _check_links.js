const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
let count = 0;
g.forEach(h => {
  const texts = [
    h.intro, h.conclusion, h.conclusion_es,
    ...h.sections.map(s => s.content),
    ...h.sections.map(s => s.content_es)
  ];
  texts.forEach(t => {
    if (!t) return;
    const links = [...t.matchAll(/<a\s+href="([^"]+)"[^>]*>([^<]+)<\/a>/g)];
    links.forEach(m => {
      if (!m[0].includes('guide-link-btn')) {
        count++;
        console.log(`${h.id}: ${m[0].substring(0, 100)}`);
      }
    });
  });
});
console.log('Total links without guide-link-btn:', count);
