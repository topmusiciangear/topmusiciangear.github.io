const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'stage-mics'));
[...new Set(t.match(/.{0,80}funcióna.{0,80}/g) || [])].forEach(m => console.log('...' + m.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 170) + '...'));
// y en todo el sitio
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const todas = [];
g.forEach(x => {
  const c = (JSON.stringify(x).match(/funcióna/g) || []).length;
  if (c) todas.push(x.id + ': ' + c);
});
console.log('\n"funcióna" en el sitio: ' + todas.join(' | '));
