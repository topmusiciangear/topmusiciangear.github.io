const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'beginner-bass-guitars');
[1, 2].forEach(i => {
  console.log('=== SEC[' + i + '] ' + g.sections[i].heading + ' / ' + g.sections[i].heading_es);
  console.log('EN: ' + g.sections[i].content);
  console.log('ES: ' + g.sections[i].content_es);
  console.log('');
});
const f = g.featuredSnippet || {};
Object.keys(f).sort().forEach(k => console.log(k + ': ' + f[k]));