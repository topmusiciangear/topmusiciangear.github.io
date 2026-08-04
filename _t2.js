const fs = require('fs');
const j = fs.readFileSync('js/app.min.js', 'utf8');
console.log('start "const items=rv.map(r=>":', j.indexOf('const items=rv.map(r=>'));
console.log('end "guide-reviews-list")+items+</div></div>}:', j.indexOf('guide-reviews-list">\'+items+\'</div></div>}'));
const i = j.indexOf('function userReviewsHtml');
const seg = j.substring(i, i + 2000);
const k = seg.indexOf('guide-reviews-list');
console.log('snippet:', JSON.stringify(seg.substring(k - 200, k + 90)));