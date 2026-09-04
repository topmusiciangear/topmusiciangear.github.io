const fs = require('fs');
const html = fs.readFileSync('guides/best-beginner-electric-guitar.html', 'utf8');

// Products list is embedded as JSON in the page. Try to locate "id":
const ids = [...new Set((html.match(/"id":\s*(\d+)/g) || []).map(x => x.match(/\d+/)[0]))];
console.log('IDs referenced in page JSON:', ids.join(', '));

// Simpler: read data/guides.json to find this guide's productIds
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = guides.find(x => x.slug === 'best-beginner-electric-guitar');
console.log('guide products from data/guides.json:', g ? JSON.stringify(g.productIds) : 'NOT FOUND');

const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
if (g) {
  for (const pid of g.productIds) {
    const p = products.find(x => String(x.id) === String(pid));
    if (!p) { console.log(pid, '-> NOT IN CATALOG'); continue; }
    console.log(`--- id ${pid} | ${p.title}`);
    console.log('    img:', (p.img||'').slice(0,80));
    console.log('    amazon:', p.stores ? p.stores.amazon : '(none)');
    console.log('    stores:', p.stores ? Object.keys(p.stores).join(',') : 'none');
  }
}