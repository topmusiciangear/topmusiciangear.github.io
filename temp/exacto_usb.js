const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const usb = g.find(x => x.id === 'budget-usb-mics');
const i = usb.intro.indexOf('23 Best Budget');
console.log(JSON.stringify(usb.intro.slice(Math.max(0, i - 60), i + 80)));
