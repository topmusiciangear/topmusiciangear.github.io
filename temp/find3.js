const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
[55, 58, 62].forEach(i => {
  const g = guides[i];
  const s = g.sections[3];
  console.log('\n############ [' + i + '] ' + g.id + '   (' + g.title + ')');
  console.log('EN> ' + s.content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(-400));
  console.log('\nES> ' + (s.content_es || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(-400));
});