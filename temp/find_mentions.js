const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const terms = ['Serum', 'Captain', 'Orb Producer', 'Orb Suite', 'Keyscape', 'Pianoteq', 'UVI Augmented', 'BIAS', 'TH-U', 'rockrack', 'Rockrack', 'Soothe', 'Chameleon', 'AutoTune 2026', 'Auto-Tune 2026', '$250', 'Melodyne 5 Essential', 'Revoice Pro 4', '$499', '$249', 'VPS Avenger', 'UAD Sound City', 'Amp Room', 'PitchMap', 'PITCHMAP', 'Playbeat', 'Kontakt 8', 'Massive X', 'u-he Diva', 'Pigments', 'Phase Plant', 'Scaler 3', 'RX 12', 'Ozone', 'FabFilter', 'VocAlign', 'Melodyne'];
['best-synth-vsts','best-midi-theory-plugins','best-piano-keyboard-vsts','best-guitar-plugins','best-audio-repair-plugins','autotune-vs-melodyne','ozone-vs-fabfilter','vocalign-vs-revoice-pro','mixing-plugins','vocal-plugins'].forEach(id => {
  const gd = guides.find(g => g.id === id);
  const texts = [];
  const walk = (o, path) => {
    if (typeof o === 'string') texts.push([path, o]);
    else if (Array.isArray(o)) o.forEach((v, i) => walk(v, path + '[' + i + ']'));
    else if (o && typeof o === 'object') Object.entries(o).forEach(([k, v]) => walk(v, path + '.' + k));
  };
  walk(gd, id);
  console.log('=== ' + id + ' ===');
  terms.forEach(t => {
    let n = 0;
    texts.forEach(([p, s]) => { if (s.includes(t)) n++; });
    if (n) console.log('  "' + t + '": ' + n + ' fields');
  });
});
