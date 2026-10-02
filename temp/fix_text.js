const fs = require('fs');
let t = fs.readFileSync('data/guides.json', 'utf8');
t = t.replace('Starting on five under $500?', 'Starting on a 5-string bass under $500?');
t = t.replace('¿Empezando en cinco por menos de $500?', '¿Empezando con un bajo de 5 cuerdas por menos de $500?');
t = t.replace('12 five-string basses compared by price', '12 5-string basses compared by price');
fs.writeFileSync('data/guides.json', t);
console.log('done');