const fs = require('fs');
let s = fs.readFileSync('build-guides.js', 'utf8');
const target = '.top-search-toggle{';
const i = s.indexOf(target);
const prefix = s.slice(i - 3, i);
console.log('prefix:', JSON.stringify(prefix));
if (prefix.endsWith('\\n')) {
  s = s.slice(0, i - 2) + s.slice(i);
  fs.writeFileSync('build-guides.js', s);
  console.log('fixed build-guides.js');
} else {
  console.log('no fix needed');
}