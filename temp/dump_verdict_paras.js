const fs = require('fs');
const gs = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = gs.find(x => x.id === 'best-studio-monitors-under-150');
for (const f of ['verdict', 'verdict_es']) {
  console.log('=== ' + f + ' ===');
  const ps = g[f].match(/<p>[\s\S]*?<\/p>/g) || [];
  ps.forEach((p, i) => console.log((i + 1) + '. ' + p.replace(/<[^>]+>/g, '').slice(0, 130)));
  console.log('total:', ps.length, '\n');
}
