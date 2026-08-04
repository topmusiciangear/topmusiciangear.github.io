const fs = require('fs');
const j = fs.readFileSync('js/app.min.js', 'utf8');
const i = j.indexOf('function userReviewsHtml');
const seg = j.substring(i, i + 1600);
const end = seg.indexOf("guide-reviews-list");
console.log('list end region:', JSON.stringify(seg.substring(end - 120, end + 160)));