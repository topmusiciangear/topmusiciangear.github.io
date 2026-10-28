const fs = require('fs');
const raw = fs.readFileSync('data/guides.json', 'utf8');
const start = raw.indexOf('"id": "best-nylon-guitars-for-beginners"');
const endMarker = raw.indexOf('\n    {\n      "id": "', start);
console.log('start', start, 'end', endMarker, 'raw len', raw.length);
const region = raw.slice(start, endMarker < 0 ? raw.length : endMarker);
console.log('region len', region.length, 'has cantable:', region.includes('cantable'));
const i = region.indexOf('cantable');
console.log(JSON.stringify(region.slice(i - 120, i + 80)));
