const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const guia = g.find(x => x.id === 'starter-studio');

console.log('=== INTRO ACTUAL ===\n');
console.log((guia.intro || '').replace(/<\/p>/g, '</p>\n'));
console.log('\n=== INTRO_ES ACTUAL ===\n');
console.log((guia.intro_es || '').replace(/<\/p>/g, '</p>\n'));

console.log('\n\n=== DONDE QUEDAN LOS $925 ===\n');
const json = JSON.stringify(guia, null, 1);
const re = /\$925/g;
let m, n = 0;
while ((m = re.exec(json)) !== null && n < 6) {
  console.log('\n--- #' + (++n) + ' ---');
  console.log(json.slice(Math.max(0, m.index - 220), m.index + 220).replace(/\s+/g, ' '));
}
