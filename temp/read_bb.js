const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'beginner-bass-guitars');
[0, 1, 2].forEach(i => {
  const s = g.sections[i];
  console.log('=== SEC[' + i + '] ' + s.heading + ' ===');
  console.log('EN: ' + s.content);
  console.log('ES: ' + s.content_es);
  console.log('');
});
console.log('### VERDICT ###'); console.log(g.verdict);
console.log('\n### VERDICT_ES ###'); console.log(g.verdict_es);
console.log('\n### CONCLUSION ###'); console.log(g.conclusion);
console.log('\n### CONCLUSION_ES ###'); console.log(g.conclusion_es);
console.log('\n### DESC ###'); console.log(g.description);
console.log('\n### DESC_ES ###'); console.log(g.description_es);
const f = g.featuredSnippet || {};
Object.keys(f).filter(k => k.startsWith('faq_')).sort().forEach(k => console.log(k + ': ' + String(f[k]).slice(0, 250)));
