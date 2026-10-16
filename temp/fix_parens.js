const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');
let n = 0;
// 6554: restore eaten opening paren
if (bg.includes(`+ (p.img||"").startsWith('http') ? p.img : '../' + p.img) + '" alt="' + t + '"`)) {
  bg = bg.split(`+ (p.img||"").startsWith('http') ? p.img : '../' + p.img) + '" alt="' + t + '"`).join(`+ ((p.img||"").startsWith('http') ? p.img : '../' + p.img)) + '" alt="' + t + '"`);
  n++;
}
// 6581: remove doubled paren
if (bg.includes(`+ ((firstProduct.img||"").startsWith(`)) {
  bg = bg.split(`+ ((firstProduct.img||"").startsWith(`).join(`+ (firstProduct.img||"").startsWith(`);
  n++;
}
fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');
console.log('Fixed sites: ' + n);
try { new Function(bg); console.log('SYNTAX OK'); }
catch (e) { console.log('SYNTAX ERROR: ' + e.message); }
