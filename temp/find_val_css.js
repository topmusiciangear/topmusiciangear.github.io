const fs = require('fs');
const path = require('path');
const files = fs.readdirSync('.').filter(f => f.endsWith('.css')).map(f => f);
const cssDir = 'css';
if (fs.existsSync(cssDir)) for (const f of fs.readdirSync(cssDir)) if (f.endsWith('.css')) files.push('css/' + f);

for (const f of files) {
  const s = fs.readFileSync(f, 'utf8');
  const re = /[^{}]*\.val[^{}]*\{[^}]*\}/g;
  let m;
  while ((m = re.exec(s))) {
    if (m[0].length < 600) console.log('\n' + f + ' >>> ' + m[0].trim());
  }
}
