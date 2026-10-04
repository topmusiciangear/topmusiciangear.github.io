const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const G = require(F);
const g = G.find(x => x.id === 'stream-controllers');
const V = (en, es) => ({ value: en, value_es: es });
// drop phantom col 10
g.productTable.columns.splice(9, 1);
g.productTable.rows.forEach(r => { if (r.values.length > 9) r.values.splice(9, 1); });
const setRow = (label, arr) => {
  const r = g.productTable.rows.find(r => r.label === label);
  r.values = arr.map(([en, es]) => V(en, es));
};
setRow('Keys / Controls', [
  ['8 LCD keys + 4 dials + touch strip', '8 teclas LCD + 4 diales + tira táctil'],
  ['4 customizable SMART pads', '4 pads SMART personalizables'],
  ['5-in. screen, 4 infinite knobs, 7 buttons', 'Pantalla de 5 pulg., 4 perillas infinitas y 7 botones'],
  ['1 multifunction dial + tap-to-mute', '1 dial multifunción + silencio táctil'],
  ['36 LCD keys + 6 dials + touch strip', '36 teclas LCD + 6 diales + tira táctil'],
  ['15 LCD keys', '15 teclas LCD'],
  ['15 Switchblade LCD buttons', '15 botones LCD Switchblade'],
  ['5-in. screen + 4 push-button encoders', 'Pantalla de 5 pulg. + 4 codificadores con pulsador'],
  ['15 touch buttons + 2 dials + 4 tactile buttons', '15 botones táctiles + 2 diales + 4 botones físicos']
]);
setRow('Connectivity', [
  ['USB-C (USB 2.0)', 'USB-C (USB 2.0)'],
  ['Dual USB-C, HDMI in/out, XLR combo, headset jacks', '2x USB-C, HDMI entrada/salida, combo XLR y jacks de headset'],
  ['USB-C (USB-C to USB-A cable)', 'USB-C (cable USB-C a USB-A)'],
  ['USB-C host, XLR in, 3.5mm headphone out', 'USB-C al PC, entrada XLR y salida de auriculares de 3,5 mm'],
  ['USB-C', 'USB-C'],
  ['USB-C', 'USB-C'],
  ['USB-C device, USB-A host (2m cable)', 'USB-C al equipo, USB-A al PC (cable de 2 m)'],
  ['USB-C (USB-C to USB-A cable)', 'USB-C (cable USB-C a USB-A)'],
  ['USB-C (USB-A adapter included)', 'USB-C (adaptador a USB-A incluido)']
]);
setRow('Software', [
  ['Stream Deck app', 'App Stream Deck'],
  ['RODE Central / UNIFY', 'RODE Central / UNIFY'],
  ['BEACN app', 'App BEACN'],
  ['Wave Link', 'Wave Link'],
  ['Stream Deck app', 'App Stream Deck'],
  ['Stream Deck app', 'App Stream Deck'],
  ['Loupedeck Software (via Razer Synapse)', 'Software Loupedeck (desde Razer Synapse)'],
  ['BEACN app', 'App BEACN'],
  ['Loupedeck Software', 'Software Loupedeck']
]);
setRow('Price', [
  ['$159.99–$179.99', '$159.99–$179.99'],
  ['$229–$249', '$229–$249'],
  ['$199–$229', '$199–$229'],
  ['~$169.99', '~$169.99'],
  ['~$349.99', '~$349.99'],
  ['~$149.99', '~$149.99'],
  ['~$149.99', '~$149.99'],
  ['~$99', '~$99'],
  ['~$179', '~$179']
]);
fs.writeFileSync(F, JSON.stringify(G, null, 2));
console.log('stream table done');
// verify alignment
const gg = JSON.parse(fs.readFileSync(F, 'utf8')).find(x => x.id === 'stream-controllers');
console.log('cols:', gg.productTable.columns.length);
gg.productTable.rows.forEach(r => console.log(r.label, r.values.length));