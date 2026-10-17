const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'best-piano-keyboard-vsts');
console.log('guide.image actual: ' + g.image);
console.log('otros campos de imagen: ' + Object.keys(g).filter(k => /img|image|hero|thumb/i.test(k)).join(', '));
// como lo usan otras guias (referencia de formato)
['best-synth-vsts', 'best-audio-repair-plugins'].forEach(id => {
  const x = guides.find(y => y.id === id);
  console.log(id + '.image = ' + (x ? x.image : 'n/a'));
});