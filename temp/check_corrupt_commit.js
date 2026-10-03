// Check if budget-interfaces intro is corrupted at d54813ad05
const { execSync } = require('child_process');
try {
  const raw = execSync('git show d54813ad05:data/guides.json', { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 });
  const G = JSON.parse(raw);
  const g = G.find(x => x.id === 'budget-interfaces');
  console.log('intro type:', typeof g.intro, 'len:', g.intro.length, 'isJSON:', g.intro.indexOf('{"id":') > -1);
} catch (e) { console.log('ERR', e.message.slice(0, 200)); }