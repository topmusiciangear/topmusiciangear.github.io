const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'starter-studio');
const txt = h => (h || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
[1, 2, 11].forEach(i => {
  console.log('\n######## SEC[' + i + '] ' + s.sections[i].heading + ' ########\n' + txt(s.sections[i].content));
});
console.log('\n\n######## CONCLUSION EN ########\n' + txt(s.conclusion));
