const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = require(DIR + 'data/guides.json');
// removals: later Closer-Look dupes where a dedicated review exists
[['stage-mics', 'AKG D5: A Closer Look'],
 ['dxr-vs-prx', 'JBL PRX ONE: A Closer Look'],
 ['best-analog-mixers', 'SSL BiG SiX: A Closer Look']
].forEach(([gid, h]) => {
  const g = G.find(x => x.id === gid);
  const i = g.sections.findIndex(s => s.heading === h);
  if (i > -1) { g.sections.splice(i, 1); console.log('REMOVED ' + gid + ' "' + h + '"'); }
  else console.log('NOTFOUND ' + gid);
});
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2));