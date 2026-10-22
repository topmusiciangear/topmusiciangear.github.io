const fs = require('fs');
const h = fs.readFileSync('guides/hd490-pro-vs-dt990.html', 'utf8');
console.log('429:', (h.match(/429/g) || []).length);
console.log('359:', (h.match(/359/g) || []).length);
console.log('200:', (h.match(/\$200/g) || []).length);
console.log('159:', (h.match(/159/g) || []).length);
console.log('zzounds row:', h.includes('data-store="zzounds"') && h.includes('SENHD490PRO'));
