const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'starter-studio');
const txt = h => (h || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
console.log('######## INTRO_ES ########\n' + txt(s.intro_es));
s.sections.forEach((sec, i) => {
  console.log('\n\n######## SEC[' + i + '] ' + sec.heading_es + ' ########\n' + txt(sec.content_es));
});
console.log('\n\n######## CONCLUSION_ES ########\n' + txt(s.conclusion_es));
