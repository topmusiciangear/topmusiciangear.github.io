const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/stage-wireless.html', 'utf8');
const i = h.indexOf('Is the Sennheiser EW-D 835-S');
const j = h.indexOf('guide-section-heading', i + 50);
console.log(h.slice(i - 200, j === -1 ? i + 3000 : j).replace(/<[^>]*>/g, '|').slice(0, 700));