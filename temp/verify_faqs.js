const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
let bad = 0, low = 0, cjk = 0;
guides.forEach(g => {
  const f = g.featuredSnippet || {};
  const n = [1,2,3,4,5,6,7,8].filter(i => f['faq_q' + i + '_en']).length;
  if (n && n < 4) { low++; console.log('POucas ' + g.id + ' (' + n + ')'); }
  for (let i = 1; i <= 8; i++) {
    if (!f['faq_q' + i + '_en']) continue;
    if (!f['faq_q' + i + '_es'] || !f['faq_a' + i + '_en'] || !f['faq_a' + i + '_es']) {
      bad++; console.log('INCOMPLETA ' + g.id + ' Q' + i);
    }
    const es = f['faq_a' + i + '_es'] || '';
    if (/[a-z]{4,}\s+[a-z]{4,}\s+[a-z]{4,}\s+[a-z]{4,}/.test(es) && /[.?]/.test(f['faq_a' + i + '_en'] || '') && !/[áéíóúñ¿¡]/.test(es)) {
      console.log('  ? ' + g.id + ' Q' + i + ' ES parece ingles');
    }
  }
  const w = (v) => {
    if (typeof v === 'string') { if (/[\u4e00-\u9fff]/.test(v)) { cjk++; console.log('CJK ' + g.id); } }
    else if (Array.isArray(v)) v.forEach(w);
    else if (v && typeof v === 'object') Object.keys(v).forEach(k => w(v[k]));
  };
  w(g);
});
console.log('\nguias con menos de 4 FAQs: ' + low);
console.log('FAQs incompletas EN/ES: ' + bad);
console.log('CJK global: ' + cjk);
const dist = {};
guides.forEach(g => {
  const f = g.featuredSnippet || {};
  const n = [1,2,3,4,5,6,7,8].filter(i => f['faq_q' + i + '_en']).length;
  if (n) dist[n] = (dist[n] || 0) + 1;
});
console.log('distribución de FAQs: ' + JSON.stringify(dist));