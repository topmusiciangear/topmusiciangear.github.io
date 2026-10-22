const fs = require('fs');
const h = fs.readFileSync('guides/at2020-vs-p120.html', 'utf8');
const i = h.indexOf('What Products Are in This Guide?');
console.log(h.slice(i - 600, i + 3000));
