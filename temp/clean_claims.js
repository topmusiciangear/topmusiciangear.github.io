const fs = require('fs');
const t = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/claims.txt', 'utf16le');
const clean = t.split('\n').map(l => l.replace(/\u0000/g, '').trim()).filter(l => l.length > 0);
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/claims_clean.txt', clean.join('\n'));
console.log(clean.length + ' lines saved');