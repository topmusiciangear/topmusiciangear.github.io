const fs = require('fs');
const c = fs.readFileSync('build-guides.js', 'utf8');
const m = c.match(/TEST_SHOP_BTN\s*=\s*\{([\s\S]*?)\n\};/);
const block = m[1];
const r = /\b370:\s*\{([\s\S]*?)(?=\n\s*\d+:|\n\})/g;
const match = r.exec(block);
if (match) {
  const body = match[1];
  console.log('Body:', JSON.stringify(body).substring(0,300));
  const stores = ['amazon','zzounds','reverb','gear4music','andertons','musicstore'];
  stores.forEach(s => {
    const re = new RegExp(s + ":\\s*['\"][^'\"]+['\"]");
    console.log(s + ':', re.test(body));
  });
} else {
  console.log('NO MATCH for ID 370');
}
