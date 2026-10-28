const fs = require('fs');
const c = fs.readFileSync('build-guides.js','utf8');
const lines = c.split('\n');
console.log('Line 6319:', JSON.stringify(lines[6318]));
console.log('Line 6320:', JSON.stringify(lines[6319]));
