const fs = require('fs');
let s = fs.readFileSync('build-guides.js', 'utf8');
const old = "</a>\r\n      </div>\r\n      </div>\r\n      <div class=\"guide-detail-header\">\r\n";
const neu = "</a>\r\n      </div>\r\n      <div class=\"guide-detail-header\">\r\n";
if (!s.includes(old)) { console.log('NOT FOUND'); process.exit(1); }
s = s.replace(old, neu);
fs.writeFileSync('build-guides.js', s);
console.log('done');