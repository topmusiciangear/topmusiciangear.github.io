// En que guias aparece cada id de producto (via openReviewModal) y que precios
// aparecen dentro de su card.
const fs = require('fs');
const ids = process.argv.slice(2);
const guides = fs.readdirSync('guides').filter(f => f.endsWith('.html'));
for (const id of ids) {
  const hits = [];
  for (const f of guides) {
    const html = fs.readFileSync('guides/' + f, 'utf8');
    const re = new RegExp('openReviewModal\\(' + id + '\\)');
    if (!re.test(html)) continue;
    const at = html.search(re);
    const start = html.lastIndexOf('<div class=', at);
    const end = html.indexOf('<div class="guide-product-caro', at + 10);
    const card = html.slice(Math.max(0, start), end > 0 ? end : at + 8000);
    const prices = [...new Set(card.match(/[$£€]\s?[\d][\d.,]*/g) || [])];
    const stores = [...new Set(card.match(/data-store="[a-z]+"/g) || [])];
    hits.push({ f, prices, stores, len: card.length });
  }
  console.log('\n=== id ' + id + ' en ' + hits.length + ' guia(s) ===');
  for (const h of hits) console.log('  ' + h.f.padEnd(42) + ' len ' + String(h.len).padEnd(6) + ' precios: ' + (h.prices.join(' ') || '(ninguno)') + '  | stores: ' + (h.stores.join(' ') || '(ninguno)'));
}
