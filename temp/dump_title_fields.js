const fs = require('fs');
const gs = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = gs.find(x => x.id === 'best-studio-monitors-under-150');
console.log(Object.keys(g).filter(k => /title|desc|h1|slug|meta/i.test(k)).map(k => k + ' = ' + JSON.stringify(g[k]).slice(0, 140)).join('\n'));
