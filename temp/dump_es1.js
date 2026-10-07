const fs = require('fs');
const G = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
for (const id of ['best-multi-effects-pedals', 'best-overdrive-distortion']) {
  const g = G.find(v => v.id === id);
  console.log('\n############ ' + id);
  g.sections.slice(5).forEach((s, k) => {
    console.log('\n--- [' + (k + 5) + '] ' + s.heading + ' / ' + s.heading_es);
    console.log('EN: ' + s.content);
    console.log('ES: ' + s.content_es);
  });
}
