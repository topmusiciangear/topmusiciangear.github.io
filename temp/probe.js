const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

const g = guides.find(x => x.id === 'fix-clipping-scarlett');
console.log('=== CAMPOS QUE DEBERIAN ESTAR VACIOS ===');
console.log('verdict:       "' + (g.verdict || '') + '"');
console.log('verdict_es:    "' + (g.verdict_es || '') + '"');
console.log('productTable:  ' + JSON.stringify(g.productTable));
console.log('conclusion:    "' + (g.conclusion || '').substring(0, 100) + '...');
console.log('conclusion_es: "' + (g.conclusion_es || '').substring(0, 100) + '...');