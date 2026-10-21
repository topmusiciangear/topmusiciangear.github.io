const fs = require('fs');
const j = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
console.log('tipo raiz:', Array.isArray(j) ? 'array de ' + j.length : typeof j);
for (const g of j) {
  const s = JSON.stringify(g);
  if (s.includes('hacia adentro') || s.includes('faq_a4_es')) {
    console.log('\nGUIA:', g.id, '|', g.title);
    for (const k of Object.keys(g)) {
      if (/faq/i.test(k)) console.log('  ' + k + ': ' + String(g[k]).slice(0, 400));
    }
    if (g.faq) console.log('  faq array len:', g.faq.length);
  }
}
