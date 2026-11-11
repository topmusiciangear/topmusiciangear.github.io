// extrae campo completo + par _es para cada objetivo del fix EN
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const g = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

function get(guide, path) {
  // path ej: 'sections[2].heading'
  const m = path.match(/^([a-zA-Z]+)\[(\d+)\]\.([a-zA-Z]+)$/);
  if (m) return guide[m[1]] && guide[m[1]][+m[2]] ? guide[m[1]][+m[2]][m[3]] : undefined;
  return guide[path];
}

const OBJETIVOS = [
  ['best-keyboard', 'conclusion'],
  ['nord-stage-4-vs-montage-m8x', 'conclusion'],
  ['best-plugins', 'conclusion'],
  ['best-drum-machine', 'conclusion'],
  ['channel-strip-plugins', 'conclusion'],
  ['channel-strip-plugins', 'sections[2].heading'],
  ['american-pro-vs-les-paul', 'sections[0].heading'],
  ['best-condenser-mics', 'sections[1].heading'],
  ['best-condenser-mics', 'sections[2].heading'],
  ['best-drum-machine', 'sections[0].heading'],
  ['c414-vs-u87', 'sections[0].heading'],
  ['c414-vs-u87', 'sections[1].heading'],
  ['katana-vs-dsl', 'sections[0].heading'],
  ['katana-vs-dsl', 'sections[1].heading'],
  ['nord-stage-4-vs-montage-m8x', 'sections[0].heading'],
  ['nord-stage-4-vs-montage-m8x', 'sections[1].heading'],
  ['player-strat-vs-pacifica', 'sections[0].heading'],
  ['player-strat-vs-pacifica', 'sections[1].heading'],
  ['sm57-vs-md421', 'sections[0].heading'],
  ['sm57-vs-md421', 'sections[1].heading'],
  ['sidechain-modulation-plugins', 'sections[0].heading'],
  ['best-plugins', 'sections[0].heading'],
  ['beginner-guitar', 'intro'],
  ['best-electric-guitars-2026', 'intro'],
  ['best-condenser-mics', 'intro'],
  ['best-piano-keyboard-vsts', 'intro'],
  ['player-strat-vs-pacifica', 'conclusion'],
  ['portable-interfaces', 'intro'],
  ['pro-drum-machines', 'intro'],
  ['blx288-vs-ewd', 'intro'],
  ['studio-subwoofers', 'conclusion'],
  ['studio-subwoofers-setup', 'intro'],
  ['best-stage-keyboards', 'intro']
];

OBJETIVOS.forEach(function (o) {
  const guide = g.find(x => x.id === o[0]);
  if (!guide) { console.log('### ' + o[0] + ' NO EXISTE'); return; }
  const v = get(guide, o[1]);
  console.log('### ' + o[0] + '.' + o[1] + ' (' + (v ? v.length : 'null') + ')');
  if (o[1].indexOf('heading') >= 0 || o[1].indexOf('intro') === -1 && v && v.length < 400) {
    console.log('EN: ' + v);
  } else if (v) {
    // intro/conclusion largos: solo las frases relevantes
    console.log('EN[primeros 500]: ' + v.slice(0, 500));
    console.log('EN[ultimos 500]: ' + v.slice(-500));
  }
  const esKey = o[1] + '_es';
  const vEs = get(guide, esKey);
  if (vEs) {
    console.log('ES: ' + (vEs.length > 500 ? vEs.slice(0, 250) + ' … ' + vEs.slice(-250) : vEs));
  }
  console.log('');
});
