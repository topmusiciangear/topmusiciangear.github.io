const fs = require('fs');
let s = fs.readFileSync('temp/score_overrides.js', 'utf8');
if (!s.startsWith('module.exports')) {
  const idx = s.indexOf('{');
  if (idx > 0) {
    s = 'module.exports = ' + s.slice(idx);
    fs.writeFileSync('temp/score_overrides.js', s, 'utf8');
    console.log('Fixed module.exports');
  } else {
    console.log('No { found');
  }
} else {
  console.log('Already has module.exports');
}