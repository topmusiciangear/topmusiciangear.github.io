const fs = require('fs');
const d = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const p = d.find(x => x.id === 456);
const s = p.desc_es;
const parts = s.split(/(?<=[,;:])\s+|\s+(?=\u2014\s)|\s+(?=(?:and|but|while|yet|so|porque|pero|mientras|aunque)\s)/i);
parts.forEach((x, i) => console.log(i, x.split(/\s+/).length, JSON.stringify(x)));
