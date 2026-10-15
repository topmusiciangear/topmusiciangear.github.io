const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
[['dxr-vs-prx', 5], ['fix-clipping-scarlett', 4], ['best-mic-for-podcasting', 3], ['pro-headphones', 3], ['pro-drum-machines', 3]].forEach(([id, q]) => {
  const g = guides.find(x => x.id === id);
  const f = g.featuredSnippet;
  console.log('\n### ' + id + ' Q' + q);
  console.log('ES: ' + String(f['faq_a' + q + '_es']).slice(0, 220));
});