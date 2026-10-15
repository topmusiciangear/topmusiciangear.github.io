const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
['build-guides.js', 'js/app.js', 'js/app.min.js'].forEach(f => {
  const s = fs.readFileSync(BASE + f, 'utf8');
  const n = (s.match(/replace\('\/a--925521', ''\)/g) || []).length;
  console.log('  ' + f.padEnd(18) + " replace('/a--925521','') x" + n);
});
