const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8')).find(x => x.id === 'best-microphone');
const r144 = (g.sections || []).find(x => x && x.heading === 'MXL R144: A Closer Look');
console.log('=== R144 section EN ==='); console.log(r144.content);
console.log('\n=== R144 section ES ==='); console.log(r144.content_es);
console.log('\n=== featuredSnippet FAQs ===');
const fsn = g.featuredSnippet || {};
['faq_q1_en','faq_a1_en','faq_q2_en','faq_a2_en','faq_q3_en','faq_a3_en','faq_q4_en','faq_a4_en','faq_q1_es','faq_a1_es','faq_q2_es','faq_a2_es','faq_q3_es','faq_a3_es','faq_q4_es','faq_a4_es'].forEach(k => {
  if (fsn[k]) console.log(k + ': ' + String(fsn[k]).slice(0, 220));
});