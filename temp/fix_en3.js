const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));

// 1. starter-studio: "from our own catalogue" → "from the catalogue"
let s = g.find(x => x.id === 'starter-studio');
s.intro = s.intro.replace('from our own catalogue', 'from the catalogue');

// 2. budget-headphones: "I stand by this" → "this holds true"
s = g.find(x => x.id === 'budget-headphones');
s.intro = s.intro.replace('I stand by this', 'this holds true');

// 3. budget-mics: "Check our" → "Check the"
s = g.find(x => x.id === 'budget-mics');
s.intro = s.intro.replace('Check our', 'Check the');

fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('Fixed 3 EN first-person issues');
