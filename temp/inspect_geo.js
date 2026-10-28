const fs = require('fs');
const c = fs.readFileSync('temp/geo_inline_extracted.js', 'utf8');
const urls = c.match(/https:\/\/[^'"]+/g);
console.log('URLs:', urls);
c.split('\n').forEach((l, n) => {
  if (/gres|applyNow|gTz\(|DOMContentLoaded|querySelectorAll|gApply|gFirst/.test(l)) {
    console.log(String(n + 1).padStart(3), l.trim().slice(0, 180));
  }
});
