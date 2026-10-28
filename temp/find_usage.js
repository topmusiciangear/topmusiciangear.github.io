const fs = require('fs');
const c = fs.readFileSync('build-guides.js','utf8');
// Search for where reviewRow variable is consumed
const lines = c.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('reviewRow') && !lines[i].includes('const reviewRow')) {
    console.log(i+1, lines[i].substring(0,80).replace(/\s+/g,' '));
  }
}
