var fs = require('fs');
var c = fs.readFileSync('css/style.css', 'utf8');
c = c.replace(/\/\*[\s\S]*?\*\//g, '');
c = c.replace(/\s*([{}:;,])\s*/g, '$1');
c = c.replace(/;\}/g, '}');
c = c.replace(/\s+/g, ' ');
c = c.trim();
fs.writeFileSync('css/style.min.css', c);
console.log('CSS minified OK');
