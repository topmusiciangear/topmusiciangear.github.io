const fs = require('fs');
const key = '521925cff9';
const hits = [];
const walk = (dir) => {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = dir + '/' + f.name;
    if (f.isDirectory()) {
      if (['node_modules', '.git', 'img/cut', 'temp'].includes(p)) continue;
      walk(p);
    } else if (/\.(json|html|js|xml|txt|md)$/.test(f.name)) {
      const s = fs.readFileSync(p, 'utf8');
      if (s.includes(key)) hits.push(p);
    }
  }
};
walk('.');
console.log('referencias a ' + key + ': ' + hits.length);
hits.slice(0, 12).forEach(h => console.log('  ' + h));
