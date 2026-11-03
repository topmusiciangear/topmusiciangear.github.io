var fs = require('fs');
var d = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
var g = d['168'];
console.log('Guide 168 keys:', Object.keys(g));
console.log('Has sections:', g.sections ? 'YES' : 'NO');
console.log('Has content:', g.content ? 'YES' : 'NO');
console.log('First 20 keys:', Object.keys(g).slice(0, 20));