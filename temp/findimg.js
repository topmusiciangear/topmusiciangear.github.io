const fs = require('fs');
const h = fs.readFileSync('temp/spacedout.html', 'utf8');
const re = /https:\/\/cdn\.prod\.website-files\.com\/[^"' ]+\.(png|jpg|jpeg|webp)/g;
const seen = new Set();
let m;
while ((m = re.exec(h)) && seen.size < 30) {
  const u = m[0].replace(/%20/g, ' ');
  if (/spaced|space|echo|reverb/i.test(u) || seen.size < 30) seen.add(m[0]);
}
console.log([...seen].slice(0, 30).join('\n'));
