const fs = require('fs');
const L = fs.readFileSync('build-guides.js', 'utf8').split(/\r?\n/);
[374, 375, 376, 377, 380].forEach(id => {
  const i = L.findIndex(l => l.match(new RegExp('^\\s*' + id + ':')));
  if (i < 0) { console.log(id, 'NOT FOUND'); return; }
  console.log(id + ': ' + L.slice(i, i + 8).join(' ').slice(0, 300));
});
