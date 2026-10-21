const fs = require('fs');
const s = fs.readFileSync('guides/monitor-setup_es.html', 'utf8');

function ctxAll(re) {
  let m;
  const out = [];
  while ((m = re.exec(s))) out.push(s.slice(Math.max(0, m.index - 130), m.index + 150).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
  return out;
}

console.log('=== midfield ===');
ctxAll(/midfield/gi).forEach((c, i) => console.log(i + '. ' + c));
console.log('\n=== en el suelo ===');
ctxAll(/en el suelo/gi).forEach((c, i) => console.log(i + '. ' + c));
