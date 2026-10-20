const fs = require('fs');
const s = fs.readFileSync('js/guide-scores.js', 'utf8');
const key = 'beginner-bass-guitars';
const i = s.indexOf(key);
console.log(s.slice(i - 10, i + 800));
