const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const jobs = [
  ['best-synth-vsts', ['Serum']],
  ['best-midi-theory-plugins', ['Captain', 'Orb Producer', 'Orb Suite']],
  ['best-piano-keyboard-vsts', ['Keyscape', 'Pianoteq', 'UVI', 'Pleyel']],
  ['best-guitar-plugins', ['BIAS', 'TH-U', 'Overloud', 'Positive Grid', 'rockrack', 'Rockrack', 'bx_rockrack', 'Amp Room']],
  ['best-audio-repair-plugins', ['Soothe', 'Oeksound', 'Chameleon', 'Accentize']],
  ['autotune-vs-melodyne', ['2026', '35%']],
  ['vocalign-vs-revoice-pro', ['249', '499', 'Pro 4', 'Pro 5']],
  ['mixing-plugins', ['SSL Mastering', 'X-ValveComp', 'Fusion Stereo', '209.99', 'Console Glue']]
];
jobs.forEach(([id, terms]) => {
  const gd = guides.find(g => g.id === id);
  console.log('############ ' + id + ' ############');
  const walk = (o, path) => {
    if (typeof o === 'string') {
      terms.forEach(t => {
        if (o.includes(t)) {
          const i = o.indexOf(t);
          console.log('[' + path + '] ...' + o.substring(Math.max(0, i - 120), i + t.length + 120).replace(/\n/g, ' ') + '...');
        }
      });
    }
    else if (Array.isArray(o)) o.forEach((v, i) => walk(v, path + '[' + i + ']'));
    else if (o && typeof o === 'object') Object.entries(o).forEach(([k, v]) => walk(v, path + '.' + k));
  };
  walk(gd, '');
  console.log('');
});
