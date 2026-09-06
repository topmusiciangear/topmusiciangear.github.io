const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const o = g.find(x => x.id === 'pro-mixers');
const v = o.verdict_es;
const n = v.split('El M32R LIVE es la elección profesional cuando necesitas').join('El M32R LIVE es la opción profesional cuando necesitas');
if (v !== n) { o.verdict_es = n; fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8'); console.log('FIXED', JSON.stringify(n.slice(0, 120))); }
else console.log('NOT FOUND');