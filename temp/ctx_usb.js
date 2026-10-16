const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const u = g.find(x => x.id === 'budget-usb-mics');
const t = JSON.stringify(u);
const i = t.indexOf('videollamadas, y el so');
console.log('...' + t.slice(Math.max(0, i - 100), i + 250).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() + '...');
