const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
console.log('rode-wireless-pro-vs-dji-mic-2: ' + g.find(y => y.id === 'rode-wireless-pro-vs-dji-mic-2').title_es);
