const fs = require('fs');
const h = fs.readFileSync('guides/best-beginner-electric-guitar.html', 'utf8');
const re = /data-store="([a-z]+)"[^>]*href="([^"]*)"[^>]*>([\s\S]{0,700})?(?=<a |<\/div>)/g;
let m;
const seen = new Set();
while ((m = re.exec(h)) !== null) {
  const store = m[1], href = m[2];
  const snap = h.slice(m.index, m.index + 600);
  const price = (snap.match(/>(&#163;|£|\$)[^<]{1,15}/) || [])[0] || '';
  const cardTitle = (h.slice(0, m.index).match(/guide-product-card-title">([^<]+)/g) || []).pop();
  const key = store + '|' + href.slice(0, 60);
  if (seen.has(key)) continue;
  seen.add(key);
  if (href.includes('Amazon') || href.includes('amazon') || href.includes('gear4') || href.includes('G4M') || href.includes('JET')) {
    console.log(cardTitle || '(card?)', '->', store, price, href.slice(0, 100));
  }
}