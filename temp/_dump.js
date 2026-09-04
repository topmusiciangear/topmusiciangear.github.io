const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const h = g.find(x => x.id === 'best-beginner-electric-guitar');
fs.writeFileSync('temp/_guide_full.js', 'module.exports = ' + JSON.stringify(h, null, 2) + ';\n', 'utf8');
console.log('dumped. top-level keys:', Object.keys(h).join(', '));
