const fs = require('fs');
const arr = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = (Array.isArray(arr) ? arr : arr.guides).find(x => x.id === 'best-nylon-guitars-for-beginners');
[0, 1, 4, 5, 7].forEach(i => {
  console.log('---', i, 'EN ---');
  console.log(JSON.stringify(g.sections[i].content));
  console.log('---', i, 'ES ---');
  console.log(JSON.stringify(g.sections[i].content_es));
});
console.log('--- INTRO ES ---');
console.log(JSON.stringify(g.intro_es));
console.log('--- INTRO EN ---');
console.log(JSON.stringify(g.intro));
