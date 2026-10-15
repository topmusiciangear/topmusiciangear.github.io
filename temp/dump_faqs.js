const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const IDS = ['j48-vs-rndi', 'midi-controllers', 'studio-furniture', 'best-bass-under-700', 'best-instrument-mics',
  'stage-wedges', 'best-live-subwoofers', 'wireless-lapel-mics', 'mics-for-creators', 'best-hardware-samplers',
  'atc-vs-genelec', 'studio-subwoofers-setup', 'kh750-vs-7050c', 'wireless-intercom-systems', 'best-stage-keyboards'];
IDS.forEach(id => {
  const g = guides.find(x => x.id === id);
  if (!g) { console.log('!! no existe ' + id); return; }
  const f = g.featuredSnippet || {};
  const n = [1,2,3,4,5,6,7,8].filter(i => f['faq_q' + i + '_en']).length;
  console.log('\n########## ' + id + ' (' + n + ' FAQs) | ' + g.title);
  for (let i = 1; i <= 5; i++) {
    if (!f['faq_q' + i + '_en']) continue;
    console.log('  Q' + i + ': ' + f['faq_q' + i + '_en']);
    console.log('     ES: ' + f['faq_q' + i + '_es']);
    console.log('  A' + i + ': ' + String(f['faq_a' + i + '_en']).slice(0, 260));
  }
  const vp = g.verdictProsCons.map(v => v.name);
  console.log('  productos: ' + JSON.stringify(g.featuredProducts) + ' | verdicts: ' + vp.length);
  const P = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', 'utf8'));
  const arr = Array.isArray(P) ? P : P.products;
  console.log('  lineup: ' + g.featuredProducts.map(i => { const p = arr.find(x => x.id === i); return p ? p.title : i; }).join(' | '));
});