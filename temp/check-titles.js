const fs = require('fs');
const data = fs.readFileSync('C:\\Users\\Daniel\\projects\\topmusiciangear\\data\\guides.json','utf8');
const lines = data.split('\n');
let count = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (line.startsWith('"esTitle"')) {
    const match = line.match(/"esTitle"\s*:\s*"(.+?)"/);
    if (match) {
      const title = match[1];
      const words = title.split(' ');
      const caps = words.slice(1).filter(w => w.length > 1 && w[0] === w[0].toUpperCase() && /[A-Z]/.test(w[0]));
      if (caps.length > 0) {
        console.log('Line ' + (i+1) + ': ' + title);
        console.log('  Caps: ' + caps.join(', '));
        count++;
      }
    }
  }
}
console.log('\nTotal: ' + count);
