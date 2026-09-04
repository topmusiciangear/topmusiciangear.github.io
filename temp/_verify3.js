const fs = require('fs');
const path = require('path');
const s = fs.readFileSync(path.join(__dirname, '..', 'js', 'shop-buttons.js'), 'utf8');
['462:', '463:', '464:'].forEach(id => console.log(id, 'in shop-buttons.js:', s.indexOf(id) > -1));
['$249.99', '$219.99'].forEach(p => console.log(p, ':', s.indexOf(p) > -1 && s.indexOf('\u00a3159.00') > -1));
try { new Function(s); console.log('shop-buttons.js parses OK'); } catch (e) { console.log('PARSE ERROR:', e.message); }