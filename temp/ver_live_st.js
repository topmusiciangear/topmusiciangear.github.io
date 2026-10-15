const fs = require('fs');
const d = fs.readFileSync('C:/Users/Daniel/AppData/Local/Temp/opencode/live_st.html', 'utf8');
console.log('=== starter-studio EN VIVO (ES) ===');
const tbl = (d.match(/<table[\s\S]*?<\/table>/) || [''])[0];
[...tbl.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].forEach(r => {
  const c = [...r[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map(m => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
  if (c.length) console.log('  ' + c[0].padEnd(20) + '-> ' + c.slice(1).join('  |  '));
});
console.log('\n  tarjetas      : ' + new Set([...d.matchAll(/openReviewModal\((\d+)\)/g)].map(m => m[1])).size);
console.log('  veredictos    : ' + d.split('<div class="verdict-product-name">').length);
console.log('  LCD           : ' + (d.match(/LCD/g) || []).length);
console.log('  precios viejos: ' + (d.match(/\$998|\$1\.077|\$2\.537/g) || []).length);
console.log('  nuevo en intro: ' + (d.includes('$2.797') ? 'si' : 'NO'));
console.log('  mojibake      : ' + (d.match(/â‚¬|Â£|Â°/g) || []).length);
