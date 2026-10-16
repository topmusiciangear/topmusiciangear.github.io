const fs = require('fs');
const t = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'starter-studio'));
let i = t.indexOf('nunca se actualiza');
console.log('SEC16: ' + JSON.stringify(t.slice(i - 120, i + 60)));
// sec18 exacta
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s18 = g.find(x => x.id === 'starter-studio').sections[18].content_es;
console.log('\nSEC18 parrafo 2: ' + s18.split('</p>')[2].replace(/<[^>]+>/g, '').trim());
