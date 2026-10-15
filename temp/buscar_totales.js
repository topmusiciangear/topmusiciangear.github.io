const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'starter-studio');
const t = JSON.stringify(s);
const keys = ['~$900', '$900', '~$1,357', '$1,357', '~$1.357', '$1.357', '~$2,797', '$2,797', '~$2.797', '$2.797'];
keys.forEach(k => {
  const esc = k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const m = t.match(new RegExp('.{0,50}' + esc + '.{0,40}', 'g')) || [];
  console.log('=== "' + k + '" (' + m.length + ') ===');
  [...new Set(m)].slice(0, 8).forEach(x => console.log('  ...' + x.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 150) + '...'));
});
