const fs = require('fs');
const path = require('path');

const olds = ['59e1c43c7e', '9cbc7cb3fe', '603d3f77a9'];
const files = [];
function walk(dir, depth) {
  if (depth > 2) return;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === '.git' || e.name === 'temp' || e.name === 'node_modules') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, depth + 1);
    else if (/\.(json|html|js|xml|txt)$/.test(e.name)) files.push(p);
  }
}
walk('.', 0);

for (const k of olds) {
  const hits = files.filter(f => fs.readFileSync(f, 'utf8').includes(k));
  console.log(k + ': ' + (hits.length ? hits.join(', ') : 'sin referencias'));
}
