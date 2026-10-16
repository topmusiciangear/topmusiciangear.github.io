const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));

// 1. starter-studio: "our own catalogue" → "the catalogue"
let s = g.find(x => x.id === 'starter-studio');
s.intro = s.intro.replace('from our own catalogue', 'from the catalogue');

// 2. budget-headphones: 1st person in intro
s = g.find(x => x.id === 'budget-headphones');
console.log('budget-headphones intro:', s.intro);

// 3. best-interface: 1st person in conclusion
s = g.find(x => x.id === 'best-interface');
console.log('best-interface conclusion:', s.conclusion);

// 4. budget-mics: "our" in intro
s = g.find(x => x.id === 'budget-mics');
console.log('budget-mics intro:', s.intro);

fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
