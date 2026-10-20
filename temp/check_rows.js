const fs = require('fs');
const h = fs.readFileSync('guides/best-studio-monitors-under-150.html', 'utf8');
const re = /<a data-store="(amazon|reverb)"[\s\S]*?<\/a>/g;
let m, n = 0;
while ((m = re.exec(h)) && n < 6) {
  const store = m[1];
  const txt = m[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const style = (m[0].match(/margin-left:auto;[^"]*/) || [])[0] || '(no price span)';
  console.log(store + ' | ' + txt.slice(0, 80) + ' | ' + style);
  n++;
}
