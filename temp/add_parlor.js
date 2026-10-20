const fs = require('fs');
let s = fs.readFileSync('temp/score_overrides.js', 'utf8');
const lines = s.split('\n');

const target = '  "best-piano-keyboard-vsts": {';
let idx = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('"best-piano-keyboard-vsts"')) {
    idx = i;
    break;
  }
}
console.log('Found at line:', idx + 1);
if (idx !== -1) {
  const insert = '  "best-parlor-guitars": {\n    "Guitarra Parlor Electroacústica Yamaha CSF1M": 9.8,\n    "Guitarra PRS SE P20e Tonare Parlor": 9.4,\n    "Guitarra Gretsch G9500 Jim Dandy Flat Top": 9.6,\n    "Guitarra Electroacústica Fender Highway Series Parlor All-Mahogany": 9.3,\n    "Guitarra Gretsch G5021E Rancher Penguin Parlor": 9.2,\n    "Guitarra Parlor Electroacústica Epiphone L-00 Studio": 9.1,\n    "Guitarra Acústica Fender CP-60S Parlor": 9.0\n  },\n';
  lines.splice(idx, 0, insert);
  fs.writeFileSync('temp/score_overrides.js', lines.join('\n'), 'utf8');
  console.log('Added');
} else {
  console.log('NOT FOUND');
}