const fs = require('fs');
const file = process.argv[2] || 'guides/best-monitors.html';
const h = fs.readFileSync(file, 'utf8');
const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
let m;
const schemas = [];
while ((m = re.exec(h)) !== null) {
  try { schemas.push(JSON.parse(m[1])); } catch (e) { schemas.push({ _parseError: true }); }
}
console.log('bloques JSON-LD: ' + schemas.length);
schemas.forEach(s => {
  const items = Array.isArray(s) ? s : (s['@graph'] || [s]);
  (Array.isArray(items) ? items : [items]).forEach(it => {
    if (!it || !it['@type']) return;
    const t = Array.isArray(it['@type']) ? it['@type'].join('+') : it['@type'];
    let extra = '';
    if (String(t).includes('Product')) {
      const rev = (it.review || []).length;
      const agg = it.aggregateRating ? it.aggregateRating.ratingValue + '/' + it.aggregateRating.reviewCount : '-';
      extra = ' reviews=' + rev + ' agg=' + agg;
    }
    if (String(t).includes('Question')) return;
    console.log(' - ' + t + extra);
  });
});
const faqCount = (h.match(/"@type":"Question"/g) || []).length;
console.log('FAQ questions: ' + faqCount);
