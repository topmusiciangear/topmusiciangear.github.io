const fs = require('fs');
const g = require('../data/guides.json');
const x = g.find(v => v.id === 'beginner-guitar');
fs.writeFileSync('temp/_beginner_dump.json', JSON.stringify(x, null, 2));
console.log('dumped', Object.keys(x).length, 'keys');
