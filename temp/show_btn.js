const fs = require('fs');
const L = fs.readFileSync('build-guides.js', 'utf8').split(/\r?\n/);
[140, 570].forEach(id => {
  const i = L.findIndex(l => l.match(new RegExp('^\\s*' + id + ':')));
  console.log(id + ':', L[i]);
});
