const fs = require('fs');
const g = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));
const s = g.find(x => x.id === 'starter-studio');

const paras = (html) => (html || '').split('</p>').map(p => p.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()).filter(Boolean);

const OBJETIVOS = [
  { sec: 4,  re: /6110|circuitry|Unison/i },
  { sec: 10, re: /DIN|MIDI/i },
  { sec: 13, re: /.*/ },
  { sec: 14, re: /paja|escurrid|padding|acolchado/i },
  { sec: 15, re: /mil[ií]metros|mm|acolchad|padding|padz/i },
  { sec: 17, re: /Doppler/i },
  { sec: 19, re: /comp|comping|toma/i }
];

OBJETIVOS.forEach(o => {
  const sec = s.sections[o.sec];
  console.log('\n' + '='.repeat(78));
  console.log('  SECCION [' + o.sec + ']  ' + sec.heading_es);
  console.log('='.repeat(78));
  ['content', 'content_es'].forEach(k => {
    console.log('\n  ---- ' + k + ' ----');
    paras(sec[k]).forEach((p, i) => {
      const marca = o.re.test(p) ? '>>' : '  ';
      console.log(marca + ' [' + i + '] ' + p);
    });
  });
});
