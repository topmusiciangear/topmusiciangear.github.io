const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const pluginIds = guides.filter(g => g.category === 'plugins').map(g => g.id);

let homes = 0, badAsin = 0, total = 0;
const asinSet = {};
for (const id of pluginIds) {
  for (const suf of ['', '_es']) {
    const f = 'guides/' + id + suf + '.html';
    if (!fs.existsSync(f)) continue;
    const s = fs.readFileSync(f, 'utf8');
    for (const m of s.matchAll(/data-store="amazon" href="([^"]*)"/g)) {
      total++;
      const u = m[1];
      if (/^https?:\/\/(www\.)?amazon\.[a-z.]+\/?\?tag=/.test(u) || /^https?:\/\/(www\.)?amazon\.[a-z.]+\/?$/.test(u)) { homes++; console.log('HOME  ' + f + '  ' + u); }
      const a = (u.match(/\/dp\/([A-Z0-9]{10})/i) || [])[1];
      if (a) asinSet[a] = (asinSet[a] || 0) + 1;
      else { badAsin++; console.log('NOASIN ' + f + '  ' + u); }
    }
  }
}
console.log('\nplugin guides:', pluginIds.length, '| amazon rows:', total, '| home:', homes, '| non-dp:', badAsin);
console.log('ASINs usados:', Object.entries(asinSet).map(([a, n]) => a + '×' + n).join(', '));
