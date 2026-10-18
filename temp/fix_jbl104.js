const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const rg = B + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(rg, 'utf8'));
const g = guides.find(x => x.id === 'best-home-studio-speakers');
const s = g.sections[0];

s.content = s.content.replace('The JBL 104-BT is 60 Hz at minus 10 dB but 88 Hz at minus 3 dB',
  'Some monitors claim 60 Hz at minus 10 dB but 88 Hz at minus 3 dB');
s.content_es = s.content_es.replace('El JBL 104-BT da 60 Hz a menos 10 dB pero 88 Hz a menos 3 dB',
  'Algunos monitores declaran 60 Hz a menos 10 dB pero 88 Hz a menos 3 dB');

fs.writeFileSync(rg, JSON.stringify(guides, null, 2), 'utf8');
console.log('JBL 104-BT eliminado de sección 0');