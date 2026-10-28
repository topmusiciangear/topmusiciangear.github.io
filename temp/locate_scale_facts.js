const fs = require('fs');
const lines = fs.readFileSync('data/products.json', 'utf8').split(/\r?\n/);
const targets = [2658, 3584, 12441, 14674, 21770, 26092, 26145];
for (const n of targets) {
  let id = '?';
  let title = '?';
  for (let i = n - 1; i > Math.max(0, n - 150); i--) {
    if (id === '?') {
      const m = lines[i].match(/"id":\s*(\d+)/);
      if (m) id = m[1];
    }
    if (title === '?') {
      const m = lines[i].match(/"title":\s*"([^"]+)"/);
      if (m) title = m[1];
    }
    if (id !== '?' && title !== '?') break;
  }
  console.log(n + ' -> id ' + id + ' | ' + title);
}
