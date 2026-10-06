const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = require(DIR + 'data/guides.json');
const g = G.find(x => x.id === 'best-digital-pianos');
console.log('top-level keys:', Object.keys(g).join(', '));
const v = g.verdictProsCons;
for (const k of Object.keys(v)) {
  const e = v[k];
  console.log('verdict', k, '| fields:', Object.keys(e).join(','));
  console.log('  product:', JSON.stringify(e.product || e.productId || e.id || e.title || e.name || '').slice(0, 80));
}
const secs = g.sections.map((s, i) => 'sec' + i + '(faq:' + ((s.faq || []).length) + ')').join(' ');
console.log(secs);
console.log('guide.faqs:', (g.faqs || []).length, '| guide.faq:', (g.faq || []).length);
