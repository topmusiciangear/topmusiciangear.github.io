const fs = require('fs');
const s = fs.readFileSync('js/app.min.js', 'utf8').replace(/^\uFEFF/, '');
const chars = [];
for (let i = 0; i < s.length; i++) {
  const cp = s.codePointAt(i);
  if (cp > 0xFF) { chars.push({ i, ch: s[i] }); if (s[i].length > 1) i++; }
}
console.log('total >0xFF on disk:', chars.length);
for (const c of chars) {
  const ctx = JSON.stringify(s.slice(Math.max(0, c.i - 24), c.i + 24));
  console.log('U+' + c.ch.codePointAt(0).toString(16).toUpperCase(), '->', ctx);
}