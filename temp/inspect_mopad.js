const fs = require('fs');
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
for (const id of [468, 648, 650]) {
  const p = products.find(x => x.id === id);
  console.log('\n=== id ' + id + ' ===');
  console.log(JSON.stringify(p, null, 1));
}

const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
console.log('\n=== guias que mencionan MoPAD / id 650 ===');
for (const g of guides) {
  const s = JSON.stringify(g);
  if (/\b650\b/.test(s) || /MoPAD/i.test(s)) {
    console.log('\n--- ' + g.id + ' | ' + g.title + ' ---');
    // lineas relevantes
    const re = /[^"]{0,160}MoPAD[^"]{0,160}/gi;
    let m, n = 0;
    while ((m = re.exec(s)) && n < 8) { console.log('  ...' + m[0].replace(/\\n/g, ' ') + '...'); n++; }
    if (/\b650\b/.test(s)) console.log('  [menciona el id 650]');
  }
}
