const fs = require('fs');
const t = fs.readFileSync('js/guide-scores.js', 'utf8');
const m = t.match(/"portable-interfaces":\s*\{([^}]+)\}/);
if (m) {
  console.log('portable-interfaces ACTUAL:');
  m[1].split('\n').filter(l => l.includes(':') && !l.includes('(')).forEach(l => console.log(' ', l.trim()));
} else {
  console.log('NOT FOUND');
}
