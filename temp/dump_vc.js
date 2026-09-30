const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
['stage-mics', 'vocal-plugins', 'channel-strip-plugins', 'midi-keyboards', 'midi-controllers', 'budget-interfaces'].forEach(gid => {
  const g = G.find(x => x.id === gid);
  console.log('== ' + gid + ' V: ' + g.verdict);
  console.log('== ' + gid + ' V_ES: ' + g.verdict_es);
  console.log('== ' + gid + ' C: ' + g.conclusion);
  console.log('== ' + gid + ' C_ES: ' + g.conclusion_es);
});
