const fs = require('fs');
const h = fs.readFileSync('guides/best-plugins.html', 'utf8');
const parts = h.split('guide-section-imgs');
console.log('mediabuy img blocks:', parts.length - 1);
for (let i = 1; i < parts.length && i < 15; i++) {
  const seg = parts[i].slice(0, 220).replace(/\s+/g, ' ');
  console.log(i + ' :: ' + seg);
}
