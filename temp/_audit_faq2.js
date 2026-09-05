const g = require('../data/guides.json');
const res = [];
for (const x of g) {
  const hasEn = Object.keys(x).some(k => /^faq_q\d+_en$/.test(k));
  const hasEs = Object.keys(x).some(k => /^faq_q\d+_es$/.test(k));
  const hasPlain = Object.keys(x).some(k => /^faq_q\d+$/.test(k));
  const enN = Math.max(0, ...Object.keys(x).filter(k => /^faq_q\d+_en$/.test(k)).map(k => +/^faq_q(\d+)_en$/.exec(k)[1]));
  const esN = Math.max(0, ...Object.keys(x).filter(k => /^faq_q\d+_es$/.test(k)).map(k => +/^faq_q(\d+)_es$/.exec(k)[1]));
  const plN = Math.max(0, ...Object.keys(x).filter(k => /^faq_q\d+$/.test(k)).map(k => +/^faq_q(\d+)$/.exec(k)[1]));
  if (hasEs && !hasEn && esN) res.push(x.id + ' es-only(' + esN + ')');
  if (hasEn && !hasEs && enN) res.push(x.id + ' en-only(' + enN + ')');
  if (hasEn && hasEs && enN !== esN) res.push(x.id + ' EN' + enN + '!=ES' + esN);
  if (hasPlain && (hasEn || hasEs)) res.push(x.id + ' plain+lang');
}
console.log(res.join('\n') || 'no faq anomalies');

const t = g.find(x => x.id === 'blx288-vs-ewd');
for (let i = 1; i <= 6; i++) {
  const qe = t['faq_q' + i + '_en'], ae = t['faq_q' + i + '_en'];
  const qs = t['faq_q' + i + '_es'], as = t['faq_q' + i + '_es'];
  if (qe || qs) console.log('Q' + i, 'EN=', !!qe, 'ES=', !!qs);
}