const fs = require('fs');
const h = fs.readFileSync('guides/best-32-channel-digital-mixers.html', 'utf8');
const noScripts = h.replace(/<script[\s\S]*?<\/script>/g, '');
const re = /M32R/g;
let m;
while ((m = re.exec(noScripts)) !== null) console.log('...' + noScripts.slice(Math.max(0, m.index - 100), m.index + 60).replace(/\s+/g, ' '));