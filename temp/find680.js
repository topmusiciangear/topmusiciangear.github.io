const fs = require('fs');
const src = fs.readFileSync('build-guides.js', 'utf8');
[680, 681].forEach(id => {
  const re = new RegExp('^\\s*' + id + ': \\{', 'm');
  const m = re.exec(src);
  console.log(id + ' -> ' + (m ? ('line ' + src.slice(0, m.index).split('\n').length + ' ctx: ' + JSON.stringify(m[0])) : 'NO MATCH'));
});