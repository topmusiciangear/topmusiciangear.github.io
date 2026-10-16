const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'budget-mics'));
console.log('acondiciona: ' + (t.match(/acondiciona/g) || []).length);
[...new Set(t.match(/.{0,60}acondiciona.{0,60}/g) || [])].forEach(m => console.log('  ...' + m.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 130) + '...'));
console.log('\nK&M/filtro: ');
const i = t.indexOf('K&M 210/2');
console.log(JSON.stringify(t.slice(i, i + 120)));
