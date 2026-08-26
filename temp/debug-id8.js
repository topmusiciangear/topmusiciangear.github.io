const fs = require('fs');
const c = fs.readFileSync('build-guides.js', 'utf8');
const m = c.match(/TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n\};/);
let block = m[1].replace(/\r/g, '').trimEnd();

// Check ID 8 specifically
const r = /\b8:\s*\{([\s\S]*?)(?=\n\s*\d+:|\n\}|$)/g;
const match = r.exec(block);
if (match) {
  const body = match[1];
  const stores = ['amazon','zzounds','reverb','gear4music','andertons','musicstore'];
  stores.forEach(s => {
    const re = new RegExp(s + ":\\s*['\"][^'\"]+['\"]");
    console.log(s + ':', re.test(body), '| body has:', body.includes(s));
  });
  console.log('Full body:', body.substring(0,300));
}
