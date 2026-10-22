const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const g = guides.find(x => x.id === 'hd490-pro-vs-dt990');
const rows = g.comparison.rows;
// Impedance row
const imp = rows.find(r => /Impedance|Impedancia/i.test(r.label));
imp.val2 = '250 Ω'; imp.val2_es = '250 Ω';
// Driver row
const drv = rows.find(r => /Driver|Transductor/i.test(r.label));
drv.val2 = 'Dynamic'; drv.val2_es = 'Dinámico';
// Sensitivity row
const sens = rows.find(r => /Sensitivity|Sensibilidad/i.test(r.label));
sens.val1 = '105 dB SPL (1 Vrms)'; sens.val1_es = '105 dB SPL (1 Vrms)';
sens.val2 = '96 dB SPL (1 mW)'; sens.val2_es = '96 dB SPL (1 mW)';

// featuredSnippet specs
const sp = g.featuredSnippet.specs;
const spl = sp.find(s => /SPL/i.test(s.label_en));
spl.val1 = '105 dB SPL (1 Vrms)';
spl.val2 = '96 dB SPL (1 mW)';
const drvSp = sp.find(s => /Driver/i.test(s.label_en));
if (drvSp) { drvSp.val2 = 'Dynamic'; }

fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2));
console.log('done');
console.log(JSON.stringify(rows.filter(r=>/Impedance|Driver|Sensitivity/i.test(r.label)),null,2));
console.log(JSON.stringify(spl,null,2));
