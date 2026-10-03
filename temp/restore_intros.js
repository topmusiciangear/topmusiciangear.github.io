const fs = require('fs');
const { execSync } = require('child_process');
const ids = ['budget-interfaces', 'hs8-vs-rokit-7', 'rme-vs-motu', 'blues-junior-vs-ac30', 'katana-vs-dsl', 'best-digital-mixers'];
const raw = execSync('git show e2f7cec371e2:data/guides.json', { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 });
const OLD = JSON.parse(raw);
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
for (const id of ids) {
  const o = OLD.find(x => x.id === id);
  const g = G.find(x => x.id === id);
  g.intro = o.intro;
  g.intro_es = o.intro_es;
  console.log(id + ' restored intro=' + o.intro.length + ' intro_es=' + o.intro_es.length);
}
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('saved');