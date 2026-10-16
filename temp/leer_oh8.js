const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'open-headphones');
const txt = h => (h || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
console.log('######## SEC[8] ########\n' + txt(s.sections[8].content_es));
console.log('\n\n######## CONCLUSION ########\n' + txt(s.conclusion_es));
