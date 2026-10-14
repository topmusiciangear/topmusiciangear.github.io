const fs = require('fs');
const js = fs.readFileSync('js/shop-buttons.js', 'utf8');
const i = js.indexOf('"680"');
if (i === -1) { const j = js.indexOf(':680'); console.log('sin 680, idx ' + j); console.log(js.slice(Math.max(0, j - 200), j + 600)); }
else console.log(js.slice(i - 20, i + 800));