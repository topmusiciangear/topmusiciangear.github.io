const fs = require('fs');
const raw = fs.readFileSync('data/guides.json', 'utf8');
const i = raw.indexOf('cantable');
console.log('idx', i);
console.log(JSON.stringify(raw.slice(i - 200, i + 120)));
