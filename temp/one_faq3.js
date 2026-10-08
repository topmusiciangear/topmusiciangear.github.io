const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
const d = guides.find(x => x.id === 'best-drum-machine');
const f = d.featuredSnippet;
f.faq_a3_en = f.faq_a3_en.split('MPC One+').join('MPC One G2');
f.faq_a3_es = f.faq_a3_es.split('MPC One+').join('MPC One G2');
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(guides, null, 2));
console.log('One+ left:', JSON.stringify(d).includes('One+'));
