const fs = require('fs');
const t = fs.readFileSync('js/guide-scores.js', 'utf8');
const m = t.match(/"budget-interfaces":\s*\{([^}]+)\}/);
if (m) {
  console.log('budget-interfaces scores:');
  m[1].split('\n').filter(l => l.includes(':')).forEach(l => console.log(' ', l.trim()));
} else {
  console.log('NOT FOUND');
}
