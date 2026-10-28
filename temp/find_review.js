const fs = require('fs');
const c = fs.readFileSync('build-guides.js','utf8');
let pos = 0;
while (true) {
  const i = c.indexOf('reviewRow', pos);
  if (i === -1) break;
  console.log('>>>', c.substring(Math.max(0,i-40), i+30).replace(/\n/g,' '));
  pos = i + 1;
}
