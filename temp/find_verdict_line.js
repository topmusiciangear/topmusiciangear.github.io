const fs = require('fs');
const raw = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8');
const lines = raw.split('\n');
const gStart = lines.findIndex(l => l.includes('"id": "studio-subwoofers"'));
const gEnd = lines.findIndex(l => l.includes('"id": "studio-subwoofers-setup"'));
console.log('bloque lineas', gStart + 1, '→', gEnd);
for (let i = gStart; i < gEnd; i++) {
  const l = lines[i].trim();
  if (l.startsWith('"verdict":') || l.startsWith('"verdict_es":')) {
    console.log('L' + (i + 1) + ' len=' + lines[i].length);
    const j = lines[i].indexOf('product-name');
    console.log('  primera product-name en pos', j, ':', JSON.stringify(lines[i].slice(j - 30, j + 120)));
  }
}
