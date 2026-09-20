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

function buildFaqs(guide) {
  if (guide.faq) return { n: guide.faq.length, src: 'faq-field' };
  if (guide.featuredSnippet && guide.featuredSnippet.faq_q1_en) {
    let n = 0;
    [1,2,3,4,5,6,7,8].forEach(i => { if (guide.featuredSnippet['faq_q'+i+'_en']) n++; });
    return { n, src: 'featuredSnippet' };
  }
  if (guide.faq_q1) {
    let n = 0;
    [1,2,3,4,5,6,7,8].forEach(i => { if (guide['faq_q'+i]) n++; });
    return { n, src: 'faq_q' };
  }
  return { n: (counts[guide.category] !== undefined ? counts[guide.category] : 5), src: 'base[' + (guide.category||'?') + ']' };
}

const under = [];
d.forEach(g => {
  const r = buildFaqs(g);
  if (r.n < 4) {
    under.push({ id: g.id, cat: g.category, ...r });
  }
});
console.log('TOTAL under-4: ' + under.length);
under.forEach(u => console.log('  ' + u.id + '  n=' + u.n + '  src=' + u.src));

// dump featuredSnippet faq for all guides that have snippet-based faqs
const dump = [];
d.forEach(g => {
  if (g.featuredSnippet && g.featuredSnippet.faq_q1_en) {
    let n = 0;
    [1,2,3,4,5,6,7,8].forEach(i => { if (g.featuredSnippet['faq_q'+i+'_en']) n++; });
    dump.push('### ' + g.id + '  (' + n + ' faq in featuredSnippet)');
    for (let i = 1; i <= 8; i++) {
      const q = g.featuredSnippet['faq_q'+i+'_en'];
      if (!q) break;
      dump.push('Q' + i + ' en: ' + q);
      dump.push('Q' + i + ' es: ' + (g.featuredSnippet['faq_q'+i+'_es'] || ''));
      dump.push('A' + i + ' en: ' + (g.featuredSnippet['faq_a'+i+'_en'] || ''));
      dump.push('A' + i + ' es: ' + (g.featuredSnippet['faq_a'+i+'_es'] || ''));
      dump.push('');
    }
  }
});
fs.writeFileSync('temp/faq_snippet_dump.txt', dump.join('\n'), 'utf8');
console.log('snippet dump lines: ' + dump.length);

fs.writeFileSync('temp/faqbase_dump.txt',
  seg + '\n' + JSON.stringify(counts, null, 0));
console.log('faqBase counts: ' + JSON.stringify(counts));