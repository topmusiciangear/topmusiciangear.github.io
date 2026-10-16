const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'best-guitar-home-office');
const t = JSON.stringify(s);
[...t.matchAll(/<a href="\/guides\/best-guitar\.html"[^>]*>([\s\S]*?)<\/a>/g)].forEach(m =>
  console.log('anchor: "' + m[1].replace(/<[^>]+>/g, '').trim() + '"'));
const i = t.indexOf('/guides/best-guitar.html');
console.log('\ncontexto: ...' + t.slice(Math.max(0, i - 250), i + 150).replace(/<[^>]+>/g, ' ').replace(/\\"/g, '"').replace(/\s+/g, ' ').trim() + '...');
