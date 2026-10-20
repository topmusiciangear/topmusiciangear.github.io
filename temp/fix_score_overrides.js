const fs = require('fs');
const s = fs.readFileSync('temp/score_overrides.js', 'utf8');

// Check if it starts with module.exports
if (!s.startsWith('module.exports')) {
  // Find first {
  const idx = s.indexOf('{');
  if (idx > 0) {
    let newS = 'module.exports = ' + s.slice(idx);
    fs.writeFileSync('temp/score_overrides.js', newS, 'utf8');
    console.log('Fixed module.exports');
  } else {
    console.log('No { found');
  }
} else {
  console.log('Already has module.exports');
}