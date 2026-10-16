const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
[30, 119, 122, 472].forEach(id => {
  const users = [];
  guides.forEach(g => {
    const refs = [...(g.featuredProducts || [])];
    (g.sections || []).forEach(s => (s.products || []).forEach(p => refs.push(p)));
    if (refs.includes(id)) users.push(g.id);
  });
  console.log(id + ' usado en: ' + users.join(','));
});
const g = guides.find(x => x.id === 'vocal-plugins');
console.log('INTRO: ' + g.intro.slice(0, 500));
console.log('VERDICT: ' + (g.verdict || '').slice(0, 400));
