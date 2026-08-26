const fs = require('fs');
const m = fs.readFileSync('js/app.min.js', 'utf8');

// Find loadMoreGuides function definition
const lmg = m.indexOf('function loadMoreGuides()');
console.log('loadMoreGuides at:', lmg);
console.log(m.substring(lmg, lmg + 200));

// Check if guideMoreWrap has display:none initially
const gmw = m.indexOf('guideMoreWrap');
console.log('\nguideMoreWrap occurrences:');
let pos = 0;
while (true) {
  const i = m.indexOf('guideMoreWrap', pos);
  if (i < 0) break;
  console.log('  pos', i, ':', m.substring(Math.max(0, i - 50), i + 80));
  pos = i + 1;
}

// Check guidePageSize and guideVisibleCount
const gps = m.indexOf('guidePageSize=');
console.log('\nguidePageSize at:', gps);
if (gps >= 0) console.log(m.substring(gps, gps + 50));

const gvc = m.indexOf('guideVisibleCount=');
console.log('\nguideVisibleCount at:', gvc);
if (gvc >= 0) console.log(m.substring(gvc, gvc + 80));
