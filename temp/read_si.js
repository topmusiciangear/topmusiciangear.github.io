const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'streaming-interfaces');
(g.sections || []).forEach((s, i) => {
  if (!s) { console.log('[' + i + '] NULA'); return; }
  console.log('=== SEC[' + i + '] ' + (s.heading || s.h || '?').slice(0, 70) + ' prod=' + JSON.stringify(s.products) + ' ===');
  const t = s.content || s.a || '';
  const te = s.content_es || s.a_es || '';
  console.log('EN: ' + t.slice(0, 600));
  console.log('ES: ' + te.slice(0, 600));
  console.log('');
});
console.log('### TABLA ###');
g.productTable.rows.forEach(r => {
  console.log('[' + r.label + ' / ' + r.label_es + ']');
  console.log('  EN: ' + r.values.map(v => v.value).join(' | '));
});
console.log('\n### VEREDICTO ###'); console.log(g.verdictProsCons.map(v => v.name).join(' | '));
const vi = g.verdictProsCons.findIndex(v => /Vocaster/i.test(v.name));
if (vi > -1) { console.log('VOCASTER VERDICT:', JSON.stringify(g.verdictProsCons[vi]).slice(0, 900)); }
console.log('\n### VERDICT ###'); console.log(g.verdict);
console.log('\n### VERDICT_ES ###'); console.log(g.verdict_es);
console.log('\n### CONCLUSION ###'); console.log((g.conclusion || '').slice(0, 900));
console.log('\n### CONCLUSION_ES ###'); console.log((g.conclusion_es || '').slice(0, 900));
const f = g.featuredSnippet || {};
Object.keys(f).filter(k => k.startsWith('faq_')).sort().forEach(k => console.log(k + ': ' + String(f[k]).slice(0, 200)));
