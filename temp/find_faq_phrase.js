const fs = require('fs');
const j = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
for (const g of j) {
  const s = JSON.stringify(g);
  if (s.includes('hacia adentro')) {
    console.log('GUIA:', g.id, '|', g.title);
    const keys = Object.keys(g).filter(k => /faq/i.test(k));
    for (const k of keys) console.log(k + ': ' + String(g[k]).slice(0, 600));
  }
}
