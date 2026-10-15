const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
['atc-vs-genelec', 'studio-subwoofers-setup', 'kh750-vs-7050c', 'wireless-intercom-systems', 'best-stage-keyboards', 'j48-vs-rndi'].forEach(id => {
  const g = guides.find(x => x.id === id);
  const f = g.featuredSnippet || {};
  const n = [1,2,3,4,5,6,7,8].filter(i => f['faq_q' + i + '_en']).length;
  console.log('\n##### ' + id + ' (' + n + ') | ' + g.title);
  for (let i = 1; i <= 3; i++) {
    if (!f['faq_q' + i + '_en']) continue;
    console.log(' Q' + i + ': ' + f['faq_q' + i + '_en']);
    console.log('  ES: ' + f['faq_q' + i + '_es']);
    console.log(' A' + i + ': ' + String(f['faq_a' + i + '_en']).slice(0, 200));
  }
  console.log(' lineup: ' + g.featuredProducts.join(', ') + ' | verdicts ' + g.verdictProsCons.length);
});