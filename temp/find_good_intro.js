// Find last good intro for each corrupted guide by walking git history.
const { execSync } = require('child_process');
const ids = ['budget-interfaces', 'hs8-vs-rokit-7', 'rme-vs-motu', 'blues-junior-vs-ac30', 'katana-vs-dsl', 'best-digital-mixers'];
const revs = execSync('git log --format=%H -- data/guides.json', { encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 }).split('\n').filter(Boolean);
for (const id of ids) {
  for (const rev of revs) {
    try {
      const raw = execSync('git show ' + rev + ':data/guides.json', { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 });
      const G = JSON.parse(raw);
      const g = G.find(x => x.id === id);
      if (g && typeof g.intro === 'string' && g.intro.indexOf('{"id":') === -1) {
        console.log(id + ' OK at ' + rev.slice(0, 12) + ' intro_len=' + g.intro.length + ' head=' + JSON.stringify(g.intro.slice(0, 80)));
        break;
      }
    } catch (e) { /* keep walking */ }
  }
}