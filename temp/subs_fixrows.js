const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
const d = guides.find(x => x.id === 'best-live-subwoofers');
const V = (en, es) => ({ value: en, value_es: es || en });
const fix = {
  'Woofer': [V('18" woofer'), V('18" woofer')],
  'Cardioid Mode': [V('No', 'No'), V('Yes, stackable', 'Sí, apilable')],
  'DSP & Control': [V('DSP tunings + phase switch, no app', 'DSP + fase, sin app'), V('dbx DSP + LCD + Bluetooth app', 'dbx DSP + LCD + app Bluetooth')]
};
d.productTable.rows.forEach(r => { if (fix[r.label]) r.values.push(...fix[r.label]); });
const ncols = d.productTable.columns.length;
const bad = d.productTable.rows.filter(r => r.values.length !== ncols);
console.log('cols:', ncols, '| misaligned rows:', bad.map(r => r.label + '=' + r.values.length));
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(guides, null, 2));
console.log('patched');
