const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')));
console.log('menciones: ' + (t.match(/compact-rhythm-devices/g) || []).length);
[...t.matchAll(/<a href="\/guides\/compact-rhythm-devices[^"]*"[^>]*>/g)].forEach(m =>
  console.log('tag: ' + m[0].slice(0, 120)));
