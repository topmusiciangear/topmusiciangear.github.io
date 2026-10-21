const fs = require('fs');
const lines = fs.readFileSync('build-guides.js', 'utf8').split(/\r?\n/);
lines.forEach((l, i) => {
  if (/oosList|oos\b/.test(l) && i > 6100 && i < 6500) console.log((i + 1) + ': ' + l.trim().slice(0, 200));
});
