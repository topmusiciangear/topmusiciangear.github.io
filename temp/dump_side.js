const fs = require('fs');
const h = fs.readFileSync('guides/sidechain-modulation-plugins.html', 'utf8');
const key = '<table class="guide-comp-table"';
const i = h.indexOf(key);
console.log('table at:', i);
const txt = h.slice(i, i + 5000).replace(/<[^>]+>/g, '|').replace(/\|+/g, '|');
console.log(txt.slice(0, 2500));
