// budget-usb-mics: +4 table rows (all values manufacturer-verified) +
// remove false T669 headphone pro (verified: no jack).
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = G.find(x => x.id === 'budget-usb-mics');
const V = (value, value_es) => ({ value, value_es });
const NP = V('Not published', 'No publicado');
const YES = V('Yes', 'Sí'), NO = V('No', 'No');
// column order: Q2U AM8 SoloCast2 NTUSBmini PM461 TC777 YetiNano PD200X K688 T669 Seiren SoloCast A6V
const polar = ['Cardioid','Cardioid','Cardioid','Cardioid','Cardioid','Cardioid','Cardioid/Omni','Cardioid','Cardioid','Cardioid','Supercardioid','Cardioid','Cardioid']
  .map(s => V(s, s.replace('Cardioid', 'Cardioide').replace('Supercardioid', 'Supercardioide').replace('Omni', 'Omni')));
const fr = ['50 Hz – 15 kHz','50 Hz – 16 kHz',NP,'20 Hz – 20 kHz','20 Hz – 20 kHz','100 Hz – 16 kHz','20 Hz – 20 kHz','40 Hz – 16 kHz','50 Hz – 16 kHz','20 Hz – 20 kHz','20 Hz – 20 kHz','20 Hz – 20 kHz','60 Hz – 18 kHz'];
const bit = ['16-bit/48kHz','16-bit/48kHz','24-bit/96kHz','24-bit/48kHz',NP,'16-bit/44.1kHz','24-bit/48kHz','24-bit/48kHz',NP,'16-bit/48kHz','24-bit/96kHz','16-bit/48kHz','16-bit/44.1kHz'];
const hp = [YES,YES,NO,YES,NO,NO,YES,YES,YES,NO,NO,NO,NO];
const rows = {};
g.productTable.rows.forEach(r => { rows[r.label] = r; });
const at = g.productTable.rows.findIndex(r => r.label === 'Connection');
g.productTable.rows.splice(at + 1, 0,
  { label: 'Polar Pattern', label_es: 'Patrón polar', values: polar.map(v => typeof v === 'string' ? V(v, v) : v) },
  { label: 'Frequency Response', label_es: 'Respuesta de frecuencia', values: fr.map(v => typeof v === 'string' ? V(v, v) : v) },
  { label: 'Bit Depth / Sample Rate', label_es: 'Bits / Frecuencia de muestreo', values: bit.map(v => typeof v === 'string' ? V(v, v) : v) },
  { label: 'Headphone Monitoring', label_es: 'Monitorización con auriculares', values: hp }
);
// remove false T669 headphone pro
const t669 = g.verdictProsCons.find(v => v.name === 'FIFINE T669 USB Microphone Kit');
t669.pros = t669.pros.filter(s => !/Headphone jack/i.test(s));
t669.pros_es = t669.pros_es.filter(s => !/auriculares para monitorización sin latencia/i.test(s));
t669.cons.push('No headphone jack — monitor through your software instead');
t669.cons_es.push('Sin salida de auriculares — monitoriza por software');
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
const gg = JSON.parse(fs.readFileSync('data/guides.json', 'utf8')).find(x => x.id === 'budget-usb-mics');
console.log('rows: ' + gg.productTable.rows.map(r => r.label + '(' + r.values.length + ')').join(' | '));
const t = gg.verdictProsCons.find(v => v.name === 'FIFINE T669 USB Microphone Kit');
console.log('T669: p' + t.pros.length + '/c' + t.cons.length);
