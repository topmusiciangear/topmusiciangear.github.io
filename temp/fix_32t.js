const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const G = require(F);
const g = G.find(x => x.id === 'best-32-channel-digital-mixers');
const rows = g.productTable.rows;
const li = rows.findIndex(r => r.label === 'Local I/O (XLR)');
const pi = rows.findIndex(r => r.label === 'Processing Capacity');
if (li === -1 || pi === -1) { console.log('ROWS NOT FOUND'); process.exit(1); }
// Order: X32, M32 LIVE, SQ-6+, Ui24R, TF3, SE 32R, 32S, DL32SE, 32SC
const channelsEN = [
  '32 channels (up to 40)',
  '32 channels (up to 40)',
  '24 channels (up to 48)',
  '24 channels',
  '24 channels (up to 48)',
  '32 channels',
  '32 channels (up to 40)',
  '32 channels',
  '32 channels (16 local, expands to 32)'
];
const channelsES = [
  '32 canales (hasta 40)',
  '32 canales (hasta 40)',
  '24 canales (hasta 48)',
  '24 canales',
  '24 canales (hasta 48)',
  '32 canales',
  '32 canales (hasta 40)',
  '32 canales',
  '32 canales (16 físicos, expande a 32)'
];
rows[li] = {
  label: 'Channels',
  label_es: 'Canales',
  values: channelsEN.map((v, i) => ({ value: v, value_es: channelsES[i] }))
};
rows.splice(pi, 1);
console.log('OK channels row merged');
// Physical Faders -> channel faders only
const f = rows.find(r => r.label === 'Physical Faders');
const fadersEN = ['16 motorized', '16 motorized', '24 motorized', '0 (app only)', '24 motorized', '0 (app only)', '32 motorized', '0 (app only)', '16 motorized'];
const fadersES = ['16 motorizados', '16 motorizados', '24 motorizados', '0 (solo app)', '24 motorizados', '0 (solo app)', '32 motorizados', '0 (solo app)', '16 motorizados'];
f.values.forEach((v, i) => { v.value = fadersEN[i]; v.value_es = fadersES[i]; });
console.log('OK faders fixed');
fs.writeFileSync(F, JSON.stringify(G, null, 2));