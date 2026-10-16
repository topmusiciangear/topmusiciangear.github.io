const fs = require('fs');
const S = JSON.stringify(JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8')).find(x => x.id === 'best-monitors-for-small-rooms'));
const i = S.indexOf('de grosor en tantas');
console.log(JSON.stringify(S.slice(Math.max(0, i - 120), i + 120)));
