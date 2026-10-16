const guides = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const m = guides.find(g => g.id === 'mixing-plugins');
console.log('EN: ' + m.verdict.slice(0, 600));
console.log('---ES: ' + m.verdict_es.slice(0, 600));
const ids = ['best-synth-vsts','best-midi-theory-plugins','best-piano-keyboard-vsts','best-guitar-plugins','best-audio-repair-plugins','autotune-vs-melodyne','ozone-vs-fabfilter','vocalign-vs-revoice-pro'];
ids.forEach(id => {
  const g = guides.find(x => x.id === id);
  console.log(id + ': verdict=' + ('verdict' in g) + ' vpc=' + ((g.verdictProsCons||[]).length));
});
