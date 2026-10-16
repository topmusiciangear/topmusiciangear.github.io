const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const id = process.argv[2] || 'best-microphone';
const s = g.find(x => x.id === id);
if (!s) { console.log('guia no encontrada: ' + id); process.exit(1); }
const txt = h => (h || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
console.log('######## INTRO ########\n' + txt(s.intro_es));
(s.sections || []).forEach((sec, i) => {
  console.log('\n\n######## SEC[' + i + '] ' + sec.heading_es + ' ########\n' + txt(sec.content_es));
});
console.log('\n\n######## CONCLUSION ########\n' + txt(s.conclusion_es));
