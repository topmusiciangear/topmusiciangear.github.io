const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

const names = {
  'mixing-plugins': [
    { match: 'Legendary SSL Bus Compressor', name: 'SSL Mastering Bundle', name_es: 'SSL Mastering Bundle' },
    { match: 'True-peak detection', name: 'NUGEN Audio ISL 2st', name_es: 'NUGEN Audio ISL 2st' }
  ],
  'vocal-plugins': [
    { match: 'Complete vocal production bundle', name: 'RePitch 2 + VocAlign 7 Pro Bundle', name_es: 'Bundle RePitch 2 + VocAlign 7 Pro' }
  ]
};

Object.entries(names).forEach(([gid, list]) => {
  const gd = guides.find(g => g.id === gid);
  list.forEach(({ match, name, name_es }) => {
    const v = gd.verdictProsCons.find(v => !v.name && v.pros && v.pros[0] && v.pros[0].includes(match));
    if (v) { v.name = name; v.name_es = name_es; console.log(gid + ': named verdict "' + name + '"'); }
    else console.log(gid + ': NOT FOUND for match "' + match + '"');
  });
});

fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('Done');
