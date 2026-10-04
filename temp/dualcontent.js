const G = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
['best-interface','best-microphone','best-plugins','portable-interfaces','guitar-bass-amps','guitar-pedals','live-sound-pa','daw-guide','beginner-guitar','best-electric-guitar','best-mic-for-podcasting','best-digital-mixers','beginner-bass-guitars','mics-for-creators'].forEach(id => {
  const g = G.find(x => x.id === id);
  const t = g.intro.replace(/<[^>]*>/g, '|').replace(/\|+/g, '|');
  console.log('=== ' + id + ' PTrows=[' + (g.productTable ? g.productTable.rows.map(r => r.label).join(',') : 'NO-PT') + ']');
  console.log('INTRO-TABLE:' + t.slice(0, 500));
});