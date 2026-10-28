const fs = require('fs');
const c = fs.readFileSync('build-guides.js','utf8');
const count = (c.match(/margin-top:8px/g) || []).length;
console.log('margin-top:8px count in build-guides.js:', count);
// Check if there's any stripping
const strip = c.match(/replace.*margin-top/g);
console.log('strip patterns:', strip);
