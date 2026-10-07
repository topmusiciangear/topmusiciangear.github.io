const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const gFile = DIR + 'data/guides.json';
const G = JSON.parse(fs.readFileSync(gFile, 'utf8'));
const g = G.find(x => x.id === 'best-hardware-samplers');
const rep1 = (txt, from, to) => {
  const c = txt.split(from).length - 1;
  if (c !== 1) throw new Error('found ' + c + 'x: ' + from.slice(0, 70));
  return txt.split(from).join(to);
};
const t = g.productTable;
const trow = l => t.rows.find(rr => rr.label === l);
// 1) MPC Sample pads -> RGB + pressure
let r = trow('Pads');
if (r.values[1].value !== '16 velocity-sensitive MPC') throw new Error('sample pads changed');
r.values[1].value = '16 velocity/pressure-sensitive RGB MPC';
r.values[1].value_es = '16 MPC RGB sensibles a velocidad/presi\u00f3n';
// 2) Digitakt II storage -> internal only
r = trow('Storage');
if (r.values[3].value !== 'microSD card') throw new Error('dt storage changed');
r.values[3].value = '20 GB internal (+Drive)';
r.values[3].value_es = '20 GB internos (+Drive)';
// 3) SP-404MKII battery -> real figures
r = trow('Battery');
if (r.values[0].value !== '~5 hours') throw new Error('sp battery changed: ' + r.values[0].value);
r.values[0].value = 'USB-C / 6xAA (~2.5\u20133.5 h on batteries)';
r.values[0].value_es = 'USB-C / 6xAA (~2,5\u20133,5 h con pilas)';
console.log('table cells fixed');
// 4) new rows after Storage
const mk = (label, label_es, vals) => ({
  label, label_es,
  values: vals.map(([en, es]) => ({ value: en, value_es: es }))
});
const newRows = [
  mk('Polyphony', 'Polifon\u00eda', [
    ['32 voices', '32 voces'],
    ['32 stereo voices', '32 voces est\u00e9reo'],
    ['256 voices max', '256 voces m\u00e1x.'],
    ['16 tracks', '16 pistas']
  ]),
  mk('Working RAM', 'RAM de trabajo', [
    ['185 MB per sample (16 min max)', '185 MB por sample (16 min m\u00e1x.)'],
    ['2 GB', '2 GB'],
    ['4 GB', '4 GB'],
    ['400 MB', '400 MB']
  ]),
  mk('Connectivity', 'Conectividad', [
    ['Mic/guitar in, line I/O, USB-C audio, dual phones', 'Entrada micro/guitarra, l\u00ednea I/O, USB-C audio, doble auriculares'],
    ['Built-in mic, TRS I/O, USB-C audio', 'Micro integrado, TRS I/O, USB-C audio'],
    ['Line in/out, USB-C 24-ch audio, MIDI, CV/Gate', 'Entrada/salida de l\u00ednea, USB-C 24 canales, MIDI, CV/Gate'],
    ['2x line in, 2x out, USB, MIDI In/Out/Thru', '2x entrada de l\u00ednea, 2x salida, USB, MIDI In/Out/Thru']
  ])
];
const si = t.rows.findIndex(rr => rr.label === 'Storage');
t.rows.splice(si + 1, 0, ...newRows);
console.log('rows added');
// 5) FAQ A2
const f = g.featuredSnippet;
f.faq_a2_en = rep1(f.faq_a2_en, 'and both the SP-404MKII and Digitakt II take SD or microSD cards you can load in any size you want.',
  'The SP-404MKII takes SD cards in any size you want, while the Digitakt II relies on its 20 GB of internal +Drive storage (no card slot).');
f.faq_a2_es = rep1(f.faq_a2_es, 'y tanto el SP-404MKII como el Digitakt II aceptan tarjetas SD o microSD del tama\u00f1o que quieras.',
  'El SP-404MKII acepta tarjetas SD del tama\u00f1o que quieras, mientras que el Digitakt II depende de sus 20 GB internos (+Drive), sin ranura para tarjetas.');
console.log('FAQ fixed');
// 6) SEC1 battery sentence
const s1 = g.sections[1];
s1.content = rep1(s1.content, 'and the battery keeps it going for about 5 hours away from a wall.',
  'and six AA batteries keep it going for around 2.5\u20133.5 hours away from a wall (or indefinitely on USB-C power).');
s1.content_es = rep1(s1.content_es, 'y la bater\u00eda lo mantiene encendido unas 5 horas lejos de un enchufe.',
  'y las seis pilas AA lo mantienen encendido unas 2,5\u20133,5 horas lejos de un enchufe (o sin l\u00edmite por USB-C).');
console.log('section fixed');
fs.writeFileSync(gFile, JSON.stringify(G, null, 2) + '\n');
console.log('guides.json written');
