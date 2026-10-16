const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'best-guitar-home-office');
const t = JSON.stringify(s);
[...t.matchAll(/<a href="\/guides\/best-guitar\.html"[^>]*>([\s\S]{0,120}?)(<\/a>|<)/g)].forEach(m =>
  console.log('anchor: "' + m[1].replace(/<[^>]+>/g, '').trim().slice(0, 80) + '"'));
let i = -1, n = 0;
while ((i = t.indexOf('/guides/best-guitar.html', i + 1)) > -1 && n < 6) {
  n++;
  console.log('\n#' + n + ': ...' + t.slice(Math.max(0, i - 120), i + 120).replace(/\\"/g, '"').replace(/\s+/g, ' ').trim().slice(0, 240) + '...');
}
