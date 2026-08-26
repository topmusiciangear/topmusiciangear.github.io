const fs = require('fs');
const m = fs.readFileSync('js/app.min.js', 'utf8');

// Find DOMContentLoaded
const start = m.indexOf('addEventListener("DOMContentLoaded"');
console.log('DOMContentLoaded starts at:', start);

// Count braces from start
let depth = 0;
let found = false;
for (let j = 0; j < m.length - start; j++) {
  const ch = m[start + j];
  if (ch === '{') depth++;
  if (ch === '}') depth--;
  if (depth === 0 && j > 0) {
    console.log('DOMContentLoaded closes at:', start + j);
    console.log('Next 200 chars:', m.substring(start + j + 1, start + j + 201));
    found = true;
    break;
  }
}
if (!found) console.log('DOMContentLoaded NOT closed within file!');

// Check if i() is called inside or outside DOMContentLoaded
const iCallPos = m.indexOf('i():window.addEventListener');
console.log('\ni() call at:', iCallPos);
if (iCallPos >= start && iCallPos < start + 20000) {
  console.log('i() call IS inside DOMContentLoaded');
} else {
  console.log('i() call is OUTSIDE DOMContentLoaded');
}
