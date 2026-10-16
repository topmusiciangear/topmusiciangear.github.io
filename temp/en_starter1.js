const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'starter-studio');
console.log('INTRO: ' + s.intro);
s.sections.slice(0, 6).forEach((x, i) => {
  console.log('\n######## SEC[' + i + '] ' + x.heading + ' ########');
  console.log(x.content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 1200));
});
