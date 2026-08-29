const cp = require('child_process');
const fs = require('fs');
// HEAD version
const headRaw = cp.execSync('git show HEAD:data/guides.json', { maxBuffer: 100*1024*1024 }).toString('utf8');
const wcRaw = fs.readFileSync('data/guides.json', 'utf8');
const head = JSON.parse(headRaw.replace(/^\ufeff/, ''));
const wc = JSON.parse(wcRaw.replace(/^\ufeff/, ''));
const ids = new Set([...head.map(g => g.id), ...wc.map(g => g.id)]);
const changed = [];
ids.forEach(id => {
  const a = head.find(g => g.id === id);
  const b = wc.find(g => g.id === id);
  const sa = JSON.stringify(a || null);
  const sb = JSON.stringify(b || null);
  if (sa !== sb) changed.push(id);
});
console.log('Changed guide ids:', changed.length);
console.log(changed.join('\n'));
