const fs = require('fs');
const d = fs.readFileSync('C:/Users/Daniel/AppData/Local/Temp/opencode/home.html', 'utf8');
console.log('=== HOME EN VIVO ===');
console.log('  boton #productSearchClear: ' + (d.includes('id="productSearchClear"') ? 'SI' : 'NO'));
const i = d.indexOf('id="productSearchClear"');
if (i > -1) console.log('  ' + d.slice(Math.max(0, i - 120), i + 330).replace(/\s+/g, ' '));
console.log('\n  js/app.min.js con tmgClearProductSearch: ' + (d.includes('tmgClearProductSearch') ? 'SI (inline o referenciado)' : 'no visible en home'));
