const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const guide = g.find(x => x.id === 'best-monitors-for-small-rooms');
console.log('TEXT_EN: ' + guide.featuredSnippet.text_en);
console.log('TEXT_ES: ' + guide.featuredSnippet.text_es);
const jbl = guide.verdictProsCons.find(v => v.name.includes('JBL'));
console.log('JBL CONS: ' + JSON.stringify(jbl.cons, null, 1));
console.log('JBL CONS_ES: ' + JSON.stringify(jbl.cons_es, null, 1));
