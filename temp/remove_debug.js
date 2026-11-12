const fs = require('fs');
const t = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
const idx = t.indexOf('console.log("DEBUG DrumBrute:');
const end = t.indexOf(';', idx) + 1;
const newT = t.slice(0, idx) + t.slice(end);
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', newT);
console.log('Debug removed. Length change:', t.length - newT.length);
