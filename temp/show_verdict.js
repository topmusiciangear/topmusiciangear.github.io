const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'monitor-setup');
console.log('=== VERDICT ES ===');
console.log(g.verdict_es);
console.log('\n=== VERDICT EN ===');
console.log(g.verdict);
