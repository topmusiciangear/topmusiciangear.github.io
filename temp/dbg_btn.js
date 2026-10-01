const fs = require('fs');
const b = fs.readFileSync('build-guides.js', 'utf8');
[194, 197].forEach(id => {
  const re = new RegExp('^\\s*' + id + ':\\s*\\{([\\s\\S]*?)\\r?\\n\\s*\\},?\\s*$', 'm');
  const m = b.match(re);
  console.log('== ' + id + ' matchlen=' + (m ? m[1].length : 'NO'));
  if (m) console.log(JSON.stringify(m[1].slice(0, 200)));
  const idx = b.indexOf('\n  ' + id + ': {');
  console.log('   indexOf test-shop-btn context: ' + JSON.stringify(b.slice(Math.max(0, idx - 120), idx)));
});
