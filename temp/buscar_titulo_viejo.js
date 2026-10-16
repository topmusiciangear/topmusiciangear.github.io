const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const s = g.find(x => /budget.*mic.*200|mic.*under.*200/i.test(x.id + ' ' + (x.title || '')));
const cands = g.filter(x => /23 Best Budget|Under \$200/.test((x.title || '') + (x.titleTag || '') + (x.title_es || '')));
console.log('=== candidatos ===');
cands.forEach(x => {
  console.log('id: ' + x.id);
  console.log('  title: ' + x.title);
  console.log('  titleTag: ' + x.titleTag);
  console.log('  title_es: ' + x.title_es);
});
console.log('\n=== queda "23 Best Budget" en guides.json: ' + ((JSON.stringify(g).match(/23 Best Budget/g) || []).length));
console.log('=== queda "(2026)" en guides.json: ' + ((JSON.stringify(g).match(/\(2026\)/g) || []).length));
