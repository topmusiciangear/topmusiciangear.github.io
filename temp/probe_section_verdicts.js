const fs = require('fs');
const arr = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = arr.find(x => x.id === 'best-nylon-guitars-for-beginners');
console.log('section keys:', Object.keys(g.sections[0]).join(','));
const strip = s => String(s || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
g.sections.forEach((s, i) => {
  console.log(`\n[${i}]`);
  for (const k of Object.keys(s)) {
    if (/verdict|tagline|summary|quick|rating|price|label/i.test(k)) console.log('  ', k, '=', JSON.stringify(s[k]).slice(0, 300));
  }
});
