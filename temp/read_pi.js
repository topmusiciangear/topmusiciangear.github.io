const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'premium-interfaces');
for (let i = 0; i <= 6; i++) {
  const s = g.sections[i];
  console.log('=== SEC[' + i + '] prod=' + JSON.stringify(s.products) + ' ===');
  console.log('EN: ' + (s.content || '').slice(0, 400));
  console.log('ES: ' + (s.content_es || '').slice(0, 400));
  console.log('');
}
console.log('=== VERDICT ==='); console.log(g.verdict);
console.log('\n=== VERDICT_ES ==='); console.log(g.verdict_es);
console.log('\n=== CONCLUSION ==='); console.log((g.conclusion || '').slice(0, 800));
console.log('\n=== CONCLUSION_ES ==='); console.log((g.conclusion_es || '').slice(0, 800));
console.log('\n=== INTRO ==='); console.log((g.intro || '').slice(0, 500));
console.log('\n=== INTRO_ES ==='); console.log((g.intro_es || '').slice(0, 500));
