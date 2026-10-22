const fs = require('fs');
let s = fs.readFileSync('build-guides.js', 'utf8');
const old = "  <noscript><link rel=\"stylesheet\" href=\"/css/style.min.css?v=${cacheVerCss}\"></noscript>\r\n";
const neu = "  <noscript><link rel=\"stylesheet\" href=\"/css/style.min.css?v=${cacheVerCss}\"></noscript>\r\n  <link rel=\"stylesheet\" href=\"/css/hf.css\">\r\n";
if (!s.includes(old)) { console.log('NOT FOUND'); process.exit(1); }
s = s.replace(old, neu);
fs.writeFileSync('build-guides.js', s);
console.log('done');