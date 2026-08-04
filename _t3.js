const fs = require('fs');
const j = fs.readFileSync('js/app.min.js', 'utf8');
const i = j.indexOf('const items=rv.map(r=>');
const sub = j.substring(i, i + 1500);
const needle = "'<div class=\"guide-reviews-list\">'+items+'</div></div>'";
console.log('needle in sub:', sub.indexOf(needle));
const i2 = j.indexOf(needle);
console.log('needle in whole file:', i2);
if (i2 >= 0) console.log('after:', JSON.stringify(j.substring(i2, i2 + 5)));