const fs = require('fs');
const d = require('../data/guides.json');

const s = fs.readFileSync('build-guides.js', 'utf8');
const seg = s.slice(s.indexOf('var faqBase ='), s.indexOf('};', s.indexOf('var faqBase ='))).replace(/\r/g, '');
const counts = {};
let cur = null, cnt = 0;
seg.split('\n').forEach(line => {
  const k = line.match(/^  '?([A-Za-z_ -]+)'?: \[$/);
  if (k) { cur = k[1]; cnt = 0; }
  if (line.match(/\{ q:/) && cur !== null) cnt++;
  if (line.match(/^  \],$/)) { if (cur) counts[cur] = cnt; cur = null; }
});
console.log('faqBase categories:', JSON.stringify(counts));

const baseUnder = Object.keys(counts).filter(c => counts[c] < 4).map(c => c + ':' + counts[c]);
console.log('base categories <4:', baseUnder.join(', '));

function buildFaqs(guide) {
  if (guide.faq) return guide.faq;
  if (guide.featuredSnippet && guide.featuredSnippet.faq_q1_en) {
    return [1,2,3,4,5,6,7,8].map(i => ({ q: guide.featuredSnippet['faq_q'+i+'_en'] })).filter(f => f.q);
  }
  if (guide.faq_q1) {
    return [1,2,3,4,5,6,7,8].map(i => ({ q: guide['faq_q'+i] })).filter(f => f.q);
  }
  const n = counts[guide.category] !== undefined ? counts[guide.category] : (counts.interfaces || 5);
  return Array.from({ length: n }, () => ({}));
}

const catCount = {};
const underFaq = [];
const underCons = [];
d.forEach(g => {
  const c = g.category || '?';
  catCount[c] = (catCount[c] || 0) + 1;
  const n = buildFaqs(g).length;
  if (n < 4) underFaq.push(g.id + ' (' + n + ':' + c + ')');
  const vp = g.verdictProsCons || [];
  vp.forEach(p => {
    if (!p.cons || p.cons.length < 4) underCons.push(g.id + ' / ' + (p.name || '?') + ' cons=' + (p.cons ? p.cons.length : 0));
  });
});
console.log('guide categories:', JSON.stringify(catCount));
console.log('GUIDES RENDERING <4 FAQS:', underFaq.length);
console.log(underFaq.join('\n'));
console.log('');
console.log('PRODUCT ENTRIES missing 4th con:', underCons.length, ' across', new Set(underCons.map(x => x.split(' / ')[0])).size, 'guides');
console.log(underCons.join('\n'));