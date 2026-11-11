// heading_es actuales de las secciones con fórmula "Is the X the Best Y?" + ES de conclusions largas
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

const ids = ['american-pro-vs-les-paul', 'best-condenser-mics', 'best-drum-machine', 'c414-vs-u87',
  'katana-vs-dsl', 'nord-stage-4-vs-montage-m8x', 'player-strat-vs-pacifica', 'sm57-vs-md421',
  'sidechain-modulation-plugins', 'channel-strip-plugins'];

ids.forEach(function (id) {
  const guide = g.find(x => x.id === id);
  if (!guide || !guide.sections) return;
  guide.sections.forEach(function (s, i) {
    if (s.heading && /Is the .+ the (?:Best|Most)|is the .+ the best/i.test(s.heading)) {
      console.log(id + '.sections[' + i + ']');
      console.log('  EN: ' + s.heading);
      console.log('  ES: ' + (s.heading_es || '(sin)'));
    }
  });
});

// ES completo de best-drum-machine.conclusion
const dm = g.find(x => x.id === 'best-drum-machine');
console.log('\n=== best-drum-machine.conclusion_es COMPLETO ===');
console.log(dm.conclusion_es);
