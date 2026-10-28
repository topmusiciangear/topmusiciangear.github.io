const { execSync } = require('child_process');
const fs = require('fs');
const head = execSync('git show HEAD:data/guides.json', { maxBuffer: 200 * 1024 * 1024 }).toString('utf8');
const cur = fs.readFileSync('data/guides.json', 'utf8');
for (const [label, raw] of [['HEAD', head], ['CUR', cur]]) {
  const arr = JSON.parse(raw);
  const g = (Array.isArray(arr) ? arr : arr.guides).find(x => x.id === 'budget-mics');
  console.log(label, 'budget-mics titleTag_es:', JSON.stringify(g && g.titleTag_es), g && g.titleTag_es && g.titleTag_es.length);
}
