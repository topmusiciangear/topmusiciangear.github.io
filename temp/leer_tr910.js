const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'tracking-headphones');
const txt = h => (h || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
[9, 10, 11].forEach(i => console.log('\n######## SEC[' + i + '] ' + s.sections[i].heading_es + ' ########\n' + txt(s.sections[i].content_es)));
console.log('\n\n######## CONCLUSION ########\n' + txt(s.conclusion_es));
