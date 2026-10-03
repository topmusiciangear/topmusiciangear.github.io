const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const gi = G.findIndex(x => x.id === 'best-32-channel-digital-mixers');
let s = JSON.stringify(G[gi]);
// 1. ordered rename (longest first; 'Midas M32 LIVE' untouched - no 'M32R' in it)
s = s.split('Midas M32R LIVE').join('PreSonus StudioLive 32S');
s = s.split('M32R LIVE').join('StudioLive 32S');
s = s.split('M32R').join('StudioLive 32S');
let g = JSON.parse(s);
// 2. table col 6
const V = (value, value_es) => ({ value, value_es });
const ci = g.productTable.columns.findIndex(c => c.title === 'PreSonus StudioLive 32S');
const rows = {};
g.productTable.rows.forEach(r => { rows[r.label] = r; });
rows['Best For'].values[ci] = V('One-to-one 33-fader control', 'Control 1:1 con 33 faders');
rows['Local I/O (XLR)'].values[ci] = V('32 XLR', '32 XLR');
rows['Processing Capacity'].values[ci] = V('40 channels (32 mic + 8 aux)', '40 canales (32 mic + 8 aux)');
rows['Sample Rate / Latency'].values[ci] = V('48 kHz', '48 kHz');
rows['Mix Buses'].values[ci] = V('26 mix buses', '26 buses de mezcla');
rows['Multitrack Recording'].values[ci] = V('USB 64x64 + SD', 'USB 64x64 + SD');
rows['Physical Faders'].values[ci] = V('33 motorized', '33 motorizados');
rows['Form Factor'].values[ci] = V('Desktop console', 'Consola de escritorio');
rows['Local Outputs'].values[ci] = V('12 mix XLR + 4 TRS', '12 XLR de mezcla + 4 TRS');
rows['Built-in Screen'].values[ci] = V('7" touchscreen', '7" táctil');
rows['Network Protocol'].values[ci] = V('AVB (Dante via card)', 'AVB (Dante vía tarjeta)');
// 3. section rewrite
const sec = g.sections.find(x => (x.products || []).includes(412));
sec.heading = 'One-to-One Control Without Compromise: PreSonus StudioLive 32S';
sec.heading_es = 'Control uno a uno sin concesiones: PreSonus StudioLive 32S';
sec.content = '<p><strong>The PreSonus StudioLive 32S gives every channel its own fader: 33 touch-sensitive motorized faders driving 40 mixing channels with 32 recallable XMAX-R preamps.</strong> Dual-core FLEX DSP runs 286 processors, 26 mix buses and Fat Channel vintage EQ/compression on every input, with 16 FlexMixes configurable as aux, subgroup or matrix plus 24 DCAs. 64x64 USB audio — the most on any mixer here — records alongside onboard SD multitrack with true Virtual Soundcheck, and AVB/Milan networking expands via NSB stage boxes and EarMix monitors (Dante with the AVB-D16). $2,499 street, £2,159 at Andertons, £2,399 at G4M.</p><p><strong>Why one-to-one matters:</strong> no layers to get lost in during a live show — every input stays under your fingers. The 7-inch touchscreen, scribble strips and Studio One/Capture bundle (plus perpetual Fender Studio Pro license) make it the most complete recording package in this guide. At 16.9 kg it is no lightweight, and 48 kHz max (no 96 kHz) is the honest tradeoff against 96 kHz rivals.</p>';
sec.content_es = '<p><strong>La PreSonus StudioLive 32S da a cada canal su propio fader: 33 faders motorizados táctiles para 40 canales de mezcla con 32 previos XMAX-R recallables.</strong> El DSP FLEX de doble núcleo corre 286 procesadores, 26 buses de mezcla y Fat Channel con EQ vintage/compresión en cada entrada, con 16 FlexMixes configurables como aux, subgrupo o matriz más 24 DCAs. USB 64x64 — lo máximo de esta guía — graba junto al multitrack SD a bordo con Virtual Soundcheck real, y la red AVB/Milan expande vía stage boxes NSB y monitores EarMix (Dante con AVB-D16). $2.499 de calle, £2.159 en Andertons, £2.399 en G4M.</p><p><strong>Por qué importa el uno a uno:</strong> sin capas donde perderse en directo — cada entrada queda bajo tus dedos. La pantalla táctil de 7 pulgadas, los scribble strips y la suite Studio One/Capture (más licencia perpetua Fender Studio Pro) la hacen el paquete de grabación más completo de esta guía. Con 16,9 kg no es ligera, y 48 kHz máximo (sin 96 kHz) es la concesión honesta frente a rivales de 96 kHz.</p>';
// 4. verdict 5+5
const VD = (name, pros, cons, pros_es, cons_es) => ({ name, name_es: name, pros, cons, pros_es, cons_es });
g.verdictProsCons[g.verdictProsCons.findIndex(x => x.name === 'PreSonus StudioLive 32S')] = VD('PreSonus StudioLive 32S',
  ['33 touch-sensitive faders — every channel under your fingers, no layers', '32 recallable XMAX-R preamps with 64x64 USB, the most I/O here', 'Fat Channel vintage EQ/compression on every input plus FLEX FX', 'SD multitrack with true Virtual Soundcheck, no computer needed', 'AVB/Milan ecosystem: NSB boxes, EarMix, Dante via AVB-D16'],
  ['48 kHz maximum — no 96 kHz option', '16.9 kg makes it the heaviest desk here', 'Dante requires the AVB-D16 card', 'AVB ecosystem pays off only with NSB/EarMix add-ons', '33 faders still need layers for all 40 channels'],
  ['33 faders táctiles — cada canal bajo tus dedos, sin capas', '32 previos XMAX-R recallables con USB 64x64, la mayor E/S aquí', 'Fat Channel con EQ vintage/compresión en cada entrada más FLEX FX', 'Multitrack SD con Virtual Soundcheck real, sin ordenador', 'Ecosistema AVB/Milan: cajas NSB, EarMix, Dante vía AVB-D16'],
  ['48 kHz máximo — sin opción de 96 kHz', '16,9 kg la hacen la mesa más pesada aquí', 'Dante requiere la tarjeta AVB-D16', 'El ecosistema AVB rinde solo con add-ons NSB/EarMix', '33 faders aún piden capas para los 40 canales']);
G[gi] = g;
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
const chk = JSON.stringify(g);
console.log('32S count:', chk.split('StudioLive 32S').length - 1);
console.log('bare M32R left:', (chk.match(/M32R(?! LIVE)/g) || []).length);
console.log('M32R LIVE left:', (chk.match(/M32R LIVE/g) || []).length);