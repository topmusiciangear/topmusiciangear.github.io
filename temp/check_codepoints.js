const fs = require('fs');
const raw = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8');
const lines = raw.split('\n');
const l = lines[104685];
const j = l.indexOf('> </span>');
const seg = l.slice(j + 12, j + 120);
console.log('segmento:', JSON.stringify(seg));
console.log('code points no-ASCII o espacio:');
[...seg].forEach((ch, k) => {
  const cp = ch.codePointAt(0);
  if (cp > 126 || cp === 32) console.log('  pos ' + k + ': U+' + cp.toString(16).padStart(4, '0') + ' (' + JSON.stringify(ch) + ')');
});
