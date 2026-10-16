const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'starter-studio');
const t = JSON.stringify(s);
['cien dólares', 'hundred', '$299', '$269', 'duplica', 'doubles'].forEach(k => {
  console.log('=== "' + k + '" ===');
  [...new Set(t.match(new RegExp('.{0,70}' + k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '.{0,70}', 'g')) || [])]
    .forEach(m => console.log('  ...' + m.replace(/<[^>]+>/g, ' ').replace(/\\"/g, '"').replace(/\s+/g, ' ').trim().slice(0, 160) + '...'));
});
