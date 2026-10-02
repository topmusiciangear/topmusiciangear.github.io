const fs = require('fs');
let t = fs.readFileSync('data/guides.json', 'utf8');
t = t.replace('Doce bajos en tres gamas', 'Bajos de 5 cuerdas en 3 gamas');
fs.writeFileSync('data/guides.json', t);
console.log('done');