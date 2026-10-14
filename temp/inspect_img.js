const fs = require('fs');
const src = fs.readFileSync('build-guides.js', 'utf8');
let i = src.indexOf('imgUrls');
console.log('SM1: ' + src.slice(Math.max(0, i - 700), i + 100).replace(/\n/g, ' ').slice(0, 800));
const m = [...src.matchAll(/image["']?\s*:\s*([^\n,}]+)/g)].slice(0, 10);
m.forEach(x => console.log('IMGREF: ' + x[0].slice(0, 140)));
