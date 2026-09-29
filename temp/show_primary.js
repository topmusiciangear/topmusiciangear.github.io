const fs = require('fs');
const f = process.argv[2] || 'guides/best-microphone.html';
const c = fs.readFileSync(f, 'utf8');
const m = c.match(/class="shop-btn-primary"[\s\S]*?<\/a>/)[0];
const i = m.indexOf('Buy at');
console.log(f);
console.log(m.slice(Math.max(0, i - 10), i + 340));
console.log('--- white labels in file:', (c.match(/color:#ffffff;font-style:italic'>/g) || []).length);
