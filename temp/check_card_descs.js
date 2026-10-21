const fs = require('fs');
const path = require('path');

function cards(file) {
  const s = fs.readFileSync(file, 'utf8');
  const out = [];
  const parts = s.split('<div class="guide-product-card">').slice(1);
  for (const c of parts) {
    const name = (c.match(/guide-product-card-title">([^<]+)</) || [])[1];
    const desc = (c.match(/guide-product-card-desc">([\s\S]*?)<\/div>/) || [])[1] || '';
    out.push({ name, desc });
  }
  return out;
}

const files = fs.readdirSync('guides').filter(f => f.endsWith('.html'));
const money = /(\$|€|£)\s?\d|\b\d[\d.,]*\s?(USD|EUR|GBP|dollars?|euros?)\b/i;
let bad = 0, total = 0;
const examples = [];
for (const f of files) {
  for (const c of cards(path.join('guides', f))) {
    total++;
    if (money.test(c.desc)) {
      bad++;
      if (examples.length < 12) examples.push(f + ' | ' + c.name + ' | ' + c.desc);
    }
  }
}
console.log('descs revisadas:', total, '| con precio:', bad);
examples.forEach(e => console.log('  ' + e));

for (const f of ['guides/best-pa-speakers.html', 'guides/best-pa-speakers_es.html', 'guides/monitor-setup.html', 'guides/monitor-setup_es.html']) {
  console.log('\n' + f);
  for (const c of cards(f)) {
    if (/PRX915|UMIK|MoPAD|MS-100|ISO-200|K&M 26722|HS8/.test(c.name)) {
      console.log('  ' + c.name);
      console.log('    ' + c.desc);
    }
  }
}
