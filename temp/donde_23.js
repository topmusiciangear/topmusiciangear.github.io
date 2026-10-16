const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
g.forEach(x => {
  const t = JSON.stringify(x);
  const m = t.match(/.{0,80}23 Best Budget.{0,80}/g);
  if (m) {
    console.log('guia: ' + x.id);
    [...new Set(m)].forEach(s => console.log('  ...' + s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 160) + '...'));
  }
});
