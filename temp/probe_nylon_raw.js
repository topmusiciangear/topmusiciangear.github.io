const fs = require('fs');
const t = fs.readFileSync('data/guides.json', 'utf8');
const start = t.indexOf('"id": "best-nylon-guitars-for-beginners"');
const end = t.indexOf('"id": "', start + 10);
const region = t.slice(start, end);
const needles = [
  'anti-frustration',
  'Solid European spruce top with rosewood',
  'spruce top and mahogany back and sides, 46 mm nut',
  'Laminate construction limits projection',
  'Solid spruce top with mahogany back and sides sounds',
];
for (const n of needles) {
  const i = region.indexOf(n);
  console.log('--- ' + n + ' @ ' + i);
  if (i > 0) console.log(region.slice(Math.max(0, i - 260), i + 120));
}
console.log('\nREGION LEN', region.length, 'guide span', start, end);
