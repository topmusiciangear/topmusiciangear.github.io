const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
const d = guides.find(x => x.id === 'best-drum-machine');
const f = d.featuredSnippet;
console.log('Q3:', f.faq_q3_en, '|', f.faq_q3_es);
console.log('A3:', f.faq_a3_en);
console.log('A3ES:', f.faq_a3_es);
