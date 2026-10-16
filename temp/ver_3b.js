const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'starter-studio'));
['nunca se actualiza', 'después del sonido directo', 'duplica el presupuesto'].forEach(k => {
  console.log('=== ' + k + ' ===');
  [...new Set(t.match(new RegExp('.{0,60}' + k + '.{0,60}', 'g')) || [])].forEach(m => console.log('  ...' + m.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 150) + '...'));
});
