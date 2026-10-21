const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8')).find(x => x.id === 'monitor-setup');

console.log('=== FAQ (' + (g.faqs || g.faq || []).length + ') ===');
const faqs = g.faqs || g.faq || [];
faqs.forEach((f, i) => {
  console.log('\n[' + i + '] keys: ' + Object.keys(f).join(','));
  console.log(JSON.stringify(f, null, 1));
});

console.log('\n=== INTRO (seccion 0) ===');
console.log(g.sections[0].content);
console.log('\nES: ' + g.sections[0].content_es);

console.log('\n=== conclusion ===');
console.log(g.conclusion);
console.log('\nES: ' + g.conclusion_es);

console.log('\n=== verdictProsCons: HS8, K&M, Focal, Sonarworks, UMIK, MS-100 ===');
for (const v of g.verdictProsCons) {
  if (/Yamaha|K&M|Focal|Sonarworks|UMIK|MS-100/.test(v.name)) {
    console.log('\n### ' + v.name + ' / ' + v.name_es);
    console.log('pros: ' + JSON.stringify(v.pros));
    console.log('cons: ' + JSON.stringify(v.cons));
    console.log('pros_es: ' + JSON.stringify(v.pros_es));
    console.log('cons_es: ' + JSON.stringify(v.cons_es));
  }
}

console.log('\n=== steps ===');
console.log(JSON.stringify(g.steps, null, 1).slice(0, 1500));
